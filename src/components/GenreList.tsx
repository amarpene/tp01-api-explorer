interface GenreListProps {
  genres: string[];
}

function GenreList({ genres }: GenreListProps) {
  if (genres.length === 0) {
    return <p>Aucun genre disponible</p>;
  }

  return (
    <div>
      <h3>Genres</h3>

      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default GenreList;
