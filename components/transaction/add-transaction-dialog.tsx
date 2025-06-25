import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "../date-picker";
import { PlusIcon } from "lucide-react";
import CustomSelect from "../custom-select";
import { toast } from "sonner";
import React from "react";

// dummy
const dummyType = [
  { label: "Income", value: "income" },
  { label: "Outcome", value: "outcome" },
];

const dummyPlacement = [
  { label: "BNI", value: "bni" },
  { label: "BRI", value: "bri" },
  { label: "Stockbit", value: "stockbit" },
  { label: "Cash", value: "cash" },
  { label: "Gopay", value: "gopay" },
];

const dummyIncomeTags = [
  { label: "Salary", value: "salary" },
  { label: "Loan", value: "loan" },
  { label: "Investment", value: "investment" },
  { label: "Transfer", value: "transfer" },
  { label: "Other", value: "other" },
];

// const dummyOutcomeTags = [
//   { label: "Shopping", value: "Shopping" },
//   { label: "Bills", value: "Bills" },
//   { label: "Personal Needs", value: "Personal Needs" },
//   { label: "Food & Beverages", value: "Food & Beverages" },
//   { label: "Other", value: "other" },
// ];

export function AddTransactionDialog() {

    const [date, setDate] = React.useState(new Date());
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-row w-full gap-3">
              <div className="flex-1">
                <CustomDatePicker
                  label="Date"
                  date={date}
                  setDate={(date) => setDate(date)}
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  label="Transaction Type"
                  selectLabel="Select Type"
                  options={dummyType}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-name">Name</Label>
              <Input id="transaction-name" name="name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-amount">Amount</Label>
              <Input id="transaction-amount" name="amount" />
            </div>
            <div className="flex flex-row w-full gap-3">
              <div className="flex-1">
                <CustomSelect
                  label="Placement"
                  selectLabel="Select Placement"
                  options={dummyPlacement}
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  label="Tags"
                  selectLabel="Select Tags"
                  options={dummyIncomeTags}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-notes">Notes</Label>
              <Input id="transaction-notes" name="notes" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() =>
                toast(" Transaction has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
