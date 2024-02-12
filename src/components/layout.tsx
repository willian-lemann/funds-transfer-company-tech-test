import { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";
import { accountsStore } from "@/store/accounts-store";

export function Layout({ children }: PropsWithChildren) {
  const username = accountsStore((state) => state.accounts.user?.name);
  return (
    <div
      key="1"
      className="grid h-screen min-h-screen w-full lg:grid-cols-[280px_1fr]"
    >
      <Sidebar username={username as string} />

      {children}
    </div>
  );
}
