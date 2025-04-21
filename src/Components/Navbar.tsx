"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IUser } from "@/models/User";

export default function Navbar() {
  const [is,setIs] = useState(false)
  const [login,setLogin] = useState<IUser| null>(null)
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user) as IUser
  

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      setIs(true)
    }
    const loginData = localStorage.getItem("login");
    if (loginData) {
      const login = JSON.parse(loginData);
      setLogin(login);
      localStorage.setItem("sender", login?._id)
    }

    console.log("user login after ", user,token);
  },[])

  return (
    <div className="fixed h-[7vh] top-0 p-2 shadow-xl z-[9] justify-between px-5  bg-white text-black w-full flex">
      <div className="flex gap-5 items-center">
        <h1 className="cursor-pointer" onClick={() => router.push("/")}>
          Navbar{" "}
        </h1>
      </div>
      <div className="flex items-center ">
        {is ? (
          <div className="mr-5 flex items-center gap-3  font-bold">
            <Link href="/sign-in">Logout</Link>
            <h1> {login?.firstname}</h1>
            <img
              className="w-11 h-11 object-cover"
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1329927775.1744784904&semt=ais_hybrid&w=740"
              alt=""
            />
          </div>
        ) : (
          <Link href="/sign-in" className="bg-green-500 p-2 px-3 rounded-xl">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
