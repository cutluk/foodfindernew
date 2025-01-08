import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { resolvers } from "graphql/resolvers";
import { typeDefs } from "graphql/schema";
import dbConnect from "middleware/db-connect";

import { NextRequest, NextResponse } from "next/server";

const server = new ApolloServer<BaseContext>({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async () => {
        const token = {}
        return { token };
    },
});

const allowCors = async (req: NextRequest, res: NextResponse, fn: Function) => {
    res.headers.set("Allow", "POST");
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST");
    res.headers.set("Access-Control-Allow-Headers", "*");
    res.headers.set("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 200 });
    }

    return await fn(req, res);
};

const connectDB = async (req: NextRequest, res: NextResponse, fn: Function) => {
    await dbConnect();
    return await fn(req, res);
};

export async function GET(req: NextRequest) {
    const res = new NextResponse();
    return connectDB(req, res, (req: NextRequest, res: NextResponse) => allowCors(req, res, handler));
}

export async function POST(req: NextRequest) {
    const res = new NextResponse();
    return connectDB(req, res, (req: NextRequest, res: NextResponse) => allowCors(req, res, handler));
}