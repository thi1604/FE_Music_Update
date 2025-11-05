"use client"
import { MdHome } from "react-icons/md";
import { FaMusic, FaHeart, FaUserPlus, FaUserCircle  } from "react-icons/fa";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Logout } from "../Logout/Logout";
import { useEffect, useState } from "react";

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

export default function MenuSider(){
  const pathNameCurrent = usePathname();
  // console.log(pathNameCurrent);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!Cookies.get("userToken")); // Chỉ chạy khi component đã mount
  }, [!!Cookies.get("userToken")]);
  
  // Cookies.get("userToken") chi chay khi da renderToHTML, neu khong dung useEffect thi chay ben server, khi do loi ket qua
  return(
    <>
      <nav className="w-[300px] h-[350px]">
        <ul className="mx-[20px] mt-[10px]">
          {listNav.map((item, index) => (
            <li key={index} >
              <Link href={item.link}  
                  className={"flex flex-start gap-[5px] items-center hover:text-[#00ADEF] font-400 mb-[15px] " + (pathNameCurrent === item.link ? " text-[#00ADEF]" : "text-white")}
                  key={index} 
                >
                  <span className="text-[18px] font-[600] xl:text-[22px] lg:text-[20px] md:text-[18px]">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-[18px] font-[600] md:text-[15px] xl:text-[16px] md:font-[700]">
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
    </>
  )
}