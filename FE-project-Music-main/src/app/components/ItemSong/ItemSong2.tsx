"use client"
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { ButtonLove } from "../Button/ButtonLove";
import { ButtonPlay } from "../Button/ButtonPlay";

export const ItemSong2 = (props: any) => {
  const { data } = props;
  const handleClickTitle2 = async () => {
    const songItem = document.querySelector(`.inner-item-song-2-${data.slug}`);
    if (songItem) {
      //Auto click vao button de phat nhac
      const buttonPlay: any = songItem.querySelector(".inner-button-play-2");
      if (buttonPlay) {
        await buttonPlay.click();
      }
    }
  }
  return (
    <>
      <div className={`flex items-center bg-[#212121] py-[10px] px-[18px] rounded-[15px] group inner-item-song-2-${data.slug}`}>
        <div className="flex flex-1 lg:flex-none gap-x-[12px] items-center w-[40%] flex-shrink-0">
          <ButtonPlay data={data} css="text-[21px] inner-button-play-2 text-[#FFFFFF]  group-hover:text-[#00ADEF]" />
          <div className="w-[42px] min-h-[42px] aspect-square flex-shrink-0 rounded-[8px] truncate">
            <img src={data.img} alt="Bài..." className="w-full h-full object-cover" />
          </div>
          <h2 className="text-[16px] font-[600] text-[#FFFFFF] line-clamp-1 mb-[2px] group-hover:text-[#00ADEF] cursor-pointer" onClick={handleClickTitle2}>
            {data.songName}
          </h2>
        </div>
        <div className="flex-1 hidden lg:block font-[400] text-[14px] text-[#FFFFFF] lg:ml-[60px] line-clamp-1">
          <div className="flex gap-x-[6px] justify-start line-clamp-1">
            {data?.singers?.map((item: any, index: number) => (
              <Link href={`/singers/${item.slug}`} key={index}>
                <h3 className="line-clamp-1 flex-1 sm:line-clamp-none text-[14px] font-[400] text-[#FFFFFF80] mb-[4px] hover:text-[#ffffffcd]">
                  {item.fullName}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-x-[18px] items-center font-[400] text-[14px] text-[#FFFFFF]">
          <div className="hidden lg:block font-[400] text-[14px] text-[#FFFFFF] inner-time-song">{data.timeSong}</div>
          {/* <button className="text-[17px] text-[#00ADEF]">
            <FaHeart />
          </button> */}
          <ButtonLove slugSong={data.slug} />
        </div>
      </div>
    </>
  )
}