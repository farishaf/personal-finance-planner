import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { OptionsProps } from '@/types';
import { cn } from '@/lib/utils';

interface ComboboxProps {
    placeholder: string;
    Options: OptionsProps[]; 
    value: string;
    setValue: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Combobox = ({ placeholder, Options, value, setValue, open, setOpen}: ComboboxProps) => {
  return (
    <div>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? Options.find((option) => option.value === value)?.label
              : `Select ${placeholder}...`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No {placeholder} found.</CommandEmpty>
              <CommandGroup>
                {Options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox;