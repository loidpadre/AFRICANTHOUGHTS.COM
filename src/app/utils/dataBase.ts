import mongoose from "mongoose"

export const connect  = async () =>{
    try {
        const mongoURL = process.env.MONGODB_URI

        if (!mongoURL) {
            throw new Error("MONGODB_URI não está definida no arquivo .env");
          }
            await mongoose.connect(mongoURL);
              console.log("Conneção bem sucedida!")
        
    } catch (error) {
        console.log("Erro ao se connectar ao mnongo DB: " + error)
        process.exit(1) 
    }

}
