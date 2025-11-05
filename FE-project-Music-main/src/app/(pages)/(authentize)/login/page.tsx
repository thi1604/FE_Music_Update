import { Metadata } from "next";
import { LoginUser } from "./Login";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Trang đăng nhập",
};


export default function LoginPage() {

  return (
    <>
     <LoginUser/>
    </>
  )
}