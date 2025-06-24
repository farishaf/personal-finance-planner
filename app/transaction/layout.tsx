import type { Metadata } from "next";
import "../globals.css";
import AuthContextProvider from "@/context/auth-context";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const metadata: Metadata = {
  title: "Personal Finance Planner",
  description: "Transaction",
};

export default async function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <AuthContextProvider>
        <ResizablePanelGroup
          direction="horizontal"
          style={{ height: "100%", width: "100%" }}
        >
          <ResizablePanel defaultSize={100} style={{ height: "100%" }}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
    </AuthContextProvider>
  );
}
