"use client"

import PageTitle from '@/components/page-title';
import React from 'react'

const TransactionPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
          <PageTitle
            title="Transaction"
            subTitle="track and manage your transactions"
          />
    </div>
  )
}

export default TransactionPage;