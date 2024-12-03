"use client";

import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    // e.g. '/en/about' or '/fr/contact'
    const newPath = `/${locale}${pathname}`;
    window.history.replaceState(null, "", newPath);
  };

  return (
    <>
      <button onClick={() => switchLocale("en")}>English</button>
      <br />
      <button onClick={() => switchLocale("fr")}>French</button>
      <br />
    </>
  );
}
