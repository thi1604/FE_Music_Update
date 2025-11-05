"use client"
import { IoIosRepeat } from "react-icons/io"
import { toast } from "sonner";
import useSongStore from "../store/songsStore";


export const ButtonRepeat = () => {
  const {getRepeat, setRepeat} = useSongStore();
  let repeat = getRepeat();
  const handleRepeat = () => {
    const boxAction = document.querySelector(".inner-action-1");
    const ButtonRepeat = boxAction?.querySelector(".inner-repeat-song");
    if(ButtonRepeat){
      if(ButtonRepeat.classList.contains("active")){
        setRepeat(false)
        ButtonRepeat.classList.remove("active");
        toast("Trở lại chế độ ngẫu nhiên!");
      }
      else{
        ButtonRepeat.classList.add("active");
        setRepeat(true);
        toast("Bạn đang bật chế độ nghe lặp lại!");
      }
    }
  }
  return (
    <>
      <button className= {`hover:text-[#00ADEF] ml-[20px] inner-repeat-song ${repeat ? "active" : ""}`} onClick={handleRepeat}>
        <IoIosRepeat/>
      </button>
    </>
  )
}
