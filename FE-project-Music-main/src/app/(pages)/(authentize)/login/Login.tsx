"use client"
import { base_url } from "@/app/components/global";
import { InputForm } from "@/app/components/SubForm/SubForm";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from 'sonner'

export const LoginUser = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof document !== "undefined") {
      const alertBox = document.querySelector(".inner-box-alert");
      const alert = alertBox?.querySelector(".inner-alert");
      alert?.classList.add("hidden");
    }
    Cookies.remove("showAlert");
  }, []); // Chạy 1 lần khi component mount
  const handleSubmitForm = async (event:any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.password.value;
    const dataSend = {
      email: email,
      password: pass
    }
    await fetch(`${base_url}/user/login`, {
      headers: { //Thieu header khong the gui data!
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataSend)
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == 200){
        router.push("/");
        Cookies.set("userToken", data.token, {expires: 3});
        toast(data.messages);
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
            Đăng Nhập Tài Khoản
          </div>
          <form className="mt-[20px] inner-form-login" onSubmit={handleSubmitForm}>
            <InputForm id="email"
              name={"email"}
              type="email"
              placeholder="Ví dụ: thibeo@gmail.com" 
              textLabel="Email *"/>
            <InputForm 
              id="password" 
              type="password"
              name={"password"}
              placeholder="" 
              textLabel="Mật khẩu *"/>
            <button className="w-[500px] h-[50px] font-[700] text-[16px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] bg-[#00ADEF] mt-[15px]">
              Đăng Nhập
            </button>
          </form>
          <div className="mt-[10px]">
            <Link href="/forgot-password" className="text-[16px] font-[500] pl-[15px] hover:text-[#00ADEF]">Quên mật khẩu ?</Link>
          </div>
        </div>
      </div>
    </>
  )
}