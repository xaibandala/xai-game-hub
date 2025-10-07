import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search games..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-card border-border focus-visible:ring-primary"
      />
    </div>
  );
};
