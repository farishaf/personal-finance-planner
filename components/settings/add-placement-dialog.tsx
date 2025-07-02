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
import usePlacement from "@/zustand/use-placement";
import { colorMaps } from "@/utils/color";
import CustomSelect from "../custom-select";

export function AddPlacementDialog() {
  const {
    name,
    tag,
    color,
    loadingPlacement,
    // errorPlacement,
    setName,
    setTag,
    setColor,
    createPlacement,
    reset,
  } = usePlacement();

  const colorOptions = colorMaps.map((color) => ({
    value: color,
    label: color,
    color: color,
  }));

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createPlacement();
    console.log("result", result);
    if (result.success) {
        toast("Success", {
        description: "New Placement has been added",
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

  const disabledButton = loadingPlacement || !name || !tag || !color;

  return (
    <Dialog>
        <Toaster />
      <form>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Placement
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Placement</DialogTitle>
            <DialogDescription>
              Add your new account / e-wallete. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="placement-name">Name</Label>
              <Input
                id="placement-name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="placement-tag">Label / Tag</Label>
              <Input
                id="placement-tag"
                name="tag"
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className="flex flex-row w-full gap-3">
              <CustomSelect
                label="Placement Color"
                selectLabel="Select Placement Color"
                value={color}
                setValue={setColor}
                options={colorOptions}
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
