"use client"

import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import Cookies from "js-cookie";
// import { Metadata } from "next";
import { useEffect, useState } from "react";


// export const metadata: Metadata = {
  
//   title: "Danh mục bài hát",
//   description: "Các bài hát theo danh mục",
// };

export default function LoveSongs() {
  const isLogin = Cookies.get("showAlert");
  const tokenUser = Cookies.get("userToken");
  console.log(isLogin);
  if(isLogin == "true"){
    const alertBox = document.querySelector(".inner-box-alert");
    const alert = alertBox?.querySelector(".inner-alert");
    alert?.classList.remove("hidden");
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await fetch(`${base_url}/songs/love-songs`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({tokenUser})
      })
      .then(res=> res.json())
      .then((data => {
        setData(data);
        console.log(data);
      }))
    }
    if(tokenUser){
      fetchData();
    }
  }, []);

  const dataFinal: any = data;
  // console.log(dataFinal);
  let listSongs: any[] = [];

  if(data){
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



  // const listSongs = [
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   },
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   },
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   }
  // ]
  return (
    <>
      <Title text="Bài hát yêu thích"/>
      <div className="grid grid-cols-1 gap-y-[10px]">
        {listSongs.length ? 
          (listSongs.map((item, index) => (
          <ItemSong2 data={item} key={index}/>
        )))
        :
        (
          <div className="text-[16px] font-[300] text-[#FFFFFF] italic">
            Danh sách trống!
          </div>
        )
      }
      </div>
    </>
  )
}