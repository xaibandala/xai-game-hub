import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/lib/api";
import { Navigation } from "@/components/Navigation";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { GameCard } from "@/components/GameCard";
import { GameSkeleton } from "@/components/GameSkeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedSort, setSelectedSort] = useState("-added");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: [
      "games",
      page,
      debouncedSearch,
      selectedGenre,
      selectedPlatform,
      selectedSort,
    ],
    queryFn: () =>
      fetchGames(
        page,
        debouncedSearch,
        selectedGenre !== "all" ? selectedGenre : undefined,
        selectedPlatform !== "all" ? selectedPlatform : undefined,
        selectedSort
      ),
  });

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-8">
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center space-y-2">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold neon-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Discover Your Next
              <span className="gradient-text"> Adventure</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Browse thousands of games across all platforms
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SearchBar value={search} onChange={setSearch} />
          </motion.div>

          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <FilterBar
              selectedGenre={selectedGenre}
              selectedPlatform={selectedPlatform}
              selectedSort={selectedSort}
              onGenreChange={(value) => {
                setSelectedGenre(value);
                handleFilterChange();
              }}
              onPlatformChange={(value) => {
                setSelectedPlatform(value);
                handleFilterChange();
              }}
              onSortChange={(value) => {
                setSelectedSort(value);
                handleFilterChange();
              }}
            />
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <GameSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data?.results.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <motion.div 
              className="flex justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data?.next}
              >
                Next
              </Button>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
