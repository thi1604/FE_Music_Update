  "use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSongStore from '../store/songsStore';

  export const LyricSong = (props: any) => {
    const {lyric} = props;
    const params = useParams();
    const slugCurrentPage = params.id;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lyricParse, setLyricParse] = useState<any[]>();
    const {getSong} = useSongStore();
    useEffect(() => {
      let lyricFinal :any[] = [];
      lyricFinal = lyric.split("\n");
      lyricFinal = lyricFinal.map((line: string) => {
        const match = line.match(/\[(\d+):(\d+).(\d+)\] (.+)/); //Phan tich thoi gian thanh so giay
        if(match){
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          const milliseconds = parseInt(match[3], 10);
          const text = match[4];
          return {
            time: minutes * 60 + seconds + milliseconds / 100,
            text,
          };
        }
        else {
          return 1;
        }
      });
      setLyricParse(lyricFinal);
    }, []);
    let newLyric = new Array();

    useEffect(() => {
      const boxAudio:any = document.querySelector(".inner-box-audio");
      const audioElement:any = boxAudio?.querySelector(".inner-audio");
      const updateLyrics = () => {
        const currentTime = audioElement.currentTime;
        if(lyricParse){
          const index = lyricParse.findIndex((line, i)=> {
            return currentTime >= line.time && (i == lyricParse.length - 1 || currentTime < lyricParse[i + 1].time);
          })
          //Check xem lyric cua bai hat dang phat va trang chi tiet bai hat co trung nhau khong
          const slugCurrentButton = getSong();
          
          if(index != -1 && (slugCurrentButton == slugCurrentPage)){
            setCurrentIndex(index);
          }
          newLyric = [...lyricParse];
        }
      }
      audioElement?.addEventListener("timeupdate", updateLyrics);
      return () => audioElement?.removeEventListener("timeupdate", updateLyrics);
    }, [lyricParse]);
    return (
      <>
        <div 
          className="rounded-[15px] bg-[#212121] p-[20px] whitespace-pre-line h-[400px] overflow-y-scroll"
        >
          {lyricParse && (lyricParse.map((item: any, index: number) => (
            <p 
              key={index}
              className={`text-[20px] font-[600] mb-[5px] transition-all duration-300 ${index <= currentIndex ? "text-[#00ADEF]":"text-[#FFFFFF]"}`}
            >
              {item.text}
            </p>
          )))}
        </div>
      </>
    )
  }