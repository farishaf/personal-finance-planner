"use client";

import PageTitle from "@/components/page-title";
import { TransactionTable } from "@/components/transaction";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { AddTransactionDialog } from "@/components/transaction/add-transaction-dialog";
import { Toaster } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

const TransactionPage = () => {
  const [activeTab, setActiveTab] = React.useState("income");

  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("isauthenticated", token);
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <>
      <div className="px-2 py-[10px] flex justify-start">
        <SidebarTrigger />
      </div>
      <div style={{ height: "1px", borderBottom: "1px solid #E0E0E0" }} />
      <div className="flex flex-col p-4 space-y-4">
        {/* toast successfully add new transaction */}
        <Toaster />

        <PageTitle
          title="Transaction"
          subTitle="track and manage your transactions"
        />

        {/* filter & add transaction button */}
        <div className="flex items-center justify-between">
          <Tabs
            defaultValue="income"
            onValueChange={(value) => setActiveTab(value)}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="outcome">Outcome</TabsTrigger>
            </TabsList>
          </Tabs>

          <AddTransactionDialog />
        </div>

        <TransactionTable activeTab={activeTab} />
      </div>
    </>
  );
};

export default TransactionPage;
