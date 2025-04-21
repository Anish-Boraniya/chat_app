'use client'
import Slider from "@/Components/Slider";
import ChatRoom from "@/Components/ChatRoom";
import NoChat from "@/Components/NoChat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeChat } from "@/store/userSlice";
import { AppDispatch,RootState } from "@/store/store";
import { clearChat } from "@/store/chatSlice";
import socket from "../socket"
import { useRouter } from "next/navigation";
export default function Home() {
  const [select,setSelect] = useState(false)
  const dispatch = useDispatch()
  const chat = useSelector((state: RootState) => state.user.chat)
  const router = useRouter();
  console.log("chat" , chat);
  
  useEffect(()=>{
    dispatch(removeChat())
    dispatch(clearChat())
    console.log("chhat" , chat);

    
  },[])

  useEffect(() => {

      const token = localStorage.getItem("token")
      if(!token){
        router.push('/sign-in')
      }

    const onConnect = ()=>{
      console.log("sokect is connected " , socket.io.engine.transport.name );
    }

    const onDisconnect = ()=>{
      console.log("socket is disconnected");
    }


    socket.on("connect", ()=>{
      console.log("sokect is connected ");

    });
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };

  }, []);

  return (
    <div className="flex h-screen items-center justify-items-center min-h-screen gap-16 px-[5vh] pt-[10vh] pb-[3vh] font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full min-h-full gap-3  items-center">
         <Slider />
         {/* <ChatRoom /> */}
         {chat ? <ChatRoom /> : <NoChat />}
      </main>
    </div>
  );
}
