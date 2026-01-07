import { BoxTitle } from "@/app/components/Box/BoxTitle";
import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";
import parse from 'html-react-parser';
import { LyricSong } from "@/app/components/LyricSong/LyricSong";

interface Singer {
  fullName: string;
  slug: string;
}

interface Song {
  title: string;
  avatar: string;
  description?: string;
  listenNumber: number;
  lyrics?: string;
  totalTime: string;
  audio: string;
  like?: number;
  slug: string;
  singers: Singer[];
}

interface SongDetail {
  songCurrent: Song;
  singer: Singer[];
  topicSlug: string;
  recommendedSongs: Song[];
}

interface TopicSongs {
  listSongs: Song[];
}

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Mô tả chi tiết bài hát, ca sĩ, lời bài hát",
};

export const DetailSong = (props: any) => {

  const slugSong = props.data;

  const [dataSec1, setData] = useState<SongDetail | null>(null);
  const [dataSec2, setData2] = useState<TopicSongs | null>(null);
  useEffect(() => {
    // Lấy dữ liệu bài hát và gợi ý
    async function fetchDataSong() {
      try {
        // 1. Lấy chi tiết bài hát và gợi ý
        const songDetailRes = await fetch(`${base_url}/songs/detail/${slugSong}`);
        const songDetailData = await songDetailRes.json();
        setData(songDetailData);

        // 2. Lấy bài hát cùng chủ đề
        const topicSlug = songDetailData.topicSlug;
        const topicRes = await fetch(`${base_url}/topics/${topicSlug}`);
        const topicData = await topicRes.json();
        setData2(topicData);

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }

    fetchDataSong();
  }, [slugSong]);

  // Xử lý dữ liệu cho box header và danh sách bài hát
  const dataBoxHead = dataSec1 ? {
    img: dataSec1.songCurrent.avatar,
    title: dataSec1.songCurrent.title,
    des: dataSec1.songCurrent.description,
    listenNumber: dataSec1.songCurrent.listenNumber
  } : {};

  // Xử lý lời bài hát
  const lyric = dataSec1 ?
    dataSec1.songCurrent.lyrics || "Chưa cập nhật lời bài hát!"
    : "";

  // Xử lý danh sách bài hát cùng chủ đề
  const listSongs = dataSec2 ? dataSec2.listSongs?.map(item => ({
    songName: item.title,
    timeSong: item.totalTime,
    img: item.avatar,
    singers: item.singers,
    listenNumber: item.listenNumber,
    like: item.like,
    audio: item.audio,
    lyrics: item.lyrics,
    slug: item.slug
  })) : [];

  // listSongs = [
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
      {/* Section-1 */}
      <BoxTitle data={dataBoxHead} />
      {/* Section-2 */}
      <Title text="Lời Bài Hát" />
      {/* <div className="rounded-[15px] bg-[#212121] p-[20px] whitespace-pre-line">
        {parse(lyric)}
      </div> */}
      {/* <LyricSong lyric={lyric}/> */}
      <Suspense>
        {lyric && <LyricSong lyric={lyric} />}
      </Suspense>
      {/* Section-3: Bài hát gợi ý */}
      {dataSec1?.recommendedSongs && dataSec1.recommendedSongs.length > 0 && (
        <>
          <Title text="Có Thể Bạn Sẽ Thích" />
          <div className="grid grid-cols-1 gap-y-[10px] mb-8">
            {dataSec1.recommendedSongs.map((item, index) => (
              <ItemSong2
                key={index}
                data={{
                  songName: item.title,
                  timeSong: item.totalTime || "",
                  img: item.avatar,
                  singers: item.singers,
                  listenNumber: item.listenNumber,
                  like: item.like,
                  audio: item.audio,
                  lyrics: item.lyrics,
                  slug: item.slug
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Section-4: Bài hát cùng danh mục */}
      <Title text="Bài Hát Cùng Danh Mục" />
      <div className="grid grid-cols-1 gap-y-[10px]">
        {listSongs && listSongs.map((item, index) => (
          <ItemSong2 data={item} key={index} />
        ))}
      </div>
    </>
  )
}