import React, { useState } from "react";
import useApi from "hooks/useApi";
// Components
import SearchInput from "./SearchInput";
import Artist from "./Artist";
import Pagination from "components/Pagination";
import styles from "./Search.module.css";

function Search() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("Nirvana");
  const [isLoading, data, error] = useApi(
    `/search?q=${search}&type=artist&offset=${offset}&limit=4`
  );

  // console.log({ isLoading, data, error });

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.currentTarget.value);
  // };

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
        {data && data.artists.items.length > 0
          ? data.artists.items.map((artist: any) => (
              <Artist
                key={artist.id}
                id={artist.id}
                image={artist.images[1].url ?? ""}
                name={artist.name}
                followers={artist.followers.total}
                popularity={artist.popularity}
              />
            ))
          : "No results"}
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
