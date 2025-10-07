import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types/game";
import { Heart } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Game[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    };

    loadFavorites();

    // Listen for storage changes to update when favorites change on other tabs
    window.addEventListener("storage", loadFavorites);
    
    // Custom event for same-tab updates
    const handleFavoritesUpdate = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("storage", loadFavorites);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 fill-accent text-accent" />
            <span className="gradient-text">Your Favorites</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {favorites.length} {favorites.length === 1 ? "game" : "games"} saved
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">
              Start adding games to your favorites to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
