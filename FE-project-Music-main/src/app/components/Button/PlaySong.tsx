// import { useRouter } from "next/navigation";
import { base_url } from "../global";
let timeoutId: NodeJS.Timeout;

export async function PlaySong( SongCurrent:any, router: any) {
  const route = router;
  let Song : any = SongCurrent;
  const listSinger = Song.singers.map((item : any) => item.fullName);
    const stringNameSingers = listSinger?.join(", ");
    let timeTotal = 0; //Tong thoi gian bai hat
    let timeCurrent = 0 // Thoi gian hien tai dang hat
    // Dua du lieu vao box-audio
    const boxAudio:any = document.querySelector(".inner-box-audio");
    boxAudio?.classList.remove("hidden");
    boxAudio?.classList.add("play");
    const playAudio = document.querySelector(".inner-play-audio");
    const audioElement:any = boxAudio?.querySelector(".inner-audio");
    if(playAudio){
      const inforSong = playAudio.querySelector(".inner-play-info");
      if(inforSong){
        const inforNameSong = inforSong.querySelector(".inner-name-song");
        if(inforNameSong) inforNameSong.innerHTML = Song.songName;
        const inforNameSingers = inforSong.querySelector(".inner-singers");
        if(inforNameSingers) inforNameSingers.innerHTML = stringNameSingers || Song.nameSingers;
        const inforImage:any = inforSong.querySelector(".inner-img");
        if(inforImage) inforImage.src = Song.image?Song.image:Song.img;
      }
      //Dua file audio vao box-audio
      // const audioElement:any = boxAudio?.querySelector(".inner-audio");
      const elementSource = audioElement?.querySelector('source');
      if(elementSource) elementSource.src = Song.audio;
      await audioElement.load();
      const boxSearch = document.querySelector(".inner-box-search");
      const boxDisPlayData:any = boxSearch?.querySelector(".inner-search");
      boxDisPlayData?.classList.add("hidden");
      //Lay tong thoi gian
      audioElement.onloadedmetadata = () => {
        timeTotal = audioElement.duration;
        clearTimeout(timeoutId);
        //Tinh nang tang luot nghe(nghe it nhat 4/5 bai hat)
        timeoutId = setTimeout(() => {
          audioElement.onended = async () => {
            await fetch(`${base_url}/songs/listen/${Song.slug}`, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "PATCH"
            })
            .then(res=> res.json())
            .then(data => {
              if(data.code == 200){
                const numberElement = document.querySelector(".inner-number-listen");
                if(numberElement){
                  numberElement.innerHTML = data.newListen + " lượt nghe";
                }
                const boxAction = boxAudio.querySelector(".inner-action-1");
                const buttonNext = boxAction?.querySelector(".inner-next-song");
                if(buttonNext){
                  buttonNext.click(); //Chuyen sang bai hat tiep theo
                }
              }
            }); 
            audioElement.onended = undefined; //xóa sự kiện onended cho the audio 
          }
        }, timeTotal * 4 / 5 * 1000);
      }
      
      audioElement.play();
    }
    //Thoi gian chay tu dong
    const timeCurrentTree = boxAudio.querySelector(".inner-time-current");
    const changeTime = boxAudio.querySelector(".range-sm");
      if(timeCurrentTree && changeTime){
        // const audioElement:any = boxAudio?.querySelector(".inner-audio");
        audioElement.ontimeupdate = () => {
          timeCurrent = audioElement.currentTime;
          const timeUpdate = timeCurrent * 100 / timeTotal;
          // console.log(timeUpdate);
          timeCurrentTree.style.width = `${timeUpdate}%`;
          changeTime.value = `${timeUpdate}`;
        }
      }
    //Tua bai hat
    // const changeTime = boxAudio.querySelector(".range-sm");
    if(changeTime){
      changeTime.onchange = (event:any) => {
        const percentChange = parseFloat(event.target.value);
        const timeUpdate  = timeTotal * percentChange / 100;
        audioElement.currentTime = timeUpdate;
      }
    }
    //Nhung slug chi tiet bai hat vao button-micro
    const boxAction = boxAudio.querySelector(".inner-action-1");
    const getLyricSong = boxAction?.querySelector(".inner-lyric-song");
    if(getLyricSong){
      // getLyricSong.classList.add(`${Song.slug}`);
      getLyricSong.addEventListener("click", () => {
        route.push(`/songs/${Song.slug}`);
      });
    }
    //Tu dong next sang bai khac khi ket thuc
    audioElement.onended =  () => {
      const buttonNext = boxAction?.querySelector(".inner-next-song");
      // getLyricSong.classList.remove(`${Song.slug}`); //Xoa di slug bai hat hien tai trong micro
      if(buttonNext){
        buttonNext.click();
      }
    }
    // () => {
    //   const buttonNext = boxAction?.querySelector(".inner-next-song");
    //   // getLyricSong.classList.remove(`${Song.slug}`); //Xoa di slug bai hat hien tai trong micro
    //   if(buttonNext){
    //     console.log("oke2");
    //     buttonNext.click();
    //   }
      // if(getLyricSong){
      //   getLyricSong.click();
      // }
    // }
}