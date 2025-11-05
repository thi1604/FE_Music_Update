import { BoxTitle } from "@/app/components/Box/BoxTitle";
import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { useEffect, useState } from "react";


export const metadata: Metadata = {
  title: "Bài hát theo danh mục",
  description: "Các bài hát theo danh mục",
};



export const DetailTopic = (props:any) => {
  const slugTopic = props.data;

  const [dataSec2, setData2] = useState(null);
  // console.log(dataSec2);
  useEffect(() => {
      //Lay ra bai hat cung topic
      const fetchDataSong = async () => {
        await fetch(`${base_url}/topics/${slugTopic}`)
        .then(res=> res.json())
        .then((data => {
          setData2(data);
        }));
      } 
      fetchDataSong();
    }
    ,[]);

  let dataBoxHead = {};
  let listSongs = [];

  if(dataSec2){
    const dataFinal:any = dataSec2;
    dataBoxHead = {
      img: dataFinal.topicCurrent.avatar,
      title: dataFinal.topicCurrent.title,
      des: dataFinal.topicCurrent.description
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
      {/* Section-1 */}
      <BoxTitle data = {dataBoxHead}/>
        {/* Section-2 */}
        <div className="mt-[30px] mb-[20px]">
          <Title text="Danh Sách Bài Hát"/>
        </div>
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