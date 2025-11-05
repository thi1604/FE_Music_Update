import { PlayAction } from "./PlayActions";
import { PlayInfor } from "./PlayInfor";
import { PlayVolume } from "./PlayVolume";


export default function Play(){
  return(
    <>
      <div className="bg-[#212121] fixed bottom-0 left-0 right-0 z-[999] hidden inner-box-audio">
        <audio className="hidden inner-audio">
          <source src="/"/>
        </audio> 
        <div className="container mx-auto py-[15px]">
          <div className="flex my-[22px] justify-between justify-items-center inner-play-audio">
            {/* PLayInfor */}
            <PlayInfor/>
            {/* PlayAction */}
            <PlayAction/>
            {/* PLayVolume */}
            <PlayVolume/>
          </div> 
        </div>
      </div>
    </>
  )
}