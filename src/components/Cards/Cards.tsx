"use client"
import { useState } from "react"
import { PropsData } from "@/app/page"
import Link from "next/link";
import Image from "next/image";
import {Copy} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface cardProps {
    data: PropsData[];
}
export function Cards({ data }: cardProps) {

    const [cards, setCards] = useState(data);

    return (
        <div className=" w-3/4m-auto mt-20 flex  justify-center gap-4 flex-wrap items-center">
            {cards.map((card, index) => (
                <Link href={`/detail/${card.id}`} key={index} className=" rounded py-7 px-5 w-[33%] h-[60%] hover:bg-opacity-0 transition duration-300 cursor-pointer">
                    <Card  className="space-y-[-100] px-6 py-2">
                        <CardHeader>
                        <div className="flex  justify-between">
                            <div className="flex gap-4 items-center mb-3">
                            <Image src={card.imageUser} width={30} height={30} alt="perfil image user" className="rounded-[50%]"></Image>
                            <h3 className="font-bold">{card.nameUser}</h3>
                            </div>
                            <Copy className="text-zinc-500"/>
                        </div>
                        <CardTitle className="font-semibold">
                        <h2 className=" font-medium py-2 pt-1 pb-[-5px]">{card.title}</h2>
                        </CardTitle>
                        </CardHeader>
                        <CardDescription className="px-6">
                        <p className="text-gray-500 ">{card.description}</p>
                        </CardDescription>
                        
                        <CardFooter>
                        <p className="pt-4 text-primary-400 font-bold opacity-40">
                            #{card.category}
                        </p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    )
}