import type { Metadata } from "next";
import "../globals.css";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Personal Finance Planner - Transactions",
  description: "Transaction Management",
};

export default async function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ height: "100%", width: "100%" }}
    >
      <AppSidebar />
      <ResizablePanel defaultSize={100} style={{ height: "100%" }}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}