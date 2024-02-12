import { api } from "@/lib/axios";

type Account = {
  id: string;
  amount: number;
};

export type TransferDataParams = {
  fromAccount: Account | null;
  toAccount: Account | null;
  amount: number;
};

export async function transferService(data: TransferDataParams) {
  const response = await api.post("/accounts/transfer", data);
  return response.data;
}
