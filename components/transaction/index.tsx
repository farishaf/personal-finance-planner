import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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

export function TransactionTable() {
  const [activeTab, setActiveTab] = React.useState("income");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const data = activeTab === "income" ? incomeData : outcomeData;

  // Dummy pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
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
        
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

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
            {paginatedData.map((transaction) => (
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
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}