import db from "../lib/db";

export async function getSavingHistory() {
  const data = await db.savingHistory.findMany({
    where: { saving: { user: { name: "John Doe" } } },
    orderBy: { transferedDate: "desc" },
  });

  const mapped = data.map((item) => ({
    ...item,
    amountTransfered: Number(item.amountTransfered),
    transferedDate: item.transferedDate.toUTCString(),
  }));

  return mapped;
}
