// "use client"
import { BoxTitle } from "@/app/components/Box/BoxTitle";
import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { useState, useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết ca sĩ",
  description: "Trang chi tiết ca sĩ",
};

export const DetailSinger:any = (props:any) => {
  const slugSinger = props.slug;
  // console.log(slugSinger, "2");
  //Click ca si trong o input, an ket qua tim kiem
  const boxSearch = document.querySelector(".inner-box-search");
  const boxDisPlayData:any = boxSearch?.querySelector(".inner-search");
  boxDisPlayData?.classList.add("hidden");
  const [data, setData] = useState(null);
  // console.log(data);
  useEffect(() => {
    async function fetchData() {
      await fetch(`${base_url}/singers/detail/${slugSinger}`)
      .then(res=> res.json())
      .then((data => {
        setData(data);
        // console.log(data);
      }))
    }
    fetchData();
  }, []);
  const dataFinal: any = data;
  // console.log(dataFinal);
  let dataBoxHead = {};
  let listSongs: any[] = [];

  if(data){
    const singer = dataFinal.singer;
    console.log(dataFinal);
    dataBoxHead = {
      img: singer.avatar,
      title: singer.fullName,
      des: singer.description
    }

    for (const item of dataFinal.listSongs) {
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

      listSongs.push(dataSong);  
    }
  }

  return (
    <>
      <BoxTitle data={dataBoxHead}/>
      {/* Section-1 */}
      <Title text="Danh sách bài hát"/>
      <div className="grid grid-cols-1 gap-[10px]">
        {listSongs.length > 0 ? 
          listSongs.map((item, index) => (
            <ItemSong2 data={item} key={index}/>
          ))
        :
          <div className="text-[16px] font-[300] text-[#FFFFFF] italic">
            Danh sách trống!
          </div>
        }
      </div>
    </>
  )
}