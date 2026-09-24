import { useState } from "react";
import ResourceCard from "./components/ResourceCard";
import ShowPreviewCard from "./components/ShowPreviewCard";
import { searchShows } from "./services/tvmazeService";
import { useResource } from "./hooks/useResource";
import type { Show } from "./types/tvmaze";

function App() {
  const [search, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedShow, setSelectedShow] = useState<Show | null>(
    null
  );

  const fetchShows = (
    query: string,
    signal: AbortSignal
  ) => {
    return searchShows(query, signal);
  };

  const {
    data: results,
    loading,
    error,
  } = useResource<Show[]>(submittedQuery, fetchShows);

  const handleSearch = () => {
    if (!search.trim()) {
      setSubmittedQuery("");
      setSelectedShow(null);
      return;
    }

    setSelectedShow(null);
    setSubmittedQuery(search.trim());
  };

  const handleShowClick = (show: Show) => {
    setSelectedShow(show);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  return (
    <main>
      <h1>TVmaze Explorer</h1>

      {!selectedShow && (
        <>
          <div>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Nom d'une série"
            />

            <button onClick={handleSearch}>
              Rechercher
            </button>
          </div>

          {loading && <p> Chargement...</p>}

          {error && <p> {error}</p>}

          {!loading && !error && results && results.length === 0 && (
            <p>Aucune série trouvée.</p>
          )}

          {!loading && !error && results && results.length > 0 && (
            <section>
              <h2>Résultats de recherche</h2>

              {results.map((show) => (
                <ShowPreviewCard
                  key={show.id}
                  show={show}
                  onClick={() => handleShowClick(show)}
                />
              ))}
            </section>
          )}
        </>
      )}

      {selectedShow && (
        <section>
          <button onClick={handleBack}>
            ← Retour aux résultats
          </button>

          <h2>Détail de la série</h2>

          <ResourceCard show={selectedShow} />
        </section>
      )}
    </main>
  );
}

export default App;
