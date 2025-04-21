'use client'
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Provider from "./provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
} ) {
  const router = useRouter()
 

  return (
    <html lang="en">
      <body>
        <Provider>
        <Navbar />
        {children}
        </Provider>
      </body>
    </html>

  );
}
