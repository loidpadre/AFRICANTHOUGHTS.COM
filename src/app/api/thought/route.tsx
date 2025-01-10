import { connect } from "@/app/utils/dataBase";
import { NextResponse } from "next/server";
import { Post } from "../models/post";

export async function GET() {
  // Estabelecer a conexão com o banco de dados
  await connect();

  // Buscar os dados no banco
  const thought = await Post.find();

  // Criando a resposta
  const response = NextResponse.json(thought || { message: "Sem Pensamento" });

  // Adicionando cabeçalhos CORS para permitir requisições da Vercel
  response.headers.set('Access-Control-Allow-Origin', 'https://africanthoughts-r7lanzhym-loid-padres-projects.vercel.app');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Se não encontrar nenhum pensamento, retornar com a mensagem
  if (!thought || thought.length === 0) {
    NextResponse.json({ message: "Sem Pensamento" });
    return response;
  }

  // Se encontrar dados, retorna normalmente
  NextResponse.json(thought);
  return response;
}
