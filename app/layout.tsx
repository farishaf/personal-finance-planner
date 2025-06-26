import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { cookies } from "next/headers";
import { Inter } from 'next/font/google'; // Import a font from Google Fonts
import AuthContextProvider from "@/context/auth-context";
import { AppSidebar } from "@/components/app-sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const inter = Inter({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: "Personal Finance Planner",
  description: "Personal Finance Planner",
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const login = true;

  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={defaultOpen} className={inter.className}>
            <AuthContextProvider>
              <main style={{ width: "100vw", overflow: "hidden"}}>
               <ResizablePanelGroup direction="horizontal" style={{ height: "100%", width: "100%" }}>
                  {login && <AppSidebar />}
                  <ResizablePanel defaultSize={100} style={{ height: "100%" }}>
                    {login && (
                      <>
                        <div className="px-2 py-[10px] flex justify-start">
                          <SidebarTrigger />
                        </div>
                        <div style={{ height: "1px", borderBottom: "1px solid #E0E0E0" }}/>
                      </>
                    )}
                    {children}
                  </ResizablePanel>
                </ResizablePanelGroup>
              </main>
            </AuthContextProvider>
        </SidebarProvider>
      </body>
      </html>
  );
}
