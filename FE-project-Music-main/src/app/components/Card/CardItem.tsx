import parse from 'html-react-parser';

export const CardItem = (props: any) => {
  const {data} = props;
  return (
    <>
      <div className="group w-full">
        <div className="w-[120px] xl:w-[180px] lg:w-[160px] md:w-full aspect-square rounded-[15px] truncate group-hover:border-[1px] group-hover:border-[#00ADEF]">
          <img src={data.image? data.image : data.avatar} alt={data.title} className="w-full h-full object-cover"/>
        </div>
        <div className="mt-[10px] text-[14px] font-[700] text-[#FFFFFF] text-left line-clamp-1 group-hover:text-[#00ADEF]">
          {`${data.title ? data.title: data.fullName}`}
        </div>
        <div className="mt-[10px] text-[12px] font-[400] text-[#FFFFFF80] text-left line-clamp-1">
          {parse(`${data.description}`)}
        </div>
      </div>
    </>
  )
}