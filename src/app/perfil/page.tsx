"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";

export default function Perfil() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [editingPost, setEditingPost] = useState(null);
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
    if (!id) return;
    const response = await fetch(`/api/getpostuser/${id}`);
    if (response.ok) {
      const data = await response.json();
      setPosts(data.posts || []);
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

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex === -1) {
      alert("Por favor, selecione uma categoria!");
      return;
    }
    const category = categors.find((cat) => cat.id === activeIndex)?.category;
    if (!title.trim() || !description.trim()) {
      alert("Preencha todos os campos antes de publicar!");
      return;
    }
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      setTitle("");
      setDescription("");
      setActiveIndex(-1);
      getPostUser();
    }
  };

  const deletePost = async (id) => {
    const response = await fetch(`/api/deletepost/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("Post deletado com sucesso!");
      getPostUser();
    }
  };

  const handleEdit = async () => {
    if (!editingPost) return;
    const response = await fetch(`/api/editepost/${editingPost._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      setTitle("");
      setDescription("");
      getPostUser();
      window.location.reload()
    }
  };

  const categors = [
    { id: 1, category: "História" },
    { id: 2, category: "Geografia" },
    { id: 3, category: "Ciência" },
    { id: 4, category: "Pensamento Livre" },
  ];

  return (
    <section className="md:w-1/2 mx-8 md:m-auto mt-[5%]">
      <form className="flex flex-col gap-4 mt-4" onSubmit={handlePost}>
        <Input
          type="text"
          placeholder="Título do seu post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          cols={50}
          rows={3}
          placeholder="Agora brilhe com o seu pensamento..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="md:flex md:gap-4 flex flex-wrap gap-2">
          {categors.map((cat) => (
            <p
              key={cat.id}
              onClick={() => setActiveIndex(cat.id)}
              className={`p-2 rounded cursor-pointer text-sm ${
                activeIndex === cat.id ? "bg-zinc-800 text-white" : "bg-transparent text-black border"
              }`}
            >
              {cat.category}
            </p>
          ))}
        </div>
        <Button type="submit" className="text-white flex gap-2">
          <RiSendPlaneFill size={20} /> Publicar Pensamento
        </Button>
      </form>

      <div className="mt-[5%]">
        {posts.length === 0 ? (
          <p className="text-center">Nenhum post publicado ainda</p>
        ) : (
          posts.slice().reverse().map((post, index) => (
            <Card key={index} className="pb-4 bg-white mb-4 p-4 rounded">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="pt-3 text-sm">{post.description}</p>
              <p className="pt-3 text-sm text-primary-50 font-bold opacity-50">#{post.category}</p>
              <div className="flex justify-end gap-2 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingPost(post);
                        setTitle(post.title);
                        setDescription(post.description);
                      }}
                    >
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-white p-6 rounded-md shadow-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Editar Post</DialogTitle>
                      <DialogDescription className="mt-2 text-sm text-gray-600">
                        Atualize o título e a descrição do seu post abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título do post"
                        className="border rounded p-2"
                      />
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição do post"
                        className="border rounded p-2"
                        rows={5}
                      />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      <Button onClick={handleEdit} className="bg-blue-600 text-white">
                        Salvar Alterações
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deletePost(post._id)}>
                  Deletar
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
