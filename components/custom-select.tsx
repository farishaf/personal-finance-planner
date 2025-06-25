import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { OptionsProps } from "@/types";

interface CustomSelectProps {
  label: string;
  selectLabel: string;
  options: OptionsProps[];
}
const CustomSelect = ({ label, selectLabel, options }: CustomSelectProps) => {
  return (
    <div>
      <Select>
        <Label htmlFor="transaction-type">{label}</Label>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={`item-${option.value}`}
                value={option.value}
                className="cursor-pointer hover:bg-accent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
