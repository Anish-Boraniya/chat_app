"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeChat } from "@/store/userSlice";
import { setChat } from "@/store/userSlice";
import { AppDispatch,RootState } from "@/store/store";
import { clearChat, getChat } from "@/store/chatSlice";
import { IUser } from "@/models/User";
import socket from "@/socket";

export default function Slider() {
  const [senderId , setSender] = useState('')
  const [receiver,setReceiver] = useState('')

  const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.user) 
    const user = users.users.filter((i: any)=> i._id !== senderId)
    const login = useSelector((state: RootState) => state.user.user) as IUser || null

  
    const handelClick = (user: any)=>{  
      dispatch(clearChat())
      const loginData = localStorage.getItem("login")
      if (!loginData) {
        console.log("localStorage 'login' not found");
        return;
      }
  
      const login: IUser = JSON.parse(loginData);
      console.log("Parsed login from localStorage", login);

      dispatch(setChat(user))
      console.log("handelclick", user);
      console.log("Sender ID:", login?._id, "Receiver ID:", user._id);
      dispatch(getChat({sender: login?._id, receiver: user._id}))
      setReceiver(user?._id)
    }
  
    useEffect(()=>{
       dispatch(getUsers()).then(()=>console.log("users",users))
       
       const id: any = localStorage.getItem("sender")
       setSender(id)

       socket.on("aaa", (data: any)=>{
          console.log("aaaaaa socket get chat");
                  
       })

       return () => {
        socket.off('aaa');
      };

    },[])

  return (
    <div className=" w-[80vh] h-[90vh] bg-white text-black  rounded-xl overflow-hidden">
      <div className="bg-zinc-100 h-[8vh] flex items-center px-5">
        <h1 className="text-2xl shdow-xl">Chat</h1>
      </div>
      <div className="flex flex-col gap-3 p-5">
        {users && user?.map((user,index)=>(
          <div onClick={()=>handelClick(user)} key={index} className="w-full flex items-center gap-5 px-5 h-[9vh] rounded-xl bg-zinc-100 hover:bg-zinc-200 cursor-pointer">
            <div>
              <img className="w-12 h-12 object-cover rounded-full" src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?semt=ais_hybrid&w=740" alt="" />
            </div>
          <h1>{user?.firstname}</h1>
       </div>
        ))}
        {
          users?.loading && "users loading...."
        }
      </div>
    </div>
  );
}
