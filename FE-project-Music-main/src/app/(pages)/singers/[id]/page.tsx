"use client"
import { DetailSinger } from "../DetailSinger";
import { useParams } from "next/navigation";


export default function SingerDetailPage() {
  const params = useParams();
  const slugSinger = params.id;

  return (
    <>
      <DetailSinger slug={slugSinger}/>
    </>
  )
}