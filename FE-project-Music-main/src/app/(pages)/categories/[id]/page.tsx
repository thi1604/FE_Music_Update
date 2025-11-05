"use client"
import { useParams } from "next/navigation";
import { DetailTopic } from "../DetailTopic";


export default function CategoriesPage() {
  const params = useParams();
  const slugTopic = params.id;
  // console.log(slugTopic);
  
  return (
    <>
      <DetailTopic data={slugTopic}/>
    </>
  )
}