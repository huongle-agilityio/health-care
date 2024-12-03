import SideNav from "@/app/ui/dashboard/sidenav";
import ThemeProvider from "../ui/ThemeContext";

export default function Layout({
  children,
  setting,
}: {
  children: React.ReactNode;
  setting: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <ThemeProvider>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {setting}
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
