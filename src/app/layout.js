import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import LayoutComponent from "@/components/ui/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Madhavi project",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Providers>
          <LayoutComponent>
            {children}
          </LayoutComponent>
        </Providers>


      </body>
    </html>
  );
}
