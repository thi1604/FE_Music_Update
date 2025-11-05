import parse from 'html-react-parser';
import { FaHeadphones } from "react-icons/fa";

export const BoxTitle = (props:any) => {
  let {img, title, des, listenNumber} = props.data;
  let parseListenNumber = listenNumber?.toLocaleString("en-US") || "";
  des += '';
  return (
    <>
      <div className="flex items-center">
        <div className="w-[180px] aspect-square rounded-[15px] truncate">
          <img src={img} alt="Nhạc trẻ" className="w-full h-full object-cover"/>
        </div>
        <div className="ml-[20px] flex-1">
          <div className="font-[700] text-[35px] text-[#00ADEF]">
            {title}
          </div>
          <div className="font-[400] text-[14px] text-[#EFEEE0] line-clamp-3">
            {parse(des)}
          </div>
          {listenNumber && (
            <div className="mt-[12px] flex items-center gap-[8px] font-[400] text-[14px] text-[#EFEEE0]">
              <div className="text-[#00ADEF]">
                <FaHeadphones/>
              </div>
              <div className="inner-number-listen">
                {parseListenNumber} lượt nghe
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}