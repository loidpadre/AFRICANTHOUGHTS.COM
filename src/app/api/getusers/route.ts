import { connect } from "@/app/utils/dataBase";
import { User } from "../models/user";
import { NextResponse } from "next/server";


export async function GET(req:Request) {
        connect()
        const users = await User.find()
        if(!users){
            return NextResponse.json("Sem usuarios!")
        }
        return NextResponse.json(users)
}