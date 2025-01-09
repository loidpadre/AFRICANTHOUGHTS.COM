"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { RiSendPlaneFill} from "react-icons/ri"
import { Button } from "../ui/button"


export default function Hero() {
    const {data: session, status} = useSession()

    function checkSeccion (){
        alert("Voce precisa fazer login😊")
    }

    return (
        <section className="w-[70%]  m-auto">
            <div className="pt-24 text-center relative">
                <h1 className="text-5xl font-bold">COMPARTILHE O <span className="font-light">CONHECIMENTO</span></h1>
                <h1 className="text-5xl font-semibold">PRESERVE A <span className="text-primary-400">MEMÓRIA</span> AFRICANA!</h1>
                <p className="py-4 w-1/2 m-auto"> Conecte-se à riqueza da África. Capture, reflita e compartilhe ideias sobre cultura, história e conhecimento africano. Um espaço para guardar e celebrar nossa herança e sabedoria.</p>
                <Link href={session ? "/perfil": "#"} onClick={session ? undefined: checkSeccion}>
                    <Button> <RiSendPlaneFill size={20} color="white" />Publicar</Button>
                </Link>

            </div>
        </section>
    )
}