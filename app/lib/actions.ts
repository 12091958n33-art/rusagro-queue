"use server";

import { prisma } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { addMinutes, SLOT_DURATION_MINUTES, type EntryStatus } from "@/app/lib/types";

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createSlot(formData: FormData) {
  const date = str(formData, "date");
  const startTime = str(formData, "startTime");
  const capacity = Number(str(formData, "capacity"));

  if (!date || !startTime || !capacity || capacity < 1) {
    throw new Error("Заполните все поля слота корректно");
  }

  const endTime = addMinutes(startTime, SLOT_DURATION_MINUTES);

  await prisma.slot.create({
    data: { date, startTime, endTime, capacity },
  });

  revalidatePath("/admin");
  revalidatePath("/book");
  revalidatePath("/queue");
}

export async function deleteSlot(formData: FormData) {
  const id = str(formData, "id");
  const activeCount = await prisma.queueEntry.count({
    where: { slotId: id, status: { not: "CANCELLED" } },
  });
  if (activeCount > 0) {
    throw new Error("Нельзя удалить слот с активными записями");
  }
  await prisma.slot.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/book");
}

export async function bookSlot(formData: FormData) {
  const slotId = str(formData, "slotId");
  const date = str(formData, "date");
  const supplierName = str(formData, "supplierName");
  const phone = str(formData, "phone");
  const vehiclePlate = str(formData, "vehiclePlate");
  const volumeTons = Number(str(formData, "volumeTons"));
  const notes = str(formData, "notes");

  if (!slotId || !supplierName || !phone || !vehiclePlate || !volumeTons) {
    throw new Error("Заполните все обязательные поля");
  }

  await prisma.$transaction(async (tx) => {
    const slot = await tx.slot.findUnique({
      where: { id: slotId },
      include: {
        entries: { where: { status: { not: "CANCELLED" } } },
      },
    });

    if (!slot) {
      throw new Error("Слот не найден");
    }

    if (slot.entries.length >= slot.capacity) {
      throw new Error("В этом слоте больше нет свободных мест");
    }

    await tx.queueEntry.create({
      data: {
        type: "SLOT",
        date,
        slotId,
        supplierName,
        phone,
        vehiclePlate,
        volumeTons,
        notes: notes || null,
        status: "CONFIRMED",
      },
    });
  });

  revalidatePath("/book");
  revalidatePath("/queue");
  revalidatePath("/admin");
  revalidatePath("/weighing");
}

export async function joinWalkinQueue(formData: FormData) {
  const date = str(formData, "date");
  const supplierName = str(formData, "supplierName");
  const phone = str(formData, "phone");
  const vehiclePlate = str(formData, "vehiclePlate");
  const volumeTons = Number(str(formData, "volumeTons"));
  const notes = str(formData, "notes");

  if (!date || !supplierName || !phone || !vehiclePlate || !volumeTons) {
    throw new Error("Заполните все обязательные поля");
  }

  await prisma.queueEntry.create({
    data: {
      type: "WALKIN",
      date,
      supplierName,
      phone,
      vehiclePlate,
      volumeTons,
      notes: notes || null,
      status: "CONFIRMED",
    },
  });

  revalidatePath("/queue");
  revalidatePath("/admin");
  revalidatePath("/weighing");
}

export async function updateEntryStatus(formData: FormData) {
  const id = str(formData, "id");
  const status = str(formData, "status") as EntryStatus;
  const actualWeightRaw = str(formData, "actualWeightTons");

  const data: { status: EntryStatus; actualWeightTons?: number } = { status };
  if (actualWeightRaw) {
    data.actualWeightTons = Number(actualWeightRaw);
  }

  await prisma.queueEntry.update({ where: { id }, data });

  revalidatePath("/queue");
  revalidatePath("/admin");
  revalidatePath("/weighing");
}

export async function cancelEntry(formData: FormData) {
  const id = str(formData, "id");
  await prisma.queueEntry.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/queue");
  revalidatePath("/admin");
  revalidatePath("/book");
  revalidatePath("/weighing");
}
