import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { lusitana } from "@/app/utils/fonts";
import Form from "./Form";
import { Metadata } from "next";
import ViewCount from "./ViewCount";

export const metadata: Metadata = {
  title: "Invoices",
};

interface SearchParams {
  query?: string;
  page?: string;
}

interface Props {
  searchParams?: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = params?.query || "";

  const currentPage = Number(params?.page) || 1;

  return (
    <div className="w-full">
      <ViewCount initialViews={2} />
      <Form />
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={5} />
      </div>
    </div>
  );
};

export default Page;
