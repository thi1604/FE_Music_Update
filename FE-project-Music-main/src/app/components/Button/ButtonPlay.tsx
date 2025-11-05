"use client"
import { FaPlayCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { PlaySong } from "./PlaySong";
import Cookies from "js-cookie";
import useSongStore from "../store/songsStore";


export const ButtonPlay = (props:any) => {
  const route = useRouter();
  const Song = props.data;
  const {addSong} = useSongStore(); //Su dung zustand de quan li hang doi bai hat
  const handleClick = async () => {
    Cookies.set("songCurrent", Song.slug)
    // console.log(Cookies.get("songCurrent"), "1");
    // console.log(Song);
    addSong(Song.slug);
    await PlaySong(Song, route);
  }
  return (
    <>
      <button className={props.css} onClick={handleClick}>
          <FaPlayCircle/>
      </button>
    </>
  )
}