import Link from "next/link";

export default async function NotFound () {
  return(
    <>
      <div className="font-[700] text-[35px] text-[#00ADEF]">
        NOT FOUND
      </div>
      <Link href="/">Quay lại trang chủ</Link>
    </>
  )
}