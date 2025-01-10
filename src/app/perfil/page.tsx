"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function Perfil() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const router = useRouter();

  const getUsers = async () => {
    const response = await fetch("/api/getusers");
    if (!response.ok) {
      console.error("Erro ao buscar usuário!");
      return;
    }
    const users = await response.json();
    const specificUser = users.find((user) => user.email === session?.user?.email);
    if (specificUser) {
      setId(specificUser._id);
    }
  };

  const getPostUser = async () => {
    if (!id) {
      console.error("ID do usuário não fornecido!");
      return;
    }
  
    try {
      const response = await fetch(`/api/getpostuser/${id}`);
  
      if (!response.ok) {
        console.error("Erro ao buscar post do usuário! Status:", response.status);
        return;
      }
  
      const data = await response.json();
  
      // Define os posts ou mantém vazio
      setPosts(data.posts || []);
      if (!data.posts || data.posts.length === 0) {
        console.log("Nenhum post encontrado para este usuário.");
      }
    } catch (error) {
      console.error("Erro ao buscar posts do usuário:", error);
    }
  };
  
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    getUsers();
  }, [session]);

  useEffect(() => {
    if (id) {
      getPostUser();
    }
  }, [id]);

  const [categors, setCategors] = useState([
    { id: 1, category: "História" },
    { id: 2, category: "Geografia" },
    { id: 3, category: "Ciência" },
    { id: 4, category: "Pensamento Livre" },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex === -1) {
      console.error("Categoria não selecionada!");
      return;
    }
    const category = categors.find((cat) => cat.id === activeIndex)?.category;

    try {
      const newPost = {
        nameUser: session?.user?.name,
        imageUser: session?.user?.image,
        title,
        description,
        category,
        autor: id,
      };
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        console.error("Erro ao cadastrar post!");
        return;
      }
      console.log("Post cadastrado com sucesso!");
      setTitle("");
      setDescription("");
      setActiveIndex(-1);
      getPostUser(); // Atualiza a lista de posts
    } catch (error) {
      console.error("Erro ao cadastrar post:", error);
    }
  };



  const deletePost = async (id) =>{
    const response = await fetch(`/api/deletepost/${id}`,{
      method: "DELETE",
    })
    if(!response){
     return console.log("Erro ao deletar post")
    }
    alert("Poste deletado com sucesso 🤗!")
    window.location.reload()

  }



  const activateCategory = (index: number) => {
    setActiveIndex(index);
  };

  if (status === "loading") {
    return <div className="text-center align-middle">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <section className="w-1/2 m-auto mt-[5%]">
      
      <form className="flex flex-col gap-4 mt-4" onSubmit={handlePost}>
        <Input
        
          type="text"
          placeholder="Titulo do seu post"
          className="p-2 rounded "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          cols={50}
          rows={3}
          className="rounded p-4"
          placeholder="Agora brilhe com o seu pensamento..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4">
          {categors.map((cat) => (
            <div key={cat.id}>
              <p
                onClick={() => activateCategory(cat.id)}
                className={`p-2 rounded cursor-pointer text-sm ${
                  activeIndex === cat.id
                    ? "bg-zinc-800 text-white"
                    : "bg-transparent text-black border"
                }`}
              >
                {cat.category}
              </p>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className=" text-white p-2 flex justify-center items-center gap-2"
        >
          <RiSendPlaneFill size={20} color="white" />
          Publicar Pensamento
        </Button>
      </form>
      <div className="mt-[5%]">
        {posts.length === 0 ? (
          <p className="text-center">Nenhum post publicado ainda</p>
        ) : (
          <div>
            {posts.map((post, index) => (
              <Card key={index} className="pb-4 bg-white mb-4 p-4 rounded">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="pt-3 text-sm">{post.description}</p>
                <p className="pt-3 text-sm text-primary-50 font-bold opacity-50">#{post.category}</p>
                <div className="flex justify-end gap-2 items-center">
                  <Button  className=" p-2  text-white">Editar</Button>
                  <Button variant={"destructive"} className=" p-2  text-white" onClick={() =>{deletePost(post._id)}}>Deletar</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
