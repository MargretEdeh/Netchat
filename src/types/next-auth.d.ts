import type { User, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"


import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}


type UserId = string

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
    }
}


declare module 'next-auth'{
    interface session {
        user: User &  {
            id: UserId
        }
    }
}