import db from "../lib/db";

type Checking = { amount: number; id: string } | null;
type Saving = { amount: number; id: string } | null;
type User = { id: string; name: string } | null;

export type AccountData = {
  user: User;
  saving: Saving;
  checking: Checking;
};

export async function getAccounts() {
  const data = await db.user.findFirst({
    where: { name: "John Doe" },
    include: { Checking: true, Saving: true },
  });

  if (!data) {
    return null;
  }

  const accounts: AccountData = {
    checking: {
      amount: Number(data.Checking?.amount),
      id: String(data.Checking?.id),
    },
    saving: {
      amount: Number(data.Saving?.amount),
      id: String(data.Saving?.id),
    },
    user: { id: data.id, name: data.name },
  };

  return accounts;
}
