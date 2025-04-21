  'use client'
  import { useRouter } from "next/navigation";
  import React, { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { login } from "@/store/userSlice";
  import { AppDispatch, RootState } from "@/store/store";
import socket from "@/socket";
  export default function singin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const router =  useRouter()

    const handleSubmit = async(e: React.FormEvent)=>{
      e.preventDefault();
      try {
        const result = await dispatch(login({ email, password }))
        if (result.meta.requestStatus === 'fulfilled') {
          router.push('/');
        }

      } catch (error) {
        console.error("Login failed:", error);
        // Display an error message to the user
      }
    }

    useEffect(()=>{
      localStorage.removeItem("token")

      socket.on("delete_massage",()=>{
        console.log("hello i am socket");
        
      })
      socket.on("send",()=>{
        console.log("hello i am socket");
        
      })

    },[])

    return (
      <div className=" h-[100vh] flex items-center justify-center ">
          <div className='w-[50vw] h-[70vh] bg-white rounded-xl text-black shadow-xl flex flex-col items-center py-5 gap-10'>
            <div className='font-bold text-3xl '>Login User</div>
            <form 
            suppressHydrationWarning
            onSubmit={handleSubmit}
            className='flex flex-col gap-5 items-center'>
              <div className='w-[30vw] '>
                  <div>
                      Email :
                  </div>
                  <input
                  suppressHydrationWarning
                  onChange={(e)=>setEmail(e.target.value)}
                  className='w-full mt-2 border border-black p-2 px-2 rounded-full' type="text" placeholder='Enter The Your Email'/>
              </div>
              <div className='w-[30vw] '>
                  <div>
                      Password :
                  </div>
                  <input
                  suppressHydrationWarning
                  onChange={(e)=>setPassword(e.target.value)} 
                  className='w-full mt-2 border border-black p-2 px-2 rounded-full' type="text" placeholder='Enter The Your password'/>
              </div>
              <button 
              fdprocessedid="xp2ldg"
              className=' w-[30vw] mt-8 bg-blue-500 rounded-full p-2 text-white text-xl hover:bg-blue-400 '>Login</button>
              <div>Back</div>
            </form>
        </div>
      </div>
    );
  }