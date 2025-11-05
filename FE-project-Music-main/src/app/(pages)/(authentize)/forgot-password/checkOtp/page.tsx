import { Metadata } from "next";
import { CheckOTP } from "./checkOtp";

export const metadata: Metadata = {
  title: "Check OTP",
  description: "Trang kiểm tra OTP",
};


export default function CheckOTPPage() {
  
  return (
    <>
      <CheckOTP/>
    </>
  )
}