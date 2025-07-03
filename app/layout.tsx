import type { Metadata } from "next";


import "./globals.css";
import { ThemeProvider } from "./provider";



export const metadata: Metadata = {
  title: "TIMA Integrated Technologies",
  description: "This website contains information about the TIMA integrated technologies ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
