import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import {useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Các kết quả tìm kiếm",
};

interface SearchData {
  songs: any[];
  recommendedSongs: any[];
}

export const SearchResult = (props: any) => {
  const keyword = props.data;
  const [data, setData] = useState<SearchData | null>(null);

  useEffect(() => {
    // Lay du lieu bai hat tu keyword
    async function fetchDataSearch() {
      await fetch(`${base_url}/songs/search/${keyword}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res=> res.json())
      .then((data => {
        setData(data);
      }));
    }
    fetchDataSearch();
  }, [keyword]);

  // Xử lý kết quả tìm kiếm chính
  const listSongs = data?.songs?.map(item => ({
    songName: item.title,
    timeSong: item.totalTime || "",
    img: item.avatar,
    singers: item.singers,
    listenNumber: item.listenNumber,
    like: item.like,
    audio: item.audio,
    lyrics: item.lyrics,
    slug: item.slug
  })) || [];

  // Xử lý kết quả gợi ý
  const recommendedSongs = data?.recommendedSongs?.map(item => ({
    songName: item.title,
    timeSong: item.totalTime || "",
    img: item.avatar,
    singers: item.singers,
    listenNumber: item.listenNumber,
    like: item.like,
    audio: item.audio,
    lyrics: item.lyrics,
    slug: item.slug
  })) || [];

  return (
    <>
      {/* Kết quả tìm kiếm chính */}
      <Title text={`Kết Quả Tìm Kiếm: "${keyword}"`}/>
      <div className="grid grid-cols-1 gap-y-[10px] mb-8">
        {listSongs.length > 0 ? 
          listSongs.map((item, index) => (
            <ItemSong2 data={item} key={index}/>
          ))
        :
          <div className="text-[16px] font-[300] text-[#FFFFFF] italic">
            Không tìm thấy bài hát phù hợp!
          </div>
        }
      </div>

      {/* Kết quả gợi ý */}
      {recommendedSongs.length > 0 && (
        <>
          <Title text="Có Thể Bạn Quan Tâm"/>
          <div className="grid grid-cols-1 gap-y-[10px]">
            {recommendedSongs.map((item, index) => (
              <ItemSong2 data={item} key={index}/>
            ))}
          </div>
        </>
      )}
    </>
  )
}