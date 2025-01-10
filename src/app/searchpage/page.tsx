"use client"
import React, { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Ban, Copy } from "lucide-react"
import { PropsData } from "@/app/page"
import { Button } from "@/components/ui/button" // Certifique-se de que este é o nome correto do componente Button
import { Input } from "@/components/ui/input"  // Certifique-se de que o Input foi importado corretamente
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Search() {
    const [data, setData] = useState<PropsData[]>([])
    const [filteredData, setFilteredData] = useState<PropsData[]>([])
    const [value, setValue] = useState("")

    // Função para buscar os dados da API
    async function getThought() {
        try {
            const response = await fetch(`/api/thought`)
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados da API")
            }
            const data = await response.json()
            setData(data)
        } catch (err) {
            console.log("Erro ao carregar os dados")
            console.error(err)
        }
    }

    const handleCopy = (item) => {
        navigator.clipboard.writeText(item.description).then(() => {
            alert("Texto copiado com sucesso!")
        }).catch((error) => {
            console.log("erro ao copiar texto!")
        })
    }

    // useEffect para buscar os dados assim que o componente for montado
    useEffect(() => {
        getThought()
    }, [])

    // useEffect para filtrar os dados sempre que o valor de pesquisa mudar
    useEffect(() => {
        const response = data.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredData(response)
    }, [value, data])

    return (
        <div className="mt-8">
            <form className="rounded bg-white p-2 flex items-center gap-4 w-[400px] m-auto">
                <FaSearch className="h-4 w-4 text-gray-500 ml-2" />

                <Input
                    type="text"
                    placeholder="Pesquisar um pensamento"
                    className="w-full border-none focus:outline-none"
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>

            {/* Exibindo os dados filtrados */}
            {
                filteredData.length === 0 ? (
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <p className="text-center">Sem poste com esse titulo </p>
                        <Ban></Ban>
                    </div>
                ) : (
                    <div className="mt-4 w-1/2 m-auto">
                        {filteredData.map((item, index) => (
                            <Card key={index} className="py-2 my-5">
                                <CardHeader>
                                    <CardTitle className="flex gap-4 items-center justify-between">
                                        <div className="flex gap-4 items-center">
                                            <Image src={item.imageUser} width={30} height={30} alt="User image" className="w-[100-x] rounded-full" />
                                            <p className="font-thin text-zinc-600 text-sm">{item.nameUser}</p>
                                        </div>
                                        <Copy className="text-zinc-500 cursor-pointer" onClick={() => handleCopy(item)} />
                                    </CardTitle>
                                </CardHeader>
                                <Link href={`/detail/${item._id}`}>
                                    <CardContent className="space-y-4">
                                        <h3 className="text-md font-bold">{item.title}</h3>
                                        <p className="text-sm">{item.description}</p>
                                        <p className="text-orange-400">#{item.category}</p>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
