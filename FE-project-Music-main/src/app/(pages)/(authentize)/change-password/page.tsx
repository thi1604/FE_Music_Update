import { Metadata } from "next";
import { ChangePass } from "./ChangePass";

export const metadata: Metadata = {
  title: "Thay đổi mật khẩu",
  description: "Trang thay đổi mật khẩu",
};


export default function ChangePassPage(){
  return (
    <>
      <ChangePass/>
    </>
  )
}