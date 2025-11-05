"use client"
import { FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";


export const PlayVolume = () => {
  const handleChangeVolume = (event: any) => {
    const volumeChange = parseInt(event.target.value);
    const boxAudio:any = document.querySelector(".inner-box-audio");
    const audioElement:any = boxAudio?.querySelector(".inner-audio");
    if(audioElement){
      const boxVolume = boxAudio.querySelector(".inner-volume");
      if(volumeChange == 0){
        if(boxVolume){
          boxVolume.classList.remove("play");
        }
      }
      else {
        if(boxVolume){
          boxVolume.classList.add("play");
        }
      }
      audioElement.volume = (volumeChange / 100);
      const volumeCurrentTree = boxAudio.querySelector(".inner-volume-current");
      volumeCurrentTree.style.width = `${volumeChange}%`;
    }
  }
  return (
    <>
     <div className="flex justify-end items-center w-[20%] ml-[10px] md:ml-0 md:w-[30%] inner-volume play">
      <button className="inner-noise">
        <FaVolumeHigh/>
      </button>
      <button className="inner-mute hidden">
        <FaVolumeXmark/>
      </button>
      <div className="relative ml-[4px] flex items-center">
        <div className="h-[2px] w-[80%] bg-[#00ADEF] absolute left-0 top-0 rounded-[50px] inner-volume-current"></div>
          <input 
            type="range" 
            min={0}
            max={100}
            defaultValue={80}
            className="w-full h-[2px] cursor-pointer bg-[#292929] appearance-none rounded-[50px] range-sm"
            onChange={handleChangeVolume}
          />
      </div>
    </div> 
    </>
  )
}