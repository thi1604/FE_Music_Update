import { Metadata } from "next";
import { ForgotPassWord } from "./ForgotPass";


export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Project nghe nhạc trực tuyến",
};


export default function ForgotPassPage() {
  return (
    <>
     <ForgotPassWord/>
    </>
  )
}