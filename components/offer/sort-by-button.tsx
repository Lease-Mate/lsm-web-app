import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type SortByButtonProps = {
  sortBy: {
    field: "price" | "surfaceArea" | null;
    order: "asc" | "desc";
  };
  onSortChange: (field: "price" | "surfaceArea" | null, order: "asc" | "desc") => void;
};

export function SortByButton({ sortBy, onSortChange }: SortByButtonProps) {
  const toggleDirection = (field: "price" | "surfaceArea") => {
    const newOrder = sortBy.field === field && sortBy.order === "asc" ? "desc" : "asc";
    onSortChange(field, newOrder);
  };

  const getSortLabel = () => {
    if (!sortBy.field) return "Sortowanie";
    const fieldLabel = sortBy.field === "price" ? "Cena" : "Powierzchnia";
    const orderLabel = sortBy.order === "asc" ? "Rosnąco" : "Malejąco";
    return `${fieldLabel} (${orderLabel})`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {getSortLabel()}
          {sortBy.order === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sortuj według:</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => toggleDirection("price")} className="flex items-center justify-between">
          Cena
          {sortBy.field === "price" && (
            <span className="flex items-center">
              {sortBy.order === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <Check size={16} strokeWidth={3} className="text-primary" />
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleDirection("surfaceArea")} className="flex items-center justify-between">
          Powierzchnia
          {sortBy.field === "surfaceArea" && (
            <span className="flex items-center">
              {sortBy.order === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <Check size={16} strokeWidth={3} className="ml-2 text-primary" />
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange(null, "asc")}>
          Brak sortowania
          {!sortBy.field && <Check size={16} strokeWidth={3} className="ml-2 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
