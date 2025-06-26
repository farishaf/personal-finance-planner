import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

import { useState } from "react";

type Placement = {
  id: string;
  name: string;
  status: "active" | "inactive";
  tags: string[];
};

const PlacementSettingsTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([
    {
      id: "1",
      name: "Savings Account",
      status: "active",
      tags: ["bank", "savings"],
    },
    {
      id: "2",
      name: "Stock Investment",
      status: "active",
      tags: ["investment", "stocks"],
    },
    {
      id: "3",
      name: "Real Estate",
      status: "inactive",
      tags: ["property", "long-term"],
    },
    {
      id: "4",
      name: "Crypto Wallet",
      status: "inactive",
      tags: ["crypto", "high-risk"],
    },
  ]);

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(placements.map((placement) => placement.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleBulkStatusChange = (newStatus: "active" | "inactive") => {
    setPlacements((prev) =>
      prev.map((placement) =>
        selectedRows.includes(placement.id)
          ? { ...placement, status: newStatus }
          : placement
      )
    );
    setSelectedRows([]);
  };

  const handleDelete = (id: string) => {
    setPlacements((prev) => prev.filter((placement) => placement.id !== id));
  };

  const allSelected = selectedRows.length === placements.length && placements.length > 0;
//   const someSelected = selectedRows.length > 0 && selectedRows.length < placements.length;
  const selectedPlacements = placements.filter((placement) =>
    selectedRows.includes(placement.id)
  );
  const allSelectedActive = selectedPlacements.every((p) => p.status === "active");
  const allSelectedInactive = selectedPlacements.every((p) => p.status === "inactive");

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Placement Settings</CardTitle>
            <CardDescription>
              Add or edit your money placement
            </CardDescription>
          </div>
          <Button>Add Placement</Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedRows.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedRows.length} selected
            </span>
            {allSelectedInactive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusChange("active")}
              >
                Set Active
              </Button>
            )}
            {allSelectedActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusChange("inactive")}
              >
                Set Inactive
              </Button>
            )}
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placements.map((placement) => (
              <TableRow key={placement.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(placement.id)}
                    onCheckedChange={() => handleRowSelect(placement.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        placement.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="capitalize">{placement.status}</span>
                  </div>
                </TableCell>
                <TableCell>{placement.name}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {placement.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Data</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleBulkStatusChange(
                            placement.status === "active" ? "inactive" : "active"
                          )
                        }
                      >
                        Set {placement.status === "active" ? "Inactive" : "Active"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(placement.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="sm">
                  1
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="sm">
                  2
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementSettingsTable;