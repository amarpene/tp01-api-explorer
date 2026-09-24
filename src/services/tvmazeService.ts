import type { Episode, Show } from "../types/tvmaze";

export async function searchShow(
  search: string,
  signal?: AbortSignal
): Promise<Show> {
  const response = await fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(search)}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Série introuvable ou erreur serveur : ${response.status} ${response.statusText}`
    );
  }

  const data: Show = await response.json();

  return data;
}

export async function searchShows(
  search: string,
  signal?: AbortSignal
): Promise<Show[]> {
  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la recherche : ${response.status} ${response.statusText}`
    );
  }

  const data: Array<{ score: number; show: Show }> =
    await response.json();

  return data.map((result) => result.show);
}

export async function getEpisodes(
  showId: number,
  signal?: AbortSignal
): Promise<Episode[]> {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`,
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les épisodes : ${response.status} ${response.statusText}`
    );
  }

  const data: Episode[] = await response.json();

  return data;
}
