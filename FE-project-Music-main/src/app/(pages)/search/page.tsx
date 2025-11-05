"use client"
import { useSearchParams } from "next/navigation";
import { SearchResult } from "./Search";


export default function SearchPage() {
  const searchParams:any = useSearchParams();
  const keyword = searchParams.get("keyword");
  
  return (
    <>
      <SearchResult data={keyword}/>
    </>
  )
}