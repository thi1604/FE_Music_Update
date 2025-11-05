"use client"
import { BoxTitle } from "@/app/components/Box/BoxTitle";
import { Title } from "@/app/components/Title/Title";
import { useParams } from "next/navigation";
import { DetailSong } from "../DetailSong";

export default function DetailSongPage() {
  const params = useParams();
  const slugSong = params.id;
  

  return (
    <>
      <DetailSong data={slugSong}/>
    </>
  )
}