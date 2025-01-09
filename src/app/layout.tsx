"use client"
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";



export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {
  return (
    <SessionProvider session={session}>
      <html lang="pt-br">
      <body className=" w-full h-screen"
      >
        <AspectRatio ratio={16 / 9}>
    <Image src="https://plus.unsplash.com/premium_photo-1675705698856-4e15ed5506d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={1000} height={300}  alt="Image" className=" w-full h-60 object-cover" />
    <Header/>
        {children}
        <Footer/>
</AspectRatio>
      </body>
    </html>
    </SessionProvider>
  );
}

