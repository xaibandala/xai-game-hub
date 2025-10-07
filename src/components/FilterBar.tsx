import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FilterBarProps {
  selectedGenre: string;
  selectedPlatform: string;
  selectedSort: string;
  onGenreChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const FilterBar = ({
  selectedGenre,
  selectedPlatform,
  selectedSort,
  onGenreChange,
  onPlatformChange,
  onSortChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="4">Action</SelectItem>
          <SelectItem value="51">Indie</SelectItem>
          <SelectItem value="3">Adventure</SelectItem>
          <SelectItem value="5">RPG</SelectItem>
          <SelectItem value="10">Strategy</SelectItem>
          <SelectItem value="2">Shooter</SelectItem>
          <SelectItem value="7">Puzzle</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedPlatform} onValueChange={onPlatformChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          <SelectItem value="4">PC</SelectItem>
          <SelectItem value="187">PlayStation 5</SelectItem>
          <SelectItem value="1">Xbox One</SelectItem>
          <SelectItem value="7">Nintendo Switch</SelectItem>
          <SelectItem value="186">Xbox Series X/S</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-added">Recently Added</SelectItem>
          <SelectItem value="-rating">Highest Rated</SelectItem>
          <SelectItem value="-released">Release Date</SelectItem>
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="-metacritic">Metacritic Score</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
