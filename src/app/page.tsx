"use client"

import { useState, useEffect } from "react"
import { Cards } from "@/components/Cards/Cards"
import Hero from "@/components/Hero/Hero"
import { Search } from "@/components/Serch/Search"



export interface PropsData {
  id: number
  nameUser: string
  imageUser: string
  title: string
  description: string
  category: string 
}

export const BaseURL = "http://localhost:3000/api/"

export default function Home() {
  const [dataInfo, setDataInfo] = useState<PropsData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)


  async function getThought() {
    try {
      const response = await fetch(`${BaseURL}thought`)
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API")
      }
      const data = await response.json()
      setDataInfo(data) 
    } catch (err) {
      setError("Erro ao carregar os dados")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    getThought()
  }, []) 

  if (loading) {
    return <div className="text-center mt-40">Carregando...</div> 
  }

  if (error) {
    return <div>{error}</div> 
  }

  return (
    <div>
      <Hero />
      <Search />
      {dataInfo.length > 0 ? (
        <Cards data={dataInfo} /> 
      ) : (
        <div className="text-center mt-20">Nenhum post ainda!</div> 
      )}
    </div>
  )
}
