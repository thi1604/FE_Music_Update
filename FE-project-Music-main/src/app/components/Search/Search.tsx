"use client"
import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { base_url } from "../global";
import { ItemSong2 } from "../ItemSong/ItemSong2";
import { useRouter } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";
import MicRecord from "../MicRecord/MicRecord";

export default function Search() {
  const [dataSearch, setDataSearch] = useState<any[] | null>(null);
  const [keySearch, setKeySearch] = useState("");
  const debouncedKeyword = useDebounce(keySearch, 300);

  const handleKeyup = (event: any) => {
    const keyword = event.target.value;
    setKeySearch(keyword);
  }

  // Callback nhận audio từ MicRecord
  const handleMicAudio = useCallback(async (audioBlob: Blob) => {
    // Gửi file audio lên backend và nhận kết quả
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.webm");
    try {
      const response = await fetch(`${base_url}/songs/api/recognize-audio`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Kết quả nhận dạng từ Search:", data);
      if (data.song) {
        setDataSearch([data.song]);
        // Hiển thị box kết quả khi có nhận diện
        const boxSearch = document.querySelector(".inner-box-search");
        const boxDisPlayData: any = boxSearch?.querySelector(".inner-search");
        if (boxDisPlayData) boxDisPlayData.classList.remove("hidden");
      } else {
        setDataSearch(null);
      }
    } catch (error) {
      console.error("Lỗi khi gửi file ghi âm từ Search:", error);
    }
  }, [setDataSearch]);

  useEffect(() => {
    const boxSearch = document.querySelector(".inner-box-search");
    const boxDisPlayData: any = boxSearch?.querySelector(".inner-search");
    if (debouncedKeyword != "") {
      boxDisPlayData.classList.remove("hidden");
      const fetchDataSearch = async () => {
        await fetch(`${base_url}/songs/search/${debouncedKeyword}`,
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            }
          })
          .then(res => res.json())
          .then(data => {
            const songs = data.songs;
            setDataSearch(songs);
          })
      }
      fetchDataSearch();
    }
    else {
      boxDisPlayData.classList.add("hidden");
    }
  }, [debouncedKeyword]);

  const router = useRouter(); //Muon dung useRouter() phai de tren dau cac ham(trong cac component), ko duoc de ben trong ham` thuong`
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const value = event.target.keySearch.value;
    // const router = useRouter(); Sai vi tri
    const boxSearch = document.querySelector(".inner-box-search");
    const boxDisPlayData: any = boxSearch?.querySelector(".inner-search");
    boxDisPlayData.classList.add("hidden");
    router.push(`/search?keyword=${value}`);
  }

  let listSongs: any[] = [];
  let listSongsFinal = [];
  if (dataSearch) {
    listSongs = dataSearch;
    for (const item of listSongs) {
      const dataSong = {
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
      listSongsFinal.push(dataSong);
    }
  }

  return (
    <>
      <div
        className="bg-[#212121] hidden md:w-[80px] text-[#FFFFFF] h-[52px] my-[5px] rounded-[50px] fixed top-[5px] md:flex justify-start items-center py-[15px] pl-[30px] md:hover:w-[400px] lg:hover:w-[600px] duration-700 inner-box-search group"
      >
        <form className="flex flex-1 items-center w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="mr-[20px] ml-[20px] bg-transparent outline-none w-[80%] placeholder:text-[#FFFFFF] text-[16px] font-[500] order-2"
            placeholder="What are you looking for...?"
            autoComplete={"off"}
            onKeyUp={handleKeyup}
            name="keySearch"
          />
          <button className="order-1">
            <FaSearch className="text-[22px] " />
          </button>
          <div className="order-3 flex items-center ml-2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:ml-2 group-hover:mr-2">
            <MicRecord onAudioReady={handleMicAudio} />
          </div>
        </form>
        <div className="text-[#FFFFFF] absolute top-[52px] bg-[#212121] w-[80%] max-h-[240px] rounded-[5px] overflow-y-auto hidden inner-search">
          {listSongsFinal && listSongsFinal.length > 0 && (
            listSongsFinal.map((item: any, index: number) => (
              <ItemSong2 key={index} data={item} />
            ))
          )}
        </div>
      </div>
    </>
  )
}