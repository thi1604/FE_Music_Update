"use client"
import { BoxChangeInfo } from "@/app/components/Box/BoxChangeInfo";
import { base_url } from "@/app/components/global";
// import useSongStore from "@/app/components/store/songsStore";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";


export const  DetailUser = () => {
  // const {getChangeUser, setChangeUser} = useSongStore();
  const [data, setData] = useState(null);
  // const [change, setChange] = useState(false);
  // const isChange : any = getChangeUser();
  // if(isChange){
  //   setChangeUser(false);
  // }
  const tokenUser = Cookies.get("userToken") || "";
  let dataUser : any = null;
  useEffect(() => {
    // lay ra chi tiet bai hat
    async function fetchDataUser() {
      await fetch(`${base_url}/user/detail`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
        },
        method: "PATCH",
        body: JSON.stringify({tokenUser})
      })
      .then(res=> res.json())
      .then((data => {
        if(data.code == 200){
          dataUser = data.user;
          setData(dataUser);
        }
      }));
    }
    fetchDataUser();
  }, []);

  if(data){
    dataUser = data;
  }

  return(
    <>
      {dataUser && (
        <div className="lg:h-[300px] bg-[#292929] flex items-center flex-wrap gap-[20px] lg:flex-nowrap lg:gap-[0px] mt-[50px] inner-detail-user">
          <div className="w-full flex justify-center lg:block lg:w-[50%]">
            <div className="w-[200px] md:w-[300px] aspect-square rounded-[50%] truncate border-[3px] border-[#00ADEF]">
              <img src="https://png.pngtree.com/png-vector/20241012/ourlarge/pngtree-cat-listening-to-music-with-headphones-png-image_13995938.png" 
              alt=""
              className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 w-full lg:w-[40%] pr-[10px]">
            <div className="font-[600] text-[16px] text-[#00ADEF] mb-[20px]">
              Thông tin tài khoản
            </div>
            <BoxChangeInfo info={dataUser.fullName} type={"text"} title={"Họ và tên"}/>
            <BoxChangeInfo info={dataUser.email} type={"email"} title={"Email"}/>
            <Link href="/forgot-password">
              <div className="font-[600] text-[16px] text-[#EFEEE0] mb-[10px] hover:text-[#00ADEF]">
                Thay đổi mật khẩu ?
              </div>
            </Link>
            <div className="mt-[12px]">
              <div className="font-[600] text-[16px] text-[#EFEEE0]">
                So lượt yêu thích bài hát : {dataUser.numberLoveSong}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}