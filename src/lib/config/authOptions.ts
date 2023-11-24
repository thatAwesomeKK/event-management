import bcrypt from "bcryptjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          //   await connectToMongo();
          const { email, password } = credentials!;

          const dbUser = await db.user.findFirst({
            where: {
              email,
            },
          });

          if (!dbUser) return null;

          if (password) {
            return signInUser(dbUser, password);
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.coins = user.coins;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("From session");
      if (session?.user) {
        session.user.id = token.id;
        session.user.coins = token.coins;
        session.user.username = token.username;
        session.user.role = token.role
        // session.user.pfp = token.pfp;
        // session.user.username = token.username;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
export default authOptions;

const signInUser = async (user: any, password: string) => {
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (passwordCompare) return user;
};
