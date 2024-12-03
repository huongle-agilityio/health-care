import { getTopics } from "@/app/lib/data";
import { LatestInvoice } from "@/app/lib/definitions";
import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { CardsSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
import { lusitana } from "@/app/utils/fonts";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next.js",
};

const Page = async () => {
  // waterfalls
  const data: LatestInvoice[] = await getTopics();
  // const VocabData = await getVocabularies();

  // Parallel data
  // const data = await Promise.all([getTopics(), getVocabularies()]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="flex basis-2 flex-row">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
          <Card latestInvoices={data} />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue} /> */}
          <Suspense fallback={<RevenueChartSkeleton />}>
            <LatestInvoices />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
