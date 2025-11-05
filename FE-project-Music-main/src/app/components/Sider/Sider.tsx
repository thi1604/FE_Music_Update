"use client"
import { MdHome, MdNoEncryption } from "react-icons/md";
import { FaMusic, FaHeart, FaUserPlus, FaUserCircle  } from "react-icons/fa";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Logout } from "../Logout/Logout";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import MenuSider from "./MenuSider2";
import Search from "../Search/Search";
import Search2 from "../Search/Search2";
const listNav = [
  {
    title: "Trang chủ",
    icon: <MdHome/>,
    link: `/`
  }, 
  {
    title: "Danh mục bài hát",
    icon: <FaMusic />,
    link: `/categories`
  },
  {
    title: "Ca sĩ",
    icon: <LiaUserAstronautSolid />,
    link: `/singers`
  },
  {
    title: "Bài hát yêu thích",
    icon: <FaHeart/>,
    link: `/loveSongs`
  },
  {
    title: "Hồ sơ",
    icon: <FaUserCircle/>,
    link: `/detailUser`
  }
];

export default function Sider(){
  const pathNameCurrent = usePathname();
  // console.log(pathNameCurrent);
  const [isLogin, setIsLogin] = useState(false);
  const [isShowNav, setShowNav] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    setIsLogin(!!Cookies.get("userToken")); // Chỉ chạy khi component đã mount
  }, [!!Cookies.get("userToken")]);
  
  // Cookies.get("userToken") chi chay khi da renderToHTML, neu khong dung useEffect thi chay ben server, khi do loi ket qua
  return(
    <>
      <div className= "bg-[#292929] fixed flex top-0 left-0 justify-around items-center h-[80px] w-full md:block md:fixed md:top-auto md:left-auto md:bg-[#212121] lg:w-[260px] md:w-[255px] md:h-[100vh]">
        <Link href="/" className="order-2">
          <div className="h-[80px] px-[15px] py-[15px] text-center text-[35px] text-[#00ADEF] md:bg-[#1C1C1C]">
            Mờ Bê Bar
          </div>
        </Link>
        <nav className="hidden md:block">
          <ul className="mx-[20px] mt-[30px]">
            {listNav.map((item, index) => (
              <li key={index} >
                <Link href={item.link}  
                    className={"flex flex-start gap-[5px] items-center hover:text-[#00ADEF] font-700 mb-[30px] " + (pathNameCurrent === item.link ? " text-[#00ADEF]" : "text-white")}
                    key={index} 
                  >
                    <span className="xl:text-[22px] lg:text-[20px] md:text-[18px]">
                      {item.icon}
                    </span>
                    <span className="flex-1 md:text-[15px] xl:text-[16px] font-[700]">
                      {item.title}
                    </span>
                </Link>
              </li>
            ))}
            {isLogin ? (<li><Logout/></li>) :
            (<>
              <li>
                <Link href={"/login"}
                  className={"flex flex-start items-center hover:text-[#00ADEF] font-700 mb-[30px] " + (pathNameCurrent === "/login" ? " text-[#00ADEF]" : "text-white")}
                >
                  <span className="text-[22px]">
                    <RiLoginCircleLine/>
                  </span>
                  <span className="flex-1 ml-[20px] text-[16px] font-[700]">
                    Đăng nhập
                  </span>
                </Link>
              </li>
              <li>
                <Link href={"/register"} 
                  className={"flex flex-start items-center hover:text-[#00ADEF] font-700 mb-[30px] " + (pathNameCurrent === "/register" ? " text-[#00ADEF]" : "text-white")}
                >
                  <span className="text-[22px]">
                    <FaUserPlus/>
                  </span>
                  <span className="flex-1 ml-[20px] text-[16px] font-[700]">
                    Đăng ký
                  </span>
                </Link>
              </li>
            </>
          )
            }
          </ul>
        </nav>
        <button className="relative text-[35px] text-[#00ADEF] order-1 md:hidden" 
          onClick={() => isShowNav ? setShowNav(false) : (setShowNav(true), setShowSearch(false))}
        >
          <CiMenuBurger />
          <div className={`absolute bg-[#1C1C1C] top-[80px] hidden inner-show-menu z-[999] md:hidden ${isShowNav ? "show" : ""}`}>
            <div 
              className="fixed inset-0 top-[80px] bg-opacity-20 backdrop-blur-lg transition-opacity duration-300 opacity-100 visible"
              onClick={() => setShowNav(false)}
            >
              <MenuSider/>
            </div>
          </div>
        </button>
        <div className="relative cursor-pointer text-[35px] text-[#00ADEF] order-3 md:hidden" 
          onClick={() => isShowSearch ? setShowSearch(false) : (setShowSearch(true), setShowNav(false))}
        >
          <CiSearch />
          <div className={`absolute bg-[#1C1C1C] top-[80px] hidden inner-show-menu z-[999] md:hidden ${isShowSearch ? "show" : ""}`}>
            <div 
              className="fixed inset-0 top-[80px] bg-opacity-20 backdrop-blur-lg transition-opacity duration-300 opacity-100 visible"
              onClick={() => setShowSearch(false)}
            >
              <Search2/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}