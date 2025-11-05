import {Metadata } from "next";
import Register from "./Register";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Đăng kí",
  description: "Trang đăng kí",
};


export default function RegisterPage() {
  headers();
  return (
    <>
      <Register/>
    </>
  )
}
