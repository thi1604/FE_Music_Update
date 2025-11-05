"use client"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHeartCircle } from "react-icons/io5"
import { toast } from "sonner";
import { base_url } from "../global";

export const ButtonLove = (props:any) => {
  const slugSong = props.slugSong;
  const tokenUser = Cookies.get("userToken");
  const [isLove, setIsLove] = useState(false);
  useEffect(() => {
    const checkLoveSong = async () => {
      await fetch(`${base_url}/songs/check-love-song`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          slugSong: slugSong,
          tokenUser: tokenUser
        })
      }).then(res => res.json())
      .then(data => {
        if(data.code == 200){
          setIsLove(true);
        }
      })
    }
    checkLoveSong();
  }, []);
  const router = useRouter();
  const handleClickLove = async () => {
    const buttonLove = document.querySelector(`.love-${slugSong}`);
    if(tokenUser){
      if(buttonLove){
        // if(buttonLove.classList.contains("love")){
        //   buttonLove.classList.remove("love")
        // }
        // else{
        //   buttonLove.classList.add("love")
        // }
        const data = {
          tokenUser: tokenUser,
          slugSong: slugSong
        }
        await fetch(`${base_url}/songs/love`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
          if(data.code == 200){
            if(data.status == "love"){
              buttonLove.classList.add("love");
              toast("Đã thêm vào danh sách yêu thích!");
            }
            else{
              buttonLove.classList.remove("love")
              toast("Đã xoá khỏi danh sách yêu thích!");
            }
          }
          else{
            toast("Lỗi!")
          }
        })
      }
    }
    else{
      router.push("/loveSongs");
    }
  }
  return (
    <>
      <button 
        className={`xl:text-[35px] lg:text-[30px] text-[35px] inner-love love-${slugSong} ${isLove ? "love": ""}`}
        onClick={handleClickLove}
      >
          <IoHeartCircle/>
      </button>
    </>
  )
}