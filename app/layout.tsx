import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google'
import { NextFont } from "next/dist/compiled/@next/font";
import { ClerkProvider } from "@clerk/nextjs";
import { isMobile } from "../utils/isMobile";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import ClientComponent from "@/components/EnsureAuthWrapper";

export const metadata: Metadata = {
  title: "Exogenesis",
  description: "Damn.",
};

const montserrat: NextFont = Montserrat({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  if (!mobileCheck) {
    return (
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased w-[100vw] h-[100vh] flex flex-col items-center justify-center`} 
          >
            <h1 className="text-[15vw] text-[#651DFF] font-black mb-0">400</h1>
        <div className="font-semibold text-xl text-center">This website can only be opened on a Mobile device.</div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider>
      <ClientComponent />
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased`}
          >
          {children}
          <Navbar />
        </body>
      </html>
    </ClerkProvider>
  );
}