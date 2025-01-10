"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PropsData } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Copy } from "lucide-react";

export default function Search({ params }: { params: { id: string } }) {
    const [data, setData] = useState<PropsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = params;

    const handleCopy = (data) => {
        navigator.clipboard.writeText(data.description).then(() => {
            alert("Texto copiado com sucesso!")
        }).catch((error) => {
            console.log("erro ao copiar texto!")
        })
    }

    // Função para buscar os dados da API
    async function getThought() {
        try {
            const response = await fetch(`/api/thought`);
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados da API");
            }
            const data = await response.json();
            const dataDetail = data.find((item: PropsData) => item._id === id);
            if (dataDetail) {
                setData(dataDetail);
            } else {
                setError("Item não encontrado.");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getThought();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-20">Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    if (!data) {
        return <div>Nenhum dado encontrado.</div>;
    }

    return (
        <div className="mt-20 md:w-1/2 w-[90%] m-auto ">
            <Card className="py-2 my-5">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <div className="flex gap-4 items-center">
                            <Image
                                src={data.imageUser || "/default-avatar.png"} // Fallback para imagem de usuário
                                width={30}
                                height={30}
                                alt="User image"
                                className="w-[30px] h-[30px] rounded-full"
                            />
                            <p className="font-thin text-zinc-600 text-sm">{data.nameUser}</p>
                        </div>
                        <Copy className="text-zinc-500 cursor-pointer" onClick={() => handleCopy(data)} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="text-md font-bold">{data.title}</h3>
                    <p className="text-sm">{data.description}</p>
                    <p className="text-orange-400">#{data.category}</p>
                </CardContent>
            </Card>
        </div>
    );
}
