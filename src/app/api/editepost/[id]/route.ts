import { NextResponse } from "next/server"
import { Post } from "../../models/post"


export async function PATCH(req: Request, {params}:{params: Promise<{id: string}>}){
    const { id } = await params
    const {title, description, category} = await req.json()

    if(!id){
        return NextResponse.json({message: "Precisa enviar o id"})
    }
    const postEdit = await Post.findByIdAndUpdate({_id: id }, {title: title, description: description, category: category })
    if(!postEdit){
        return NextResponse.json("Erro ao editar post")
    }
    return NextResponse.json("Post editado com sucesso!")
}