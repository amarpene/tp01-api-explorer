export interface Show {
  id: number;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  rating: {
    average: number | null;
  };
  image: {
    medium: string | null;
  } | null;
  summary: string | null;
}

export type ShowPreview = Pick<
  Show,
  "id" | "name" | "genres" | "image" | "rating"
>;

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number | null;
  airdate: string | null;
  runtime: number | null;
  summary: string | null;
  image: {
    medium: string | null;
  } | null;
}
