"use client"
import Link from "next/link";
import { ButtonLove } from "../Button/ButtonLove";
import { ButtonPlay } from "../Button/ButtonPlay";


export const ItemSong = (props: {data:any}) => {
  let Song = props.data;
  const formattedNumber = Song.numberListen.toLocaleString("en-US");
  const handleClickTitle = async () => {
    const songItem = document.querySelector(`.inner-item-song-${Song.slug}`);
    if(songItem){
      //Auto click vao button de phat nhac
      const buttonPlay : any = songItem.querySelector(".inner-button-play");
      if(buttonPlay){
        buttonPlay.click();
      }
    }
  }
  return (
    <>
      <div className={`flex md:w-full items-center bg-[#212121] p-[10px] rounded-[15px] group inner-item-song-${Song.slug}`}>
        <div className="w-[76px] lg:w-[80px] aspect-square rounded-[10px] truncate">
          <img src={Song.image}  alt={Song.title} className="w-full h-full object-cover"/>
        </div>
        <div className="ml-[10px] flex-1">
            <h2 className="xl:text-[16px] lg:text-[14px] font-[600] text-[#FFFFFF] line-clamp-1 mb-[2px] group-hover:text-[#00ADEF] cursor-pointer" onClick={handleClickTitle}>
              {Song.songName}
            </h2>
          <div className="flex gap-x-[6px] line-clamp-1">
            {Song.singers.map((item:any, index:number) => (
              <Link href={`/singers/${item.slug}`} key={index}>
                <h3 className="text-[14px] lg:text-[15px] font-[400] text-[#FFFFFF80] mb-[4px] hover:text-[#ffffffcd]">
                  {item.fullName}
                </h3>
              </Link>
            ))}
          </div>
          <h3 className="xl:text-[12px] lg:text-[11px] md:text-[12px] font-[400] text-[#FFFFFF] line-clamp-1">
            {formattedNumber} lượt nghe
          </h3>
        </div>
        <ButtonPlay data={Song} css ="text-[#FFFFFF] xl:text-[30px] lg:text-[25px] text-[30px] mr-[10px] group-hover:text-[#00ADEF] inner-button-play"/>
        {/* <button className="text-[#FFFFFF] text-[35px]">
          <IoHeartCircle/>
        </button> */}
        <ButtonLove slugSong={Song.slug}/>
      </div>
    </>
  )
}