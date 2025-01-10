"use client"
import React, { useState } from "react"
import { PropsData } from "@/app/page"
import Link from "next/link";
import Image from "next/image";
import { Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { error } from "console";

interface cardProps {
    data: PropsData[];
}
export function Cards({ data }: cardProps) {

    const [cards, setCards] = useState(data);

    const handleCopy = (card) => {
        navigator.clipboard.writeText(card.description).then(() => {
            alert("Texto copiado com sucesso!")
        }).catch((error) => {
            console.log("erro ao copiar texto!")
        })
    }

    return (
        <div className=" w-3/4m-auto mt-20 flex  justify-center gap-4 flex-wrap items-center">
            {cards.slice().reverse().map((card, index) => (
                <Card className="space-y-[-100] px-6 py-2 rounded w-[33%] h-[60%]">
                    <CardHeader>
                        <div className="flex  justify-between">
                            <div className="flex gap-4 items-center mb-3">
                                <Image src={card.imageUser} width={30} height={30} alt="perfil image user" className="rounded-[50%]"></Image>
                                <h3 className="font-bold">{card.nameUser}</h3>
                            </div>
                            <Copy className="text-zinc-500 cursor-pointer" onClick={() => handleCopy(card)} />
                        </div>


                    </CardHeader>
                    <Link href={`/detail/${card._id}`} key={index} className="">
                        <CardTitle className="font-semibold">
                            <h2 className=" font-medium py-2 px-6 pt-1 pb-[-5px]">{card.title}</h2>
                        </CardTitle>
                        <CardDescription className="px-6">
                            <p className="text-gray-500">{card.description.slice(0, 300)}...</p>
                        </CardDescription>

                        <CardFooter>
                            <p className="pt-4 text-primary-400 font-bold opacity-40">
                                #{card.category}
                            </p>
                        </CardFooter>
                    </Link>
                </Card>

            ))
            }
        </div >
    )
}