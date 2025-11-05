"use client"

import useSongStore from "../store/songsStore";

export const BoxChangeInfo = (props: any) => {
  const {info, type, title} = props;
  const {setChangeUser} = useSongStore();
  const handleChangeInfo = () => {
    const alertBox = document.querySelector(".inner-box-alert-2");
    const alert = alertBox?.querySelector(".inner-alert");
    const input : any = alert?.querySelector(".inner-input-alert-2");
    setChangeUser(type);
    input.placeholder = info;
    input.value = info;
  
    alert?.classList.remove("hidden");
  }
  return (
    <>
      <div className="flex gap-[5px] justify-between mb-[20px] ">
        <h2 className="font-[600] text-[16px] text-[#00ADEF]">{title}: <span className={`text-[#EFEEE0] inner-change-${type}`}>{info}</span></h2>
        <button 
          className="w-[64px] h-[25px] font-[400] text-[14px] text-[#EFEEE0] outline-none rounded-[6px] bg-[#00ADEF]"
          onClick={handleChangeInfo}
        >
          Thay đổi
        </button>
      </div>
      {/* <AlertComponent2/> */}
    </>
  )
}