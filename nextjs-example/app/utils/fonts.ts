import { Inter, Lusitana } from "next/font/google";
import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "../assets/fonts/EduAUVICWANTPre-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/EduAUVICWANTPre-Regular.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/EduAUVICWANTPre-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/EduAUVICWANTPre-SemiBold.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
});

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({ subsets: ["latin"], weight: "400" });
