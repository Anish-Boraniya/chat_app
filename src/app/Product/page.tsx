"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Products() {
  const [data, setData] = useState([
    {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/product");
        console.log("fetch product", response.data);

        setData(response.data);

        console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[50vw] h-[70vh] rounded-xl p-5 bg-white text-black">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-center">Product List</h1>
          <Link className="bg-green-500 p-2 rounded-xl" href="/addProduct">Add Product</Link>
        </div>
        <table className="w-full mt-10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index}>
                <td className="text-center p-2">{product.name}</td>
                <td className="text-center p-2">{product.description}</td>
                <td className="text-center p-2">{product.price}</td>
                <td className="text-center p-2">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
