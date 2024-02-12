import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react";
import {
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  Package2Icon,
  UsersIcon,
} from "@/components/icons";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import db from "@/app/lib/db";
import { AccountData, getAccounts } from "@/app/api/get-account";

type UsersAccountPageProps = {
  accounts: AccountData;
};

export default function UsersAccountPage({ accounts }: UsersAccountPageProps) {
  return (
    <div
      key="1"
      className="grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]"
    >
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/u/44612750?v=4"
                loading="lazy"
                className="object-cover w-10 h-10 rounded-full"
                alt="Avatar Image from github profile"
              />

              <span className="">{accounts.user?.name} Account</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <CreditCardIcon className="h-4 w-4" />
                Home
              </Link>

              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100/40 lg:bg-gray-50/40 dark:bg-gray-800/40">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 dark:border-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-2">
            <h1 className="font-semibold text-2xl">Accounts</h1>
            <p className="text-sm font-medium leading-none md:text-base">
              Available balance
            </p>
          </div>

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
                      {accounts.checking?.amount.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>

                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </Card>

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
                      {accounts.saving?.amount.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-8">
            <CardHeader>
              <CardTitle>Transfer funds</CardTitle>
              <CardDescription>
                Move money between your accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>
                    <span>From</span>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="saving">Saving</SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>
                </div>
                <div>
                  <Label>
                    <span>To</span>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="saving">Saving</SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>
                </div>
                <div>
                  <Label>
                    <span>Amount</span>
                    <Input
                      className="mt-1 form-input"
                      placeholder="0.00"
                      type="number"
                    />
                  </Label>
                </div>
              </div>
              <Button className="mt-4">Transfer</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
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
