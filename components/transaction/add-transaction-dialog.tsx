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
import React, { useEffect } from "react";
import { TransactionRequest, useTransaction } from "@/zustand/use-transaction";
import { format } from "date-fns";
import usePlacement from "@/zustand/use-placement";
import useCategory from "@/zustand/use-category";

const TransactionTypes = [
  { label: "Income", value: "INCOME" },
  { label: "Outcome", value: "OUTCOME" },
];

export function AddTransactionDialog() {
  const { loadingCreateTx, errorCreateTx, addTransaction } = useTransaction();

  const { placementList, getCategoryNamesOnly } = usePlacement();

  const { categoryList, getCategory } = useCategory();

  const [formatedCategoryList, setFormatedCategoryList] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [formatedPlacementList, setFormatedPlacementList] = React.useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (categoryList.length === 0) {
      getCategory(true);
    }
    const tempCategoryList = categoryList.map((item: string) => ({
      value: item,
      label: item,
    }));
    setFormatedCategoryList(tempCategoryList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList]);

  useEffect(() => {
    if (placementList.length === 0) {
      getCategoryNamesOnly();
    }
    const tempPlacementList = placementList.map((item: string) => ({
      value: item,
      label: item,
    }));
    setFormatedPlacementList(tempPlacementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementList]);

  const [date, setDate] = React.useState<Date>(new Date());
  const [transactionRequest, setTransactionRequest] =
    React.useState<TransactionRequest>({
      type: "INCOME",
      date: format(new Date(), "yyyy-MM-dd"),
      name: "",
      amount: 0,
      placement: "",
      category: "",
      notes: "",
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionRequest((prevRequest) => ({
      ...prevRequest,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (
    name: keyof TransactionRequest,
    value: string
  ) => {
    setTransactionRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
    setTransactionRequest((prevRequest) => ({
      ...prevRequest,
      date: format(date, "yyyy-MM-dd"),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("transactionRequest when submited", transactionRequest);
    e.preventDefault();
    try {
      await addTransaction(transactionRequest);
      toast.success("Transaction has been created");
      // Reset form after successful submission
      setTransactionRequest({
        type: "INCOME",
        date: format(new Date(), "yyyy-MM-dd"),
        name: "",
        amount: 0,
        placement: "",
        category: "",
        notes: "",
      });
      setDate(new Date());
    } catch (error: unknown) {
      toast.error(errorCreateTx || "Failed to create transaction");
      console.log("error add transaction", error);
    }
  };

  useEffect(() => {
    console.log("transactionRequest", transactionRequest);
  }, [transactionRequest]);

  const disabledButton =
    loadingCreateTx ||
    !transactionRequest.date ||
    !transactionRequest.name ||
    !transactionRequest.amount ||
    !transactionRequest.placement ||
    !transactionRequest.category;

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
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
              Add a new transaction to your records
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-row w-full gap-3">
              <div className="flex-1">
                <CustomDatePicker
                  label="Date"
                  date={date}
                  setDate={handleDateChange}
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  label="Transaction Type"
                  selectLabel="Select Type"
                  options={TransactionTypes}
                  value={transactionRequest.type}
                  setValue={(value) =>
                    handleSelectChange("type", value as "INCOME" | "OUTCOME")
                  }
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-name">Name</Label>
              <Input
                id="transaction-name"
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-amount">Amount</Label>
              <Input
                id="transaction-amount"
                name="amount"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-row w-full gap-3">
              <div className="flex-1">
                {formatedPlacementList && (
                  <CustomSelect
                    label="Placement"
                    selectLabel="Select Placement"
                    options={formatedPlacementList}
                    value={transactionRequest.placement}
                    setValue={(value) => handleSelectChange("placement", value)}
                  />
                )}
              </div>
              <div className="flex-1">
                {formatedCategoryList && (
                  <CustomSelect
                    label="Category"
                    selectLabel="Select Category"
                    options={formatedCategoryList}
                    value={transactionRequest.category}
                    setValue={(value) => handleSelectChange("category", value)}
                  />
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="transaction-notes">Notes</Label>
              <Input
                id="transaction-notes"
                name="notes"
                placeholder="Optional"
                value={transactionRequest.notes || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={disabledButton}
              onClick={handleSubmit}
            >
              {loadingCreateTx ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
