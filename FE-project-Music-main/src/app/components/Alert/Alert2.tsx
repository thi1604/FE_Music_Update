"use client"
import Cookies from "js-cookie"
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { base_url } from "../global";
import useSongStore from "../store/songsStore";

export const AlertComponent2 = () => {
  const {getChangeUser} = useSongStore();
  const type = getChangeUser();
  const handleAlert2 = async () => {
    // Cookies.remove("showAlert");
    const alertBox = document.querySelector(".inner-box-alert-2");
    const alert = alertBox?.querySelector(".inner-alert");
    // const input : any = alert?.querySelector(".inner-input-alert-2");
  
    alert?.classList.add("hidden");
  }

  const handleClickChild = (event: any) => {
    event.stopPropagation(); //Khi click ben ngoai alert thi an alert di
  }

  const changeInfo = async () =>{
    const alertBox = document.querySelector(".inner-box-alert-2");
    const alert = alertBox?.querySelector(".inner-alert");
    const input : any = alert?.querySelector(".inner-input-alert-2");
    const data1 = input.value;
    const tokenUser = Cookies.get("userToken");
    await fetch(`${base_url}/user/change-info/${type}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        tokenUser: tokenUser,
        dataChange: data1
      })
    }).then(res => res.json())
    .then(data => {
      if(data.code == 200){
        const boxDetailInfo = document.querySelector(".inner-detail-user");
        const nameUserElement = boxDetailInfo?.querySelector(`.inner-change-${type}`);
        if(nameUserElement){
          nameUserElement.innerHTML = data1;
        }
      }
      toast(data.messages)
    })
    alert?.classList.add("hidden");
  }

  return (
    <>
      <div className="inner-box-alert-2">
        <div className="inner-alert hidden" onClick={handleAlert2}>
          <div className="fixed w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
            <div className="p-[20px] bg-[#212121] top-[0px] left-[0px] w-[400px] h-[250px] rounded-[10px]" onClick={handleClickChild}>
              <h3 className="text-[#EFEEE0] font-[700] text-[16px]">
                Thay đổi thông tin
              </h3>
              <div className="mt-[30px] flex flex-wrap gap-x-[10px] h-[100px]">
                <input
                  className="w-full h-[30px] outline-none rounded-[6px] py-[2px] pl-[5px] pr-[5px] text-[#212121] inner-input-alert-2"
                  type={type}
                />
                <button className="w-full h-[30px] bg-[#00ADEF] outline-none rounded-[6px] text-[14px] font-[500] mt-[10px]" 
                onClick={changeInfo}
                >
                  Cập nhật  
                </button>
              </div>
              
              <div className="mt-[30px] flex justify-center items-center w-full h-[20px]">
                <button className="text-[#EFEEE0] font-[700] hover:text-[#00ADEF]" onClick={handleAlert2}>
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