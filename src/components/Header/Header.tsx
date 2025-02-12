"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export function Header() {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [isLoged, setIsLoged] = useState(false)

    useEffect(() => {
        if (status === "loading") return 
        setIsLoged(!!session) 
    }, [session, status])

    function login() {
        signIn("google")
    }

    function logOut() {
        signOut()
        setIsLoged(false)
        router.replace("/")

    }
    function modalOpen(){
        alert("Voce precisa fazer login😊")
    }

    return (
        <header className="flex flex-col items-center gap-5 justify-between my-3 mx-28 text-white md:flex-row md:items-center">
            <div>
                <Link href="/">
                    <Image src="/1.png" alt="logo" width={150} height={150}/>
                </Link>
            </div>
            <nav>
                <ul className="md:flex md:gap-2 flex flex-wrap gap-2 justify-center items-center">
                   <Link href={ session ? "/perfil" : "#" } onClick={session ? undefined: modalOpen}>
                   <Button>Publicar</Button>
                   </Link>
                    <li className="relative">
                        {
                            isLoged ? (
                                <Button
                                    className="text-white pt-2 pb-2 px-8 bg-primary-400 rounded items-center hover:bg-primary-800 cursor-pointer transition duration-300"
                                    onClick={logOut}>
                                    Sair
                                </Button>
                            ) : (
                                <button
                                    className=" flex w-[200] gap-2 items-center bg-white p-2 rounded transition duration-300 hover:opacity-80 cursor-pointer"
                                    onClick={login}>
                                    <FcGoogle size={20} />
                                    <p className="text-primary-50 text-sm">{status === "loading" ? "caregando...": "Entar com Google"}</p>
                                </button>
                                
                            )
                        }
                        
                    </li>
                    {
                        isLoged && (
                            <li className="text-base hover:text-primary-800 cursor-pointer transition duration-300">
                                {
                                    session?.user?.image ? (
                                        <Link href={ session ? "/perfil" : "#" } onClick={session ? undefined: modalOpen}>
                                        <Image src={`${session?.user?.image}`} width={40} height={40} alt="perfil image" className="rounded-[50%] border-2 border-primary-800"></Image>
                                        </Link>
                                    ):(
                                        <p className="text-primary-50">Bem Vindo, {session?.user?.name}</p>
                                    )
                                }
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}
