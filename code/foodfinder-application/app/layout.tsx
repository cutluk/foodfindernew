import "styles/globals.css";
import "styles/layout.css";
import { ReactNode } from "react";
import Layout from "components/layout";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}