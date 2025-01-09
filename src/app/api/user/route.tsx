import { connect } from "@/app/utils/dataBase"
import { User } from "../models/user"
import { NextResponse } from "next/server"
export  async function POST(request:Request){
    const {email, name, googleID} = await request.json()
    await connect()
    const newUser = {email, name, googleID}
    await User.create(newUser)
    return NextResponse.json({message: "Usuario cadastrado com sucesso!", newUser})
}