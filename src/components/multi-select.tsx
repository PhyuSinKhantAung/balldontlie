// // components/ui/multi-select.tsx
// import { useState } from "react";
// import { Check, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// interface Option {
//   label: string;
//   value: number;
// }

// interface MultiSelectProps {
//   options: Option[];
//   onChange: (values: (string | number)[]) => void;
//   placeholder?: string;
//   label?: string;
//   error?: string;
// }

// export function MultiSelect({
//   options,
//   onChange,
//   placeholder = "Select options...",
//   label,
//   error,
// }: MultiSelectProps) {
//   const [open, setOpen] = useState(false);

//   const handleSelect = (val: number) => {
//     if (options.includes(val)) {
//       onChange(options.filter((v) => v !== val));
//     } else {
//       onChange([...options, val]);
//     }
//   };

//   return (
//     <div className="grid gap-1.5">
//       {label && <label className="text-sm font-medium">{label}</label>}
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn("w-full justify-between", {
//               "border-red-500": !!error,
//             })}
//           >
//             {value.length > 0
//               ? options
//                   .filter((opt) => value.includes(opt.value))
//                   .map((opt) => opt.label)
//                   .join(", ")
//               : placeholder}
//             <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0">
//           <Command>
//             <CommandInput placeholder="Search..." />
//             <CommandEmpty>No options found.</CommandEmpty>
//             <CommandGroup>
//               {options.map((option) => (
//                 <CommandItem
//                   key={option.value}
//                   onSelect={() => handleSelect(option.value)}
//                   className="cursor-pointer"
//                 >
//                   <div
//                     className={cn(
//                       "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                       {
//                         "bg-primary text-white": value.includes(option.value),
//                       }
//                     )}
//                   >
//                     {value.includes(option.value) && (
//                       <Check className="h-4 w-4" />
//                     )}
//                   </div>
//                   {option.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </Command>
//         </PopoverContent>
//       </Popover>
//       {error && <p className="text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }
