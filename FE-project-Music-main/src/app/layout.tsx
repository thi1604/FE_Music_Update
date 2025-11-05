import type { Metadata } from "next";
import { AlertComponent } from "./components/Alert/Alert";
import Play from "./components/Play/Play";
import Search from "./components/Search/Search";
import Sider from "./components/Sider/Sider";
import "./globals.css";
import { Toaster } from "sonner";
import { AlertComponent2 } from "./components/Alert/Alert2";
import MenuSider from "./components/Sider/MenuSider2";
import { Suspense } from "react";
// import Script from "next/script";

export const metadata: Metadata = {
  title: "Béo âm nhạc",
  description: "Project nghe nhạc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vn" suppressHydrationWarning>
      <body className="bg-[#292929] text-[#FFFFFF]">
        <div className="container w-full mx-[10px] sm:mx-auto ">
          <AlertComponent/>
          <AlertComponent2/>
          <div className="block md:flex md:justify-start">
            <div className="sticky top-[3px] w-full lg:w-[260px] md:w-[250px]">
              <Sider/>
            </div>
            <div className="flex-1 mt-[80px] xl:ml-[20px] md:ml-[17px] mb-[200px]">
              <Search/>
              <Suspense>
                {children}
              </Suspense>
              <Toaster className="outline-none"
                position="top-right" 
                toastOptions={{
                  style: {
                    background: '#00ADEF',
                    outline: "none",
                    color: "#EFEEE0",
                    fontSize: "15px",
                    font: "700",
                    border: "none"
                },
                duration: 1500
                }}
              />
            </div>
          </div>
        </div>
      <Play/>
      </body>
    </html>
  );
}
