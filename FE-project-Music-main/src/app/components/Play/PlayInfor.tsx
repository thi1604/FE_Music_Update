

export const PlayInfor = () => {
  return (
    <>
      <div className="flex items-center inner-play-info w-[20%] md:w-[30%]">
        <div className="w-[50px] h-auto rounded-[14px] aspect-square truncate">
          <img src="/" alt="" className="w-full h-full inner-img"/>
        </div>
        <div className="ml-[12px]">
          <div className="text-[#FFFFFF] text-[15px] font-[700] line-clamp-1 inner-name-song">
            
          </div>
          <div className="text-[#FFFFFF70] text-[12px] font-[700] line-clamp-1 inner-singers">
            
          </div>
        </div>
      </div>
    </>
  )
}