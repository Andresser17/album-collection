import React, { useState } from "react";
import useApi from "hooks/useApi";
// Components
import SearchInput from "./SearchInput";
import Artist from "./Artist";
import Pagination from "components/Pagination";
import LoadingSpinner from "components/LoadingSpinner";
// Images
import styles from "./Search.module.css";

function Search() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("Nirvana");
  const [isLoading, data] = useApi(
    `/search?q=${search}&type=artist&offset=${offset}&limit=4`
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          Busca tus <strong>artistas</strong>
        </h1>
        <p className={styles.subtitle}>
          Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
          tus álbumes favoritos
        </p>
      </div>
      <div className={styles.middle}>
        <SearchInput defaultSearch={search} getSearch={setSearch} />
      </div>
      <div className={styles.albums}>
        <div className={styles["subtitle-cont"]}>
          <p className={styles["albums-subtitle"]}>
            Mostrando 4 resultados de {data ? data.artists.total : 0}
          </p>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data.artists.items.map((artist: any) => (
            <Artist
              key={artist.id}
              id={artist.id}
              image={artist.images.length > 0 ? artist.images[1].url : ""}
              name={artist.name}
              followers={artist.followers.total}
              popularity={artist.popularity}
            />
          ))
        )}
      </div>
      <div className={styles["pagination-cont"]}>
        <Pagination
          selected={offset}
          setSelected={setOffset}
          pageCount={data ? data.artists.total : 0}
          limit={4}
        />
      </div>
    </div>
  );
}

export default Search;
