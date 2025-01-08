import GithubProvider from "next-auth/providers/github";
// import Chapter10Provider from "chapter10-provider/index";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { createHash } from "crypto";

const createUserId = (base: string): string => {
    return createHash("sha256").update(base).digest("hex");
};

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        // Chapter10Provider({
        //     clientId: process.env.CUSTOM_CLIENT_ID || "",
        //     clientSecret: process.env.CUSTOM_CLIENT_SECRET || "",
        // }),
    ],

    callbacks: {
        async jwt({ token }: { token: JWT }) {
            if (token?.email && !token.fdlst_private_userId) {
                token.fdlst_private_userId = createUserId(token.email);
            }
            console.log("#### jwt");
            return token;
        },
        async session({ session }: { session: Session }) {
            if (session?.user?.email && !session?.user.fdlst_private_userId) {
                session.user.fdlst_private_userId = createUserId(session?.user?.email);
            }
            console.log("#### session");
            return session;
        },
    },

    debug: true,
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, authOptions);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, authOptions);
}