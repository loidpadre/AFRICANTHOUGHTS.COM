import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../api/models/user"; // Atualize para o caminho correto
export const authOptions: AuthOptions = {
  
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }: { user: any; account: any }): Promise<boolean> {
        if (account.provider === "google") {
          const { email, name, id } = user;
          try {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
              console.log("Usuário já existe");
              return true; 
            }
            const Base_url= process.env.NEXTAUTH_URL
  
            const res = await fetch(`${Base_url}/api/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, name, googleID: id }),
            });
  
            return res.ok;
          } catch (error) {
            console.error("Erro durante o login:", error);
            return false;
          }
        }
        return true;
      },
    },
    secret: process.env.SECRET,
  };
  