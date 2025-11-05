"use client"
import { useRouter } from "next/navigation"
import { BiSkipNext } from "react-icons/bi"
import { PlaySong } from "../../Button/PlaySong"
import { base_url } from "../../global"
import Cookies from "js-cookie"
import useSongStore from "../../store/songsStore"

export const NextButton = () => {
  const {addSong, getRepeat, getSong} = useSongStore();
  const route = useRouter();
  let Song : any;
  const slug = getSong();
  const handleNextSong = async () => {
    const repeat = getRepeat(); //Che do lap lai
    if(!repeat){
      await fetch(`${base_url}/songs/random`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          slugSong: slug
        })
      })
      .then(res => res.json())
      .then(async data => {
        const item = data.songs;
        Song = {
          songName: item.title,
          timeSong: item.totalTime,
          img: item.avatar,
          singers: item.singers,
          listenNumber: item.listenNumber,
          like: item.like,
          audio: item.audio,
          lyrics: item.lyrics,
          slug: item.slug
        }
      Cookies.set("songCurrent", Song.slug)
      addSong(Song.slug);
      await PlaySong(Song, route);
      })
    }
    else{
      await fetch(`${base_url}/songs/detail/${slug}`)
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
    })
    Cookies.set("songCurrent", Song.slug)
    await PlaySong(Song, route);
  }
  }
  return (
    <button className="hover:text-[#00ADEF] inner-next-song" onClick={handleNextSong}>
      <BiSkipNext/>
    </button>
  )
}