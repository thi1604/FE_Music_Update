"use client"
import { base_url } from "@/app/components/global";
import { InputForm } from "@/app/components/SubForm/SubForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export const  ChangePass = () => {
  const router = useRouter();
  const email = Cookies.get("email") + "";
  if(!email){
    router.push("/forgot-password");
  }
  const handleChangePassword = async (event: any) => {
    event.preventDefault();
    const idUser = Cookies.get("idUser");
    const email = Cookies.get("email");
    const newpass = event.target.newpass.value;
    const newpassAuthen = event.target.newpassAuthen.value;
    if(!email){
      router.push("/forgot-password");
    }
    else {
      await fetch(`${base_url}/user/password/reset-password`, {
        headers: { //Thieu header khong the gui data!
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          email: email,
          idUser: idUser,
          password: newpass,
          passwordAuthen: newpassAuthen
        })
      }).then(res => res.json())
      .then(data => {
        if(data.code == 200){
          toast("Thay đổi mật khẩu thành công!")
          const isLogin = Cookies.get("userToken");
          if(isLogin)
            router.push("/");
          else
            router.push("/login");
          
          Cookies.remove("idUser");
          Cookies.remove("email");
        }
        else{
          toast(data.messages);
        }
      })
    }
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-[40px]">
          <div className="text-[24px] font-[700] text-[#EFEEE0] text-center">
            Thay đổi mật khẩu!
          </div>
          <form className="mt-[20px] inner-form-login" onSubmit={handleChangePassword}>
            <input
              type="text"
              className="w-[500px] h-[50px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] text-[#212121] mb-[15px]"
              value={email}
              readOnly 
            />
            <InputForm id="newpass"
              name={"newpass"}
              type="text"
              placeholder="(ít nhất 8 kí tự bao gồm 1 chữ cái, 1 số, 1 kí tự đặc biệt(@$!%*#?&)"
              textLabel="Nhập mật khẩu mới *"/>
            <InputForm 
              id="newpassAuthen" 
              type="text"
              name={"newpassAuthen"}
              placeholder="" 
              textLabel="Nhập lại mật khẩu *"/>
            <button className="w-[500px] h-[50px] font-[700] text-[16px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] bg-[#00ADEF] mt-[15px]">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </>
  )
}