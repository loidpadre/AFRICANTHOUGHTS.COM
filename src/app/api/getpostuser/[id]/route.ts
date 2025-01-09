import { connect } from "@/app/utils/dataBase";
import { NextResponse } from "next/server";
import { Post } from "../../models/post";
import { User } from "../../models/user";
import { Params } from "next/dist/server/request/params";

export async function GET(req: Request, context: { params: Params }) {
  try {
    // Conectar ao banco de dados
    await connect();

    // Verificar e obter o ID do usuário
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "ID do usuário não fornecido!" }, { status: 400 });
    }

    // Verificar se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado!" }, { status: 404 });
    }

    // Obter os posts do usuário
    const posts = await Post.find({ autor: id });

    // Retornar posts (mesmo que vazio)
    return NextResponse.json({ posts: posts || [] }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json({ message: `Erro interno: ${error.message}` }, { status: 500 });
  }
}
