export const InputForm  = (props: any) => {
  const {id, type, placeholder, textLabel} = props
  return(
    <>
      <div className="w-full mb-[15px]">
        {/* Khong de w-full thi component cha khong biet kich thuoc cu the de chia justify-center */}
        <div className="text-left text-[14px] font-600 mb-[5px]">
          <label htmlFor={id}>{textLabel}</label> <br/>
        </div>
        <input type={type} id={id} name={id} className="w-[500px] h-[50px] outline-none rounded-[6px] py-[14px] pl-[16px] pr-[32px] text-[#212121] placeholder:text-[#8D9396] placeholder:text-[14px] placeholder:font-[600] " placeholder={placeholder} required/>
      </div>
    </>
  )
}