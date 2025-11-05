"use client"
import { base_url } from "@/app/components/global";
import { InputForm } from "@/app/components/SubForm/SubForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CheckOTP = () => {
  const router = useRouter();
  const handleCheckOTP = async (event: any) => {
    event.preventDefault();
    const email = Cookies.get("email");
    const otp = event.target.otp.value;
    await fetch(`${base_url}/user/password/check-otp`, {
      headers: { //Thieu header khong the gui data!
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    }).then(res => res.json())
    .then(data => {
      if(data.code == 200){
        router.push("/change-password");
      }
      else{
        toast(data.messages)
      }
    })
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-[40px]">
          <div className="text-[24px] font-[700] text-[#EFEEE0] text-center">
            Xác thực OTP
          </div>
          <form className="mt-[20px] inner-form-login" onSubmit={handleCheckOTP}>
            <InputForm id="otp"
              name={"otp"}
              type="text"
              placeholder="Nhập mã OTP" 
              textLabel="Mã OTP *"/>
            <button className="w-[500px] h-[50px] font-[700] text-[16px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] bg-[#00ADEF] mt-[15px]">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </>
  )
}