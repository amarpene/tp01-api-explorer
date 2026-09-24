import type { Episode } from "../types/tvmaze";

interface EpisodeListProps {
  episodes: Episode[];
}

function EpisodeList({ episodes }: EpisodeListProps) {
  const seasons = Array.from(
    new Set(episodes.map((episode) => episode.season))
  );

  return (
    <section>
      <h3>Épisodes</h3>

      {seasons.map((season) => (
        <section key={season}>
          <h4>Saison {season}</h4>

          <ul>
            {episodes
              .filter((episode) => episode.season === season)
              .map((episode) => (
                <li key={episode.id}>
                  <strong>
                    Épisode {episode.number ?? "?"} :{" "}
                    {episode.name}
                  </strong>

                  {episode.airdate && (
                    <span>
                      {" "}
                      — {episode.airdate}
                    </span>
                  )}

                  {episode.runtime !== null && (
                    <span>
                      {" "}
                      — {episode.runtime} min
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

export default EpisodeList;
