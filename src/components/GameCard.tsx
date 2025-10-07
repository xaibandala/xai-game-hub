import { Game } from "@/types/game";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: Game) => fav.id === game.id));
  }, [game.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav: Game) => fav.id !== game.id);
    } else {
      newFavorites = [...favorites, game];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link to={`/game/${game.id}`}>
        <Card className="game-card group relative overflow-hidden border-border bg-card">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-accent text-accent" : "text-foreground"
                }`}
              />
            </Button>
          </div>

          <CardContent className="p-4">
            <h3 className="mb-2 line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
              {game.name}
            </h3>

            <div className="mb-3 flex flex-wrap gap-2">
              {game.genres?.slice(0, 2).map((genre) => (
                <Badge key={genre.id} variant="secondary" className="text-xs">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{game.rating.toFixed(1)}</span>
              </div>
              {game.released && (
                <span className="text-muted-foreground">
                  {new Date(game.released).getFullYear()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
