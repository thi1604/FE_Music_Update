import { Metadata } from "next";
import { DetailUser } from "./detailUser";
// import { NextRequest } from "next/server";

export const metadata: Metadata = {
  title: "Chi tiết tài khoản",
  description: "Trang chi tiết tài khoản",
};

export default function detailUserPage(){
  // const req = NextRequest;
  // console.log(req);
  return(
    <>
      <DetailUser/>
    </>
  )
}