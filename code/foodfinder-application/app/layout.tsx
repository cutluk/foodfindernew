
import "styles/globals.css";
import "styles/layout.css";
import { ReactNode } from "react";
import Layout from "components/layout";
import SessionProviderWrapper from "components/SessionProviderWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body>
                <SessionProviderWrapper session={session}>
                    <Layout>
                        {children}
                    </Layout>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}