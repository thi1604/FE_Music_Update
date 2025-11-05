"use client"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BiSkipPrevious } from "react-icons/bi"
import { PlaySong } from "../../Button/PlaySong";
import { base_url } from "../../global";
import useSongStore from "../../store/songsStore";


export const PreButton = () => {
  const route = useRouter();
  const {getSong, removeLastSong, getRepeat} = useSongStore();
  const repeat = getRepeat();
  const handlePre = async () => {
    if(!repeat) removeLastSong();
    const slugSong = getSong() + "";
    let Song : any;
    await fetch(`${base_url}/songs/detail/${slugSong}`)
    .then(res => res.json())
    .then(async data => {
      const item = data.songCurrent;
      Song = {
        songName: item.title,
        timeSong: item.totalTime,
        img: item.avatar,
        singers: data.singer,
        listenNumber: item.listenNumber,
        like: item.like,
        audio: item.audio,
        lyrics: item.lyrics,
        slug: item.slug
      }
    Cookies.set("songCurrent", slugSong);
    await PlaySong(Song, route);
  }
    )
  }
  return(
    <>
      <button className="hover:text-[#00ADEF]" onClick={handlePre}>
        <BiSkipPrevious/>
      </button>
    </>
  )
}