export const PlayTime = () => {
  return (
    <>
      <div className="relative">
        <div className="h-[4px] w-[0%] bg-[#00ADEF] absolute left-0 top-[14px] rounded-[50px] inner-time-current"></div>
          <input 
            type="range" 
            min={0}
            max={100}
            step="0.00005"
            defaultValue={0}
            className="w-full h-[4px] cursor-pointer bg-[#292929] appearance-none rounded-[50px] transition duration-150 range-sm"
          />
      </div>
    </>
  )
}