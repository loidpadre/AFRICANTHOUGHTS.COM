import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "../../authOptions";


// Handler para NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
