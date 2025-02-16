import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prismaClientDB } from "./prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters";

const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prismaClientDB) as Adapter,
    // adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET as string,
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
      }),
    ],
    callbacks: {
      signIn: async ({ user, account, profile }: any ) => {
        if (account.provider === "google") {
          if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
            return user
          }
        }
        return false
      },
      redirect: async ({ url, baseUrl }: any) => {
        return baseUrl
      },
      session: async ({ session, user, token } :any) => {
        if (user) {
          session.user.id = user.id
        }
        return session;
      },
      jwt: async ({ token, user, account, profile, isNewUser } : any) => {
        if (account) {
          token.userId =  account.id 
        }
        return token
      },
    },
}

export default authOptions;

/**
Dans NextAuth.js, les callbacks sont des fonctions qui sont appelées pendant le cycle de vie de l'authentification. Ils vous permettent de contrôler et de personnaliser le comportement de NextAuth.js à différents points. Voici l'ordre dans lequel ils sont appelés :

signIn: Ce callback est appelé quand un utilisateur tente de se connecter. Vous pouvez utiliser ce callback pour empêcher la connexion en fonction de divers critères.

redirect: Ce callback est appelé quand NextAuth.js a besoin de rediriger l'utilisateur. Vous pouvez personnaliser les URL de redirection ici.

session: Ce callback est appelé chaque fois qu'une session est accédée. Vous pouvez utiliser ce callback pour ajouter des informations supplémentaires à l'objet de session.

jwt: Ce callback est appelé chaque fois qu'un JSON Web Token est créé ou mis à jour. Vous pouvez utiliser ce callback pour encoder et décoder le JWT.

 */