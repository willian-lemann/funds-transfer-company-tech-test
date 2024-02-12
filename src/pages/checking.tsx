import { getCheckingHistory } from "@/app/api/get-checking-history";
import { INCOME } from "@/app/types/accounts";
import { Layout } from "@/components/layout";

import dayjs from "dayjs";

import { cn, formatMoney } from "@/lib/utils";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type CheckingProps = {
  data: Array<{
    id: string;
    amountTransfered: number;
    type: number;
    transferedDate: string;
  }>;
};

export default function Checking({ data }: CheckingProps) {
  const timeline = data.map((item) => {
    if (item.type === INCOME) {
      return {
        id: item.id,
        content: "Transference from Saving account",
        target: formatMoney(item.amountTransfered),
        href: "#",
        date: dayjs(item.transferedDate).format("MMMM D, YYYY h:mm A"),
        icon: ArrowUp,
        iconBackground: "bg-green-500",
      };
    }

    return {
      id: item.id,
      content: "Transference to Saving account",
      target: formatMoney(item.amountTransfered),
      href: "#",
      date: dayjs(item.transferedDate).format("MMMM D, YYYY h:mm A"),
      icon: ArrowDown,
      iconBackground: "bg-indigo-300",
    };
  });

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100/40 lg:bg-gray-50/40 dark:bg-gray-800/40">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-2">
            <h1 className="font-semibold text-2xl">Checking Account</h1>
            <p className="text-sm font-medium leading-none md:text-base">
              Available balance history
            </p>
          </div>

          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {timeline.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== timeline.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={cn(
                            event.iconBackground,
                            "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          )}
                        >
                          <event.icon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.content}{" "}
                            <a
                              href={event.href}
                              className="font-medium text-gray-900"
                            >
                              {event.target}
                            </a>
                          </p>
                        </div>

                        <div className="whitespace-nowrap text-right text-sm text-gray-500 pr-10">
                          <time dateTime={event.date.toString()}>
                            {event.date.toString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getCheckingHistory();

  return {
    props: {
      data,
    },
  };
};
