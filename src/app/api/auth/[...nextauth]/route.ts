import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../models/user";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
   
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email, name, id } = user; // O ID está disponível aqui
        try {

          const existingEmail = await User.findOne({email})
          if(existingEmail){
            return NextResponse.json("usuario ja existe")
          }
          const res = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, googleID: id }),
          });

          if (res.ok) {
            return true;
          } else {
            console.error("Failed to save user in database:", await res.text());
            return false;
          }
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
