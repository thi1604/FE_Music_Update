"use client"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";


export const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("userToken");
    // Cookies.set("show")
    router.push("/login");
  }
  const pathNameCurrent = usePathname();
  return (
    <>
      <div
        className={"flex flex-start items-center hover:text-[#00ADEF] font-700 mb-[30px] " + (pathNameCurrent == "logout" ? " text-[#00ADEF]" : "text-white")}
        onClick={handleLogout}
      >
        <span className="text-[22px]">
          <RiLogoutBoxLine />
        </span>
        <span className="flex-1 ml-[3px] text-[16px] font-[700]">
          Đăng xuất
        </span>
      </div>
    </>
  )
}