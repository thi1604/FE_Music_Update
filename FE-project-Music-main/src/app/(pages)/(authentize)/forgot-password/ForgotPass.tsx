"use client"
import { base_url } from "@/app/components/global";
import { InputForm } from "@/app/components/SubForm/SubForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ForgotPassWord = () => {
  const router = useRouter();
  const handleGetOTP = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    await fetch(`${base_url}/user/password/forgot`, {
      headers: { //Thieu header khong the gui data!
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({email: email})
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == 200){
        toast("Vui lòng check email của bạn!");
        Cookies.set("email", data.email, {expires: 0.5});
        Cookies.set("idUser", data.idUser, {expires: 0.5});
        router.push("/forgot-password/checkOtp");
      }
      else{
        toast(data.messages);
      }
    })
  }
  return (
    <>
     <div className="flex justify-center">
        <div className="mt-[40px]">
          <div className="text-[24px] font-[700] text-[#EFEEE0] text-center">
            Lấy lại mật khẩu
          </div>
          <form className="mt-[20px] inner-form-login" onSubmit={handleGetOTP}>
            <InputForm id="email"
              name={"email"}
              type="email"
              placeholder="Nhập email bạn đã đăng kí!" 
              textLabel="Email *"/>
            <button className="w-[500px] h-[50px] font-[700] text-[16px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] bg-[#00ADEF] mt-[15px]">
              Lấy mã OTP
            </button>
          </form>
        </div>
      </div>
    </>
  )
}