import { TransferDataParams, transferService } from "@/app/api/transfer";
import { AccountData } from "@/app/types/accounts";
import { toastNotification } from "@/lib/alert";
import { create } from "zustand";

type AccountsStore = {
  accounts: AccountData;
  setAccountsData(data: AccountData): void;
  transfer(transferData: TransferDataParams): Promise<void>;
};

export const accountsStore = create<AccountsStore>((set, get) => ({
  accounts: { checking: null, saving: null, user: null },
  setAccountsData: (data) => set((state) => ({ ...state, accounts: data })),
  transfer: async (data) => {
    const { amount, fromAccount } = data;

    const { accounts } = get();

    try {
      await transferService({
        amount: data.amount,
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
      });

      if (accounts.checking?.id === fromAccount?.id) {
        set((state) => {
          return {
            ...state,
            accounts: {
              ...state.accounts,
              saving: {
                ...state.accounts.saving,
                amount: Number(state.accounts.saving?.amount) + amount,
              },
              checking: {
                ...state.accounts.checking,
                amount: Number(state.accounts.checking?.amount) - amount,
              },
            },
          } as AccountsStore;
        });
      }

      if (accounts.saving?.id === fromAccount?.id) {
        set(
          (state) =>
            ({
              ...state,
              accounts: {
                ...state.accounts,
                saving: {
                  ...state.accounts.saving,
                  amount: Number(state.accounts.saving?.amount) - amount,
                },
              },
            } as AccountsStore)
        );

        set(
          (state) =>
            ({
              ...state,
              accounts: {
                ...state.accounts,
                checking: {
                  ...state.accounts.checking,
                  amount: Number(state.accounts.checking?.amount) + amount,
                },
              },
            } as AccountsStore)
        );
      }

      toastNotification("Transfer successfully done.");
    } catch (error) {
      toastNotification(`Error trying to transfer funds between accounts`);
    }
  },
}));
