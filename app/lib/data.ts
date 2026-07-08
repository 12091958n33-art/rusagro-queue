import { prisma } from "@/app/lib/db";

export async function getSlotsByDate(date: string) {
  const slots = await prisma.slot.findMany({
    where: { date },
    include: {
      entries: { where: { status: { not: "CANCELLED" } } },
    },
    orderBy: { startTime: "asc" },
  });

  return slots.map((slot) => ({
    ...slot,
    booked: slot.entries.length,
    free: slot.capacity - slot.entries.length,
  }));
}

export async function getQueueByDate(date: string) {
  const entries = await prisma.queueEntry.findMany({
    where: { date, status: { not: "CANCELLED" } },
    include: { slot: true },
  });

  return entries.sort((a, b) => {
    const aKey = a.slot ? a.slot.startTime : "99:99";
    const bKey = b.slot ? b.slot.startTime : "99:99";
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}

export async function getAllEntriesByDate(date: string) {
  const entries = await prisma.queueEntry.findMany({
    where: { date },
    include: { slot: true },
    orderBy: { createdAt: "asc" },
  });
  return entries;
}
