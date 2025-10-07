import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Heart, Home } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold gradient-text">GameHub</h1>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            variant={isActive("/favorites") ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/favorites">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
