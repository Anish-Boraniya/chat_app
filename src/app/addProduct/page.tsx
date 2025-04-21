'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function product() {
    const router = useRouter()
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    console.log("Submit data", data)
    const res = axios.post("/api/product", data)
    console.log("hadelsubmit response", res);

    router.push('/')
    
  }

  useEffect(() => {

   const fetchProduct = async () =>{
    try{
        const res = await axios.get("/api/product")
    //    .then((res) => {
    //       console.log("got data", res.data);
          
    //     })

        console.log("dasdasda", res.data);
        
    }catch(err){
      console.error("Product GET error",err);

  }
 
   }

   fetchProduct()

  }, []);
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <div className="bg-white mt-10 w-[50vw] h-[75vh] text-black rounded-xl p-5  flex flex-col items-center ">
        <div
        onClick={()=> router.push('/Product')}
        className="-ml-[45vw] cursor-pointer">back</div>
        <h1>Add Product</h1>
        <form 
        onSubmit={handleSubmit}
        className="w-[25vw]">

          <div className="flex flex-col mt-5 gap-3">
            <label htmlFor="name">Name:</label>
            <input
            onChange={(e)=>setData({...data, name: e.target.value})} 
            type="text" 
            id="name" 
            name="name"
            className=" border border-gray-300 p-2 rounded-xl " 
            suppressHydrationWarning
             />
          </div>

          <div className="flex flex-col mt-5 gap-3">
            <label htmlFor="description">Description:</label>
            <input
            onChange={(e)=>setData({...data, description: e.target.value})} 
            type="text" 
            id="description" 
            name="description"
            className=" border border-gray-300 p-2 rounded-xl " 
            suppressHydrationWarning
             />
          </div>

          <div className="flex flex-col mt-5 gap-3">
            <label htmlFor="price">Price:</label>
            <input
            onChange={(e)=>setData({...data, price: e.target.value})} 
            type="text" 
            id="price" 
            name="price"
            className=" border border-gray-300 p-2 rounded-xl " 
            suppressHydrationWarning
             />
          </div>

          <div className="flex flex-col mt-5 gap-3">
            <label htmlFor="quantity">Quantity:</label>
            <input
            onChange={(e)=>setData({...data, quantity: e.target.value})} 
            type="text" 
            id="quantity" 
            name="quantity"
            className=" border border-gray-300 p-2 rounded-xl " 
            suppressHydrationWarning
             />
          </div>

          <button  
          suppressHydrationWarning 
          type="submit" 
          className="w-full p-2 bg-black text-white mt-5 rounded-full">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}
