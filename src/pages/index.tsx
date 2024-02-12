import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";
import { CreditCardIcon, DollarSignIcon } from "@/components/icons";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { getAccounts } from "@/app/api/get-account";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { toastNotification } from "@/lib/alert";

import { AccountData } from "@/app/types/accounts";
import { accountsStore } from "@/store/accounts-store";
import { Layout } from "@/components/layout";
import { TransferForm } from "@/components/TransferForm";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";

type UsersAccountPageProps = {
  accounts: AccountData;
};

const schema = z.object({
  fromAccount: z.string(),
  toAccount: z.string(),
  amount: z
    .string()
    .min(1, {
      message:
        "Amount value must not be empty when transfering between accounts",
    })
    .transform((value) => Number(value)),
});

export type SchemaType = z.infer<typeof schema>;

export default function UsersAccountPage({ accounts }: UsersAccountPageProps) {
  const { accountsData, setAccountsData } = accountsStore((state) => ({
    setAccountsData: state.setAccountsData,
    accountsData: state.accounts,
  }));

  const total = useMemo(
    () =>
      Number(accountsData.checking?.amount) +
      Number(accountsData.saving?.amount),
    [accountsData.checking?.amount, accountsData.saving?.amount]
  );

  const methods = useForm<SchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { watch } = methods;

  const fromAccountId = watch("fromAccount");
  const toAccountId = watch("toAccount");

  useEffect(() => {
    if (toAccountId && fromAccountId) {
      if (toAccountId === fromAccountId) {
        toastNotification("Error selecting accounts", {
          description: "You cannot select the same account to transfer money",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAccountId, toAccountId]);

  useEffect(() => {
    setAccountsData(accounts);
  }, [accounts, setAccountsData]);

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100/40 lg:bg-gray-50/40 dark:bg-gray-800/40">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h1 className="font-semibold text-2xl">Accounts</h1>
              <p className="text-sm font-medium leading-none md:text-base">
                Available balance
              </p>
            </div>

            <Card className="ml-10 py-2 flex flex-col px-6 gap-2 cursor-pointer">
              <CardTitle className="text-sm">Total amount</CardTitle>
              <CardDescription className="text-start text-black">
                {formatMoney(total)}
              </CardDescription>
            </Card>
          </div>

          <Link href="/checking">
            <Card className="p-4 md:p-8 cursor-pointer">
              <div className="grid gap-2 md:grid-cols-1">
                <div className="flex items-center justify-between w-full  gap-4">
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2 justify-between">
                      <h2 className="font-semibold text-base">Checking</h2>
                      <CreditCardIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="text-sm leading-none">**** **** **** 1234</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <DollarSignIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <div className="grid gap-1">
                      <h2 className="font-semibold text-base">Balance</h2>
                      <p className="text-sm leading-none">
                        {formatMoney(accountsData.checking?.amount as number)}
                      </p>
                    </div>

                    <ChevronRightIcon />
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/saving">
            <Card className="p-4 md:p-8 cursor-pointer">
              <div className="grid gap-2 md:grid-cols-1">
                <div className="flex items-center w-full justify-between gap-4">
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2 justify-between w-full">
                      <h2 className="font-semibold text-base">Savings</h2>
                      <CreditCardIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="text-sm leading-none">**** **** **** 5678</p>
                  </div>

                  <div className="flex items-center gap-4 md:justify-end">
                    <DollarSignIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <div className="grid gap-1 text-right">
                      <h2 className="font-semibold text-base">Balance</h2>
                      <p className="text-sm leading-none">
                        {formatMoney(accountsData.saving?.amount as number)}
                      </p>
                    </div>
                    <ChevronRightIcon />
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <FormProvider {...methods}>
            <TransferForm />
          </FormProvider>
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const accounts = await getAccounts();

  return {
    props: {
      accounts,
    },
  };
};
