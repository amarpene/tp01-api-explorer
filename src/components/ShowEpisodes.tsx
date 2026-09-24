import { useCallback } from "react";
import EpisodeList from "./EpisodeList";
import { getEpisodes } from "../services/tvmazeService";
import { useResource } from "../hooks/useResource";
import type { Episode } from "../types/tvmaze";

interface ShowEpisodesProps {
  showId: number;
}

function ShowEpisodes({ showId }: ShowEpisodesProps) {
  const fetchEpisodes = useCallback(
    (_query: string, signal: AbortSignal) => {
      return getEpisodes(showId, signal);
    },
    [showId]
  );

  const {
    data: episodes,
    loading,
    error,
  } = useResource<Episode[]>(
    String(showId),
    fetchEpisodes
  );

  if (loading) {
    return <p> Chargement des épisodes...</p>;
  }

  if (error) {
    return <p> {error}</p>;
  }

  if (!episodes || episodes.length === 0) {
    return <p>Aucun épisode disponible.</p>;
  }

  return <EpisodeList episodes={episodes} />;
}

export default ShowEpisodes;
