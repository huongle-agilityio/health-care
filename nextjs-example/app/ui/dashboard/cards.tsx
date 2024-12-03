import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { LatestInvoice } from "@/app/lib/definitions";
import clsx from "clsx";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({ latestInvoices }: { latestInvoices: LatestInvoice[] }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      {latestInvoices.map((invoice, i) => {
        const { id, name } = invoice;

        return (
          <div
            key={id}
            className={clsx("flex flex-row items-center justify-between py-4", {
              "border-t": i !== 0,
            })}
          >
            <div className="flex items-center">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  {name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
