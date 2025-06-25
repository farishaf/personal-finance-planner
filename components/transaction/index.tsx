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
} from "@/components/ui/pagination"

// Dummy data
const incomeData = [
  {
    id: 1,
    date: "2023-05-15",
    name: "Salary",
    amount: 10000000,
    placement: "BNI",
    tags: ["Salary"],
    notes: "Monthly salary",
  },
  {
    id: 2,
    date: "2023-05-10",
    name: "Freelance Work",
    amount: 3500000,
    placement: "BRI",
    tags: ["Freelance"],
    notes: "Website project",
  },
];

const outcomeData = [
  {
    id: 1,
    date: "2023-05-12",
    name: "Groceries",
    amount: -750000,
    placement: "Cash",
    tags: ["Food"],
    notes: "Weekly groceries",
  },
  {
    id: 2,
    date: "2023-05-08",
    name: "Electricity Bill",
    amount: -500000,
    placement: "BCA",
    tags: ["Utilities"],
    notes: "May electricity",
  },
];

export function TransactionTable({ activeTab }: { activeTab: string }) {
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const itemsPerPage = 5;

  const data = activeTab === "income" ? incomeData : outcomeData;

  // Dummy pagination logic
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const paginatedData = data.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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
              <TableHead>Tags</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell
                  className={
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {transaction.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>{transaction.placement}</TableCell>
                <TableCell>
                  {transaction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{transaction.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
  );
}