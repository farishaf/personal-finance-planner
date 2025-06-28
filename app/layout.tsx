import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "../components/ui/sidebar";
import { cookies } from "next/headers";
import { Inter } from 'next/font/google'; // Import a font from Google Fonts
import { AuthProvider } from "@/context/auth-context";
import { ResizablePanelGroup } from "@/components/ui/resizable";

const inter = Inter({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: "Personal Finance Planner",
  description: "Personal Finance Planner",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={defaultOpen} className={inter.className}>
            <AuthProvider>
              <main style={{ width: "100vw", overflow: "hidden"}}>
               <ResizablePanelGroup direction="horizontal" style={{ height: "100%", width: "100%" }}>
                  {children}
                </ResizablePanelGroup>
              </main>
            </AuthProvider>
        </SidebarProvider>
      </body>
      </html>
  );
}
