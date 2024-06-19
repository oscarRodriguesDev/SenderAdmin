import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { AuthProvider } from "./(auth)/auth/AuthContext";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Sender Admin",
  description: "Landing Page Sender",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      
          <AuthProvider>
        <ThemeProvider attribute="class">
            <div>
              {children}
              </div>
        </ThemeProvider>
          </AuthProvider>
       
      </body>
    </html>
  );
}
