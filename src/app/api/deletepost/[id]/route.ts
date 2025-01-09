import { NextResponse } from "next/server";
import { User } from "../../models/user";
import { Post } from "../../models/post";



export async function DELETE(req: Request, context :{params: {id: string}}){
    const { id } =  context.params;

    if(!id){
        return NextResponse.json("Id do post não fornecido!")
    }
    const postDeleted = await Post.findOneAndDelete({_id: id})
    if(!postDeleted){
        return NextResponse.json("Poste nao encontrado!")
    }
    return NextResponse.json({message: "Post deletado com sucesso!"})

}