"use client"
import Cookies from "js-cookie"
import Link from "next/link"
import { MdCancel } from "react-icons/md";
// import { createPortal } from "react-dom"


export const AlertComponent = () => {
  const handleAlert = () => {
    Cookies.set("showAlert", "false");
    const alertBox = document.querySelector(".inner-box-alert");
    const alert = alertBox?.querySelector(".inner-alert");
    alert?.classList.add("hidden");
  }

  const handleClickChild = (event: any) => {
    event.stopPropagation(); //Khi click ben ngoai alert thi an alert di
  }

  return (
    <>
      <div className="inner-box-alert">
        <div className="inner-alert hidden" onClick={handleAlert}>
          <div className="fixed w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
            <div className="p-[20px] bg-[#212121] top-[0px] left-[0px] w-[400px] h-[250px] rounded-[10px]" onClick={handleClickChild}>
              <h3 className="text-[#EFEEE0] font-[700] text-[16px]">
                Đăng kí tài khoản để Chill hơn nàooo!. Giúp mình đăng kí nhé?
              </h3>
              <div className="mt-[30px] flex justify-end gap-x-[10px]">
                {/* <button className=" w-[85px] h-[30px] bg-[#00ADEF] outline-none rounded-[6px] text-[14px] font-[500]">
                  Đăng nhập 
                </button> */}
                <button className="w-full h-[30px] bg-[#00ADEF] outline-none rounded-[6px] text-[14px] font-[500]" onClick={handleAlert}>
                  Oke
                </button>
              </div>
              <div className="mt-[30px] flex gap-x-[5px] text-[15px] font-[500]">
                <h3>Bạn đã có tài khoản?</h3>
                <Link href={"/login"} className="hover:underline"> Đăng nhập</Link>
              </div>
              <div className="mt-[30px] flex justify-center items-center w-full h-[20px]">
                <button className="text-[#EFEEE0] font-[700] hover:text-[#00ADEF]" onClick={handleAlert}>
                  <MdCancel/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}