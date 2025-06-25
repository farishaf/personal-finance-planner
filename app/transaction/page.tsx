"use client"

import PageTitle from '@/components/page-title';
import { TransactionTable } from '@/components/transaction';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react'
import { AddTransactionDialog } from '@/components/transaction/add-transaction-dialog';
import { Toaster } from 'sonner';

const TransactionPage = () => {
    const [activeTab, setActiveTab] = React.useState("income");

  return (
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

      <TransactionTable activeTab={activeTab}/>
    </div>
  )
}

export default TransactionPage;