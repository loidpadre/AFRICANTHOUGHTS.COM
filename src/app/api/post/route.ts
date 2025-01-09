import { connect } from "@/app/utils/dataBase";
import { NextRequest } from "next/server";
import { Post } from "../models/post";

export async function POST(req: NextRequest){

    const {nameUser, imageUser, title, description, category, autor} = await  req.json()

    try {
        await connect()
        const newPost = {nameUser, imageUser, title, description, category, autor}
        const response = await Post.create(newPost)
        if(!response){
            return new Response("Erro ao cadastar seu post" + {staus: 500})
        }
        return new Response("post cadastrado com sucesso." + JSON.stringify(response))
    } catch (error) {
        console.error(error);
        return new Response("Erro ao processar o pedido", { status: 500 });
    }
}