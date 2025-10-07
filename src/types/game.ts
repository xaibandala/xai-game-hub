export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Genre[];
  platforms: GamePlatform[];
  short_screenshots?: Screenshot[];
  clip?: {
    clip: string;
  };
  description_raw?: string;
  metacritic?: number;
  developers?: Developer[];
  publishers?: Publisher[];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface GamePlatform {
  platform: Platform;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Developer {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
