import Link from "next/link";
import { Button } from "./ui/button";
import { BellIcon, CreditCardIcon, UsersIcon } from "lucide-react";

type SidebarProps = { username: string };

export function Sidebar({ username }: SidebarProps) {
  return (
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

            <span className="">{username} Account</span>
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
              href="/"
            >
              <CreditCardIcon className="h-4 w-4" />
              Home
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
