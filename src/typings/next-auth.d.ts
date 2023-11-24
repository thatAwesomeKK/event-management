import { ObjectId } from "mongoose";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

type UserId = ObjectId;

declare module "next-auth" {
  interface Session {
    user: {
      id: ObjectId;
      username: string;
      coins: number;
      pfp: string;
      role: string;
    };
  }

  interface User {
    id: ObjectId;
    username: string;
    coins: number;
    pfp: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    coins: number;
    username: string;
    pfp: string;
    role: string;
  }
}
