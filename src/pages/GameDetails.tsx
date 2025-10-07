import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "@/lib/api";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Star, Calendar, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Game } from "@/types/game";

const GameDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGameDetails(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (game) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.some((fav: Game) => fav.id === game.id));
    }
  }, [game]);

  const toggleFavorite = () => {
    if (!game) return;

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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container py-8">
          <div className="space-y-4">
            <div className="h-96 skeleton-card rounded-lg" />
            <div className="h-12 skeleton-card w-3/4 rounded-lg" />
            <div className="h-32 skeleton-card rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container py-8">
          <p className="text-center text-muted-foreground">Game not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>

        <div className="space-y-6">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold neon-glow">{game.name}</h1>
              <div className="flex flex-wrap gap-2">
                {game.genres?.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              variant={isFavorite ? "default" : "outline"}
              onClick={toggleFavorite}
              className="w-full md:w-auto"
            >
              <Heart
                className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <Star className="h-8 w-8 fill-primary text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{game.rating.toFixed(1)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <Calendar className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Release Date</p>
                  <p className="text-2xl font-bold">
                    {game.released
                      ? new Date(game.released).toLocaleDateString()
                      : "TBA"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {game.metacritic && (
              <Card className="border-border bg-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <Gamepad2 className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Metacritic</p>
                    <p className="text-2xl font-bold">{game.metacritic}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {game.description_raw && (
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-bold">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {game.description_raw}
                </p>
              </CardContent>
            </Card>
          )}

          {game.platforms && game.platforms.length > 0 && (
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-bold">Platforms</h2>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p) => (
                    <Badge key={p.platform.id} variant="outline">
                      {p.platform.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {game.short_screenshots && game.short_screenshots.length > 1 && (
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {game.short_screenshots.slice(1).map((screenshot) => (
                    <img
                      key={screenshot.id}
                      src={screenshot.image}
                      alt="Game screenshot"
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GameDetails;
