"use client"
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { FaRegPauseCircle, FaRegPlayCircle} from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";
import { PlayTime } from "./PlayTime";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { NextButton } from "./nextAndPre/nextButton";
import { PreButton } from "./nextAndPre/previousButton";
import { ButtonRepeat } from "../Button/ButtonRepeat";


export const PlayAction = () => {

  const handleClick = async () => {
    const boxAudio = document.querySelector(".inner-box-audio");
    if(boxAudio){
      const audioElement:any = boxAudio?.querySelector(".inner-audio");
      if(boxAudio.classList.contains("play")){
        boxAudio.classList.remove("play");
        if(audioElement){
          await audioElement.pause();
        }
      }
      else {
        boxAudio.classList.add("play");
        if(audioElement){
          await audioElement.play();
        }
      }
    }
  }

  return (
    <>
      <div className="flex-1 lg:mx-[30px] xl:mx-[52px] w-[40%] inner-action-1">
        <div className="h-full flex justify-between items-center text-[25px] md:text-[30px] md:mx-[15px]">
          {/* <button className="hover:text-[#00ADEF]">
            <BiSkipPrevious/>
          </button> */}
          {/* <button className="hover:text-[#00ADEF] ml-[20px] inner-repeat-song">
            <IoIosRepeat/>
          </button> */}
          <ButtonRepeat/>
          <PreButton/>
          <button 
            className="text-center mx-[10px] md:mx-[52px] text-[#00ADEF] inner-pause"
            onClick={handleClick}
          >
            <FaRegPauseCircle className=""/>
          </button>
          <button 
            className="mx-[10px] md:mx-[52px] text-[#00ADEF] inner-playing"
            onClick={handleClick}
          >
            <FaRegPlayCircle className=""/>
          </button>
          {/* <button className="hover:text-[#00ADEF]">
            <BiSkipNext/>
          </button> */}
          <NextButton/>
          <button className="hover:text-[#00ADEF] inner-lyric-song">
            <LiaMicrophoneAltSolid/>
          </button>
        </div>
        <PlayTime/>
      </div>
    </>
  )
}