import type { Show } from "../types/tvmaze";
import GenreList from "./GenreList";
import ShowEpisodes from "./ShowEpisodes";


interface ResourceCardProps {
  show: Show;
}

function ResourceCard({ show }: ResourceCardProps) {
  return (
    <article>
      <h2>{show.name}</h2>

      {show.image?.medium && (
        <img
          src={show.image.medium}
          alt={`Affiche de ${show.name}`}
          width="300"
        />
      )}

      <div>
        <p>
          <strong>ID :</strong> {show.id}
        </p>

        <p>
          <strong>Type :</strong> {show.type}
        </p>

        <p>
          <strong>Langue :</strong>{" "}
          {show.language ?? "Non renseignée"}
        </p>

        <p>
          <strong>Statut :</strong> {show.status}
        </p>

        <p>
          <strong>Durée :</strong>{" "}
          {show.runtime !== null
            ? `${show.runtime} minutes`
            : "Non renseignée"}
        </p>

        <p>
          <strong>Durée moyenne :</strong>{" "}
          {show.averageRuntime !== null
            ? `${show.averageRuntime} minutes`
            : "Non renseignée"}
        </p>

        <p>
          <strong>Première diffusion :</strong>{" "}
          {show.premiered ?? "Non renseignée"}
        </p>

        <p>
          <strong>Dernière diffusion :</strong>{" "}
          {show.ended ?? "Toujours en cours"}
        </p>

        <p>
          <strong>Note :</strong>{" "}
          {show.rating.average ?? "Non disponible"}
        </p>
      </div>

      <GenreList genres={show.genres} />

      {show.officialSite && (
        <p>
          <strong>Site officiel :</strong>{" "}
          <a
            href={show.officialSite}
            target="_blank"
            rel="noreferrer"
          >
            Visiter le site officiel
          </a>
        </p>
      )}

      {show.summary && (
        <section>
          <h3>Résumé</h3>

          <div
            dangerouslySetInnerHTML={{
              __html: show.summary,
            }}
          />
        </section>
      )}
      <ShowEpisodes showId={show.id} />
    </article>
  );
}

export default ResourceCard;