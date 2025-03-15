import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import GitHubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug: true,
  secret: process.env.AUTH_SECRET ?? "",
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // create the player in the database if it doesn't exist
      let exists = await prisma.player.findUnique({
        where: {
          userId: token.id as string,
        },
      });
      if (!exists) {
        await prisma.player.create({
          data: {
            userId: token.id as string,
          },
        });
      }
      session.user.id = token.id as string;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
