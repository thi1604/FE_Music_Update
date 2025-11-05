"use client"
import { base_url } from "@/app/components/global";
import { InputForm } from "@/app/components/SubForm/SubForm";
import { Toaster, toast } from 'sonner'
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";


export default function Register() {
  const showAlert = Cookies.get("showAlert");
  console.log(showAlert);
  const router = useRouter();
  if(showAlert === "true"){
    const alertBox = document.querySelector(".inner-box-alert");
    const alert = alertBox?.querySelector(".inner-alert");
    alert?.classList.remove("hidden");
  }

  const handleSubmitRegister = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const dataForm = {
      fullName: form.get("fullname"),
      email: form.get("email"),
      password: form.get("password"),
      authenPass: form.get("passwordAuth")
    }
    await fetch(`${base_url}/user/register`,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataForm)
    }).then(res => res.json())
    .then(data => {
      if(data.code == 200){
        toast(data.messages);
        Cookies.set("userToken", data.token);
        Cookies.set("showAlert", "false");
        router.push("/");
      }
      else{
        toast(data.messages);
      }
    })
  }
  return (
    <>
      <div className="flex justify-center ">
        {/* bat ki component con nao ma khong co kich thuoc xac dinh, justify-center khong the chia giua */}
        <div className="mt-[40px]">
          <div className="text-[24px] font-[700] text-[#EFEEE0] text-center">
            Đăng ký tài khoản
          </div>
          <form 
            className="mt-[20px]"
            onSubmit={handleSubmitRegister}
          >
            {/* khong biet kich thuoc cu the cua component con nen se lam mat thuoc tinh justify-center */}
            <InputForm id="fullname" name="fullName" type="text" placeholder="Ví dụ: Lê Văn A" textLabel="Họ và tên *"/>
            <InputForm id="email" type="email" name="email" placeholder="Ví dụ: levana@gmail.com" textLabel="Email *"/>
            <InputForm id="password" type="password" name="password" placeholder="Ví dụ: hello@123" textLabel="Mật khẩu * (ít nhất 8 kí tự bao gồm 1 chữ cái, 1 số, 1 kí tự đặc biệt(@$!%*#?&)"/>
            <InputForm id="passwordAuth" type="password" name="passwordAuth" placeholder="" textLabel="Nhập lại mật khẩu *"/>
            {/* <div className="text-left text-[14px] font-600 mb-[5px] mt-[15px]">
              <label htmlFor="password">Mật khẩu *</label> <br/>
            </div>
            <input type="password" id="password" className="w-[500px] h-[50px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] text-[#212121]" required/> <br /> */}
            <button className="w-[500px] h-[50px] font-[700] text-[16px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] bg-[#00ADEF] mt-[15px]">
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </>
  )
}