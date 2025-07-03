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
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import React, { useRef } from "react";
import useCategory from "@/zustand/use-category";

export function AddCategoryDialog() {
  const {
    name,
    loadingCategory,
    setName,
    setIcon,
    reset,
    createCategory,
  } = useCategory();

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createCategory();
    console.log("result", result);
    if (result.success) {
        toast("Success", {
        description: "New Transaction Category has been added",
        duration: 3000,
        onDismiss: () => {
            reset();
        }
      });
      closeRef.current?.click();
    }
    if (result.error) {
      toast.error(result.error, {
        duration: 3000,
      });
    }
  };

  const disabledButton = loadingCategory || !name;

  return (
    <Dialog>
        <Toaster />
      <form>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Add new transaction category to your profile. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="category-name">Name</Label>
              <Input
                id="category-name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category-tag">Icon (soon)</Label>
              <Input
                disabled
                id="category-tag"
                name="tag"
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {/* utk auto close */}
            <DialogClose asChild>
              <button ref={closeRef} className="hidden" />
            </DialogClose>
            <Button
              type="submit"
              disabled={disabledButton}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
