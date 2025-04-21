"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, sign_up } from "@/store/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
export default function singin() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { firstname,lastname,email, password,phone,address };
    try {
      const result = await dispatch(sign_up({ data }));
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <div className=" min-h-screen w-full flex items-center justify-center py-[7vh] ">
      <div className="w-[50vw] min-h-[70vh] bg-white rounded-xl text-black shadow-xl flex flex-col items-center py-5 gap-10">
        <div className="font-bold text-3xl ">Registration User</div>
        <form
          suppressHydrationWarning
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <div className="w-[30vw] ">
            <div>Firstname :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your Firstname"
            />
          </div>

          <div className="w-[30vw] ">
            <div>Lastname :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setLastname(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your Lastname"
            />
          </div>

          <div className="w-[30vw] ">
            <div>Email :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your Email"
            />
          </div>

          <div className="w-[30vw] ">
            <div>Password :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your password"
            />
          </div>

          <div className="w-[30vw] ">
            <div>Phone :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your Phone"
            />
          </div>

          <div className="w-[30vw] ">
            <div>Address :</div>
            <input
              suppressHydrationWarning
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 border border-black p-2 px-2 rounded-full"
              type="text"
              placeholder="Enter The Your Address"
            />
          </div>

          <button
            fdprocessedid="xp2ldg"
            className=" w-[30vw] mt-8 bg-blue-500 rounded-full p-2 text-white text-xl hover:bg-blue-400 "
          >
            Sign up
          </button>

          <Link href="/sign-in">if you are already user ? Sign in</Link>
        </form>
      </div>
    </div>
  );
}
