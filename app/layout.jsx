import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
    title: "UI challenges",
    description: "A collection of UI challenges",
};

export default function RootLayout({ children }) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className={rubik.className}>
                    {/* <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                    </ThemeProvider> */}
                        {children}

                </body>
            </html>
        </>
    )
}
