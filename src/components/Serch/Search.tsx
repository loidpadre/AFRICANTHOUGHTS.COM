"use client"
import { useState } from "react"
import {FaSearch} from "react-icons/fa"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
export function Search(){
    const [search, setSearch] = useState("")
    return(
        <div className="mt-8">
            <form className="rounded bg-white p-2 flex items-center gap-4 w-[400px] m-auto">
                <Button className="text-center bg-primary-400">
                    <FaSearch className="h-4 w-4 text-white ml-2" />
                </Button>
                <Input type="text" placeholder="Pesquisar um pensamento" className="w-full border-none focus:outline-none"/>
            </form>
        </div>
    )
}