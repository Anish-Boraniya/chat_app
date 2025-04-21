"use client";
import Chat from "@/models/Chat";
import { IUser } from "@/models/User";
import {
  deleteChat,
  deleteMessege,
  getChat,
  sendChat,
} from "@/store/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import socket from "@/socket";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [senderID, setSender] = useState("");
  const [hoveredMsgIndex, setHoveredMsgIndex] = useState<number | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedChat = useSelector((state: RootState) => state.user);
  const sender = useSelector((state: RootState) => state.user.user) as IUser;
  const chats = useSelector((state: RootState) => state.chat.chat) as Chat;
  const dispatch = useDispatch<AppDispatch>();
  const id = localStorage.getItem("sender");

  console.log("select User", selectedChat, sender);
  console.log("chatroom chats", chat);
  console.log("socket get data", senderID, selectedChat?.chat?._id);

  const handelSend = (e: any) => {
    e.preventDefault();
    if (message.trim() === "") return;
    const id = localStorage.getItem("sender");

    console.log("submit chat", id, selectedChat?.chat?._id, message);
    dispatch(
      sendChat({ sender: id, receiver: selectedChat?.chat?._id, message })
    );
    dispatch(getChat({ sender: id, receiver: selectedChat?.chat?._id }));
    socket.emit("send", {
      message,
    });
    setMessage("");
  };

  const handleDelete = (id: string) => {
    const confrim = window.confirm("are you want to delete message ? ");
    if (confrim) {
      dispatch(deleteMessege({ chatId: chats?._id, messageId: id }));
      socket.emit("delete_message", chats?._id);
    }
  };

  const handleDeleteChat = () => {
    const confrim = window.confirm("are you want to delete message ? ");
    if (confrim) {
      dispatch(deleteChat({ id: chats?._id }));
      socket.emit("delete_message", chats?._id);
    }
  };

  useEffect(() => {
    const id: any = localStorage.getItem("sender");
    setSender(id);
    console.log("id", id);
    console.log("hello get data", senderID, selectedChat?.chat?._id);

    // Set up event listeners

    socket.on("send", (data: any) => {
      console.log("is socket send message", id, selectedChat?.chat?._id);
      dispatch(getChat({ sender: id, receiver: selectedChat?.chat?._id }));
    });
    socket.on("delete_message", (data: any) => {
      console.log("is socket delect message", id, selectedChat?.chat?._id);
      dispatch(getChat({ sender: id, receiver: selectedChat?.chat?._id }));
    });
    socket.on("delete_chat", (data: any) => {
      console.log("is socket delete chat", id, selectedChat?.chat?._id);
      dispatch(getChat({ sender: id, receiver: selectedChat?.chat?._id }));
    });

    // Clean up event listeners
    return () => {
      socket.off("send");
      socket.off("delete_message");
      socket.off("delete_chat");
    };
  }, [dispatch, selectedChat, chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="relative w-full h-[90vh] rounded-xl bg-white text-black overflow-hidden">
      {/* this is header */}
      <div className=" bg-zinc-100 h-[8vh] w-full flex items-center justify-between px-5 ">
        <div className="flex items-center gap-5">
          <div>
            <img
              className="w-12 h-11 object-cover rounded-full"
              src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?semt=ais_hybrid&w=740"
              alt=""
            />
          </div>
          <h1>{selectedChat?.chat?.firstname}</h1>
        </div>

        <div onClick={handleDeleteChat} className="text-xl mr-3 cursor-pointer">
          <MdDelete />
        </div>
      </div>
      {/* end */}

      {/* messge */}
      <div className="p-5 pb-[7vh] h-[70vh] flex flex-col items-start gap-2 overflow-y-auto">
        {chats &&
          chats?.messages?.map((mes, index) => {
            return (
              <div
                key={index}
                className={`flex w-full  ${
                  senderID === String(mes?.senderId?._id)
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  onMouseEnter={() => setHoveredMsgIndex(index)}
                  onMouseLeave={() => setHoveredMsgIndex(null)}
                  className="bg-zinc-100 relative flex justify-center hover:bg-zinc-200 cursor-pointer  p-2 px-3 rounded-tr-xl rounded-tl-xl rounded-br-xl "
                >
                  {mes?.message}
                  {hoveredMsgIndex === index && (
                    <div
                      onClick={() => handleDelete(mes?._id)}
                      className="absolute hover:text-xl text-xl h-11 -top-2 -right-2   px-1 rounded-full"
                    >
                      <MdDelete />
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </div>
            );
          })}

        {/* <div className="bg-zinc-100 w-fit p-2 px-3 rounded-tr-xl rounded-tl-xl rounded-br-xl ">
          sdusydgvsdkjshdkusbkchdbckhcbkh
        </div> */}
      </div>
      {/* end */}

      {/* this is footer */}
      <form
        onSubmit={handelSend}
        className=" absolute flex items-center gap-5 px-10 shadow-2xl bottom-0 w-full h-[12vh] bg-zinc-200 "
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 px-3 w-[90%] h-12 rounded-xl resize-none"
          placeholder="type here..."
        />
        <button
          type="submit"
          className="bg-black w-11 h-10 text-white flex items-center justify-center text-xl rounded-full"
        >
          <IoMdSend />
        </button>
      </form>

      {/* end */}
    </div>
  );
}
