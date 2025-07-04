"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTransaction } from "@/zustand/use-transaction";
import { useEffect } from "react";
import { format } from "date-fns";
import { convertRupiah } from "@/utils/helper";

export function TransactionTable({
  activeTab,
}: {
  activeTab: "income" | "outcome";
}) {
  const { income, outcome, loadingFetchTx, error, dataTxUpdated, fetchTransactions } =
    useTransaction();

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions(
      activeTab === "income" ? "INCOME" : "OUTCOME",
      currentPage,
      itemsPerPage
    );
  }, [dataTxUpdated, activeTab, currentPage, fetchTransactions]);

  const currentData = activeTab === "income" ? income : outcome;
  const { data, pagination } = currentData;

  const totalPages = pagination?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loadingFetchTx) {
    return (
      <div className="flex justify-center py-8">Loading transactions...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.date), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell
                    className={
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {convertRupiah(transaction.amount)}
                  </TableCell>
                  <TableCell>{transaction.placement}</TableCell>
                  <TableCell>
                    <span className="inline-block bg-gray-100 rounded- px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.notes}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="flex justify-end mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage + 1 < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
