"use client";
import { useRouter } from "next/navigation";
import SortProducts from "./SortProducts";
import { LocaleSwitcher } from "./LocaleSwitcher";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <LocaleSwitcher />
      <SortProducts />
      <p onClick={() => router.push("/dashboard")}>Customers Page</p>
    </>
  );
}
