import { connect } from "@/app/utils/dataBase";
import { Data } from "@/data";
import { PropsData } from "@/app/page";
import { error } from "console";
import { NextResponse } from "next/server";
import { Post } from "../models/post";

export async function GET() {

    await connect()
  
  const thought = await Post.find();

  if (!thought) {
    return NextResponse.json("Sem Pensamento");
  }
  return NextResponse.json(thought);
}


