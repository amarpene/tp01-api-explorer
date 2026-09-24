import type { ShowPreview } from "../types/tvmaze";

interface ShowPreviewCardProps {
  show: ShowPreview;
  onClick: () => void;
}

function ShowPreviewCard({
  show,
  onClick,
}: ShowPreviewCardProps) {
  return (
    <article
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      {show.image?.medium && (
        <img
          src={show.image.medium}
          alt={`Affiche de ${show.name}`}
          width="150"
        />
      )}

      <h3>{show.name}</h3>

      <p>
        <strong>Note :</strong>{" "}
        {show.rating.average ?? "Non disponible"}
      </p>

      <p>
        <strong>Genres :</strong>{" "}
        {show.genres.length > 0
          ? show.genres.join(", ")
          : "Non renseignés"}
      </p>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        Voir le détail
      </button>
    </article>
  );
}

export default ShowPreviewCard;