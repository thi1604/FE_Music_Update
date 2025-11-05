import { Metadata } from "next";
import { CardItem } from "./components/Card/CardItem";
import { ItemSong } from "./components/ItemSong/ItemSong";
import { Title } from "./components/Title/Title";
import { base_url } from "./components/global";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Project nghe nhạc trực tuyến",
};


export default async function HomePage () {

  let data2And3 : any = await fetch(`${base_url}`,{
    // cache: "no-store",
    // headers: {
    //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    // }
  });
  data2And3 = await data2And3.json();

  let dataSec1 : any = await fetch(`${base_url}/songs/topSongs`,{
    // cache: "no-store",
    // headers: {
    //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    // }
  });
  dataSec1 = await dataSec1.json();
  
  const dataSection1 = dataSec1.dataFinal.map((item:any) => {
    return {
      songName: item.title,
      image: item.avatar,
      numberListen: item.listenNumber,
      singers: item.singers,
      slug: item.slug,
      audio: item.audio
    }
  });

  const dataSection2 = data2And3.listTopicsOS;

  const dataSection3 = data2And3.listSingesrOS;

  return (
    <>
      {/* Section-1 */}
      <div className="xm:h-[361px] flex lg:flex-nowrap gap-x-[20px] md:flex-wrap">
        <div className="hidden xm:w-[55%] lg:w-[53%] md:w-full bg-[url('/assets/imgs/img-bg-2.png')] bg-cover bg-center rounded-[15px] md:flex items-center ">
            <div className="font-[700] text-[32px] lg:text-[30px] text-[#FFFFFF] w-[231px] ml-[30px] lg:ml-[15px] lg:w-[50%] mb-[20px]">
              <h2 className="mb-[6px]">
                Nhạc EDM
              </h2>
              <div className="font-[500] text-[14px] text-[#FFFFFF]">
                Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ
              </div>
            </div> 
          <div className="w-[215px] lg:w-[200px] lg:h-[280px] mt-[40px] lg:mt-[115px]">
            <img src="/assets/imgs/img-bg-1.png" alt="Bìa nhạc" className="object-cover w-full h-full"/>
          </div> 
        </div>
        <div className="w-full mx-[20px] sm:mx-0 flex-1 md:mt-[15px] sm:w-[45%]">
          <Title text="Nghe nhiều"/>
          <div className="grid grid-cols-1 gap-[12px] md:w-[full] mt-[15px] lg:mt-[10px]">
            {dataSection1.map((item:any, index:number) => (
              <ItemSong data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* Section2 */}
      <div className="mt-[30px]">
        <Title text="Danh Mục Nổi Bật"/>
        <div className="grid grid-cols-3 gap-[15px] xl:grid-cols-5 xl:gap-[20px] lg:grid-cols-4 lg:gap-[10px] md:grid-cols-2 md:gap-[15px] mt-[20px]">
          {dataSection2.map((item : any, index : number) => (
            <Link href={`/categories/${item.slug}`} key={index}>
              <CardItem data={item} key={index}/>
            </Link>
          ))}
        </div>
      </div>
      {/* Section-3 */}
      <div className="mt-[30px]">
        <Title text="Ca Sĩ Nổi Bật"/>
        <div className="grid grid-cols-3 gap-[15px] xl:grid-cols-5 xl:gap-[20px] lg:grid-cols-4 lg:gap-[10px] md:grid-cols-2 md:gap-[15px] mt-[20px]">
          {dataSection3.map((item : any, index : number) => (
            <Link href={`/singers/${item.slug}`} key={index}>
              <CardItem data={item} key={index}/>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
