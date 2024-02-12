import db from "../lib/db";

export async function getCheckingHistory() {
  const data = await db.checkingHistory.findMany({
    where: { checking: { user: { name: "John Doe" } } },
    orderBy: { transferedDate: "desc" },
  });

  const mapped = data.map((item) => ({
    ...item,
    amountTransfered: Number(item.amountTransfered),
    transferedDate: item.transferedDate.toUTCString(),
  }));

  return mapped;
}
