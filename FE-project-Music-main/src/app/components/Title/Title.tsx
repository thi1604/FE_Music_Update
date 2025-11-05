export const Title = (props: any) => {
  const {text} = props
  return (
    <>
      <h2 className={`text-[24px] font-[700] text-[#EFEEE0] text-left mb-[19px] + ${text == "Nghe nhiều" ? "": "mt-[40px]"}`}>{text}</h2>
    </>
  )
}