import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import Google from "next-auth/providers/google";

function getGoogleCred(){
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length ===0 ){
        throw new Error(" NO  GOOGLE_CLIENT_ID")
    }
    if (!clientSecret || clientSecret.length === 0){
        throw new Error (" NO GOOGLE_CLIENT_SECRET ")
    }
    return {clientId, clientSecret}
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:'/login'
    },
    providers:[
        Google({
            clientId: getGoogleCred().clientId,
            clientSecret:getGoogleCred().clientSecret
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          // Only set token.id if user exists and has an id
          if (user && 'id' in user) {
            token.id = (user as User).id;
          }
    
          // Retrieve user from the database using the token id
          const dbUser = (await db.get(`user:${token.id}`)) as User | null;
    
          if (dbUser) {
            return {
              id: dbUser.id,
              name: dbUser.name,
              email: dbUser.email,
              picture: dbUser.image,
            };
          }
    
          return token;
        },
        async session({session, token }){
            if (token){
                session.user.id = token.id
                session.user.name= token.name
                session.user.email = token.email
                session.user.image=token.picture
            }
            return session
        },
        redirect() {
            return '/dashboard'
        }
    }
}