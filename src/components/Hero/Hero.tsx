"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { RiSendPlaneFill} from "react-icons/ri"
import { Button } from "../ui/button"
import { FaSearch } from "react-icons/fa"


export default function Hero() {
    const {data: session, status} = useSession()

    function checkSeccion (){
        alert("Voce precisa fazer login😊")
    }

    return (
        <section className="w-[80%] md:w-[70%] m-auto md:mt-[-150] mt-[-150]">
            <div className="pt-24 text-center relative">
                <h1 className="text-3xl md:text-5xl md:font-bold">COMPARTILHE O <span className="font-light">CONHECIMENTO</span></h1>
                <h1 className="text-5xl font-semibold">PRESERVE A <span className="text-primary-400">MEMÓRIA</span> AFRICANA!</h1>
                <p className="py-2 md:py-4 md:w-1/2 md:m-auto  "> Conecte-se à riqueza da África. Capture, reflita e compartilhe ideias sobre cultura, história e conhecimento africano. Um espaço para guardar e celebrar nossa herança e sabedoria.</p>
                <div className="space-x-4">
                <Link href={session ? "/perfil": "#"} onClick={session ? undefined: checkSeccion}>
                    <Button> <RiSendPlaneFill size={20} color="white" />Publicar</Button>
                </Link>
                <Link href="/searchpage">
                <Button className="text-center bg-primary-400">
                                    <FaSearch className="h-4 w-4 text-white ml-2" />
                                </Button>
                </Link>
                </div>

            </div>
        </section>
    )
}