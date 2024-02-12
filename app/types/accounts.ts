export const INCOME = 1;
export const OUTCOME = 2;

type Checking = { amount: number; id: string } | null;
type Saving = { amount: number; id: string } | null;
type User = { id: string; name: string } | null;

export type AccountData = {
  user: User;
  saving: Saving;
  checking: Checking;
};
