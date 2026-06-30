import type { Metadata } from "next";
import "./globals.css";
import estedadFont from "@/constants/localFont";
import Header from "@/components/layouts/root/Header";
import Footer from "@/components/layouts/root/Footer";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "رستوران های زنجیره‌ای ترخینه",
  description: "رستوران های زنجیره‌ای ترخینه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("antialiased", estedadFont.variable, "font-sans", inter.variable)}>
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              className: "font-sans",
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
