"use client"
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { base_url } from "../global";
import { ItemSong2 } from "../ItemSong/ItemSong2";
import { useRouter } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";

export default function Search2() {
  const [dataSearch, setDataSearch] = useState(null);
  const [keySearch, setKeySearch] = useState("");
  const debouncedKeyword = useDebounce(keySearch, 300);

  const handleKeyup = (event: any) => {
    const keyword = event.target.value;
    if (keyword !== "Enter") {
      setKeySearch(keyword);
    }
  }

  const handleClickForm = (event: any) => {
    event.stopPropagation();
  }
  const router = useRouter(); //Muon dung useRouter() phai de tren dau cac ham(trong cac component), ko duoc de ben trong ham` thuong`
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const value = event.target.keySearch.value;
    // const router = useRouter(); Sai vi tri
    const boxSearch = document.querySelector(".inner-box-search2");
    const boxDisPlayData: any = boxSearch?.querySelector(".inner-search");
    boxDisPlayData.classList.add("hidden");
    router.push(`/search?keyword=${value}`);
  }

  useEffect(() => {
    if (debouncedKeyword) {
      const boxSearch = document.querySelector(".inner-box-search2");
      const boxDisPlayData: any = boxSearch?.querySelector(".inner-search");
      if (debouncedKeyword != "Enter") {
        boxDisPlayData.classList.remove("hidden");
        const fetchDataSearch = async () => {
          await fetch(`${base_url}/songs/search/${debouncedKeyword}`, {
            headers: {
              "Content-Type": "application/json"
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
    }
  }, [debouncedKeyword]);

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
        className="bg-[#212121] mt-[15px] w-[400px] flex justify-center items-center mx-auto text-[#FFFFFF] h-[52px] my-[5px] py-[15px] pl-[30px] rounded-[50px] inner-box-search2"
      >
        <form className="flex flex-1" onSubmit={handleSubmit} onClick={handleClickForm}>
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
        </form>
        <div className="text-[#FFFFFF] absolute top-[66px] md:top-[52px] bg-[#212121] w-[80%] max-h-[240px] rounded-[5px] overflow-y-auto hidden inner-search">
          {listSongsFinal && (listSongsFinal.map((item: any, index: number) => (
            <ItemSong2 key={index} data={item} />
          )))
          }
        </div>
      </div>
    </>
  )
}