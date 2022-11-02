import React, { useState } from "react";
// Components
import SearchInput from "./SearchInput";
import Album from "components/Album";
import Pagination from "components/Pagination";
import styles from "./Search.module.css";

function Search() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(20);

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
        <SearchInput />
      </div>
      <div className={styles.albums}>
        <div className={styles["subtitle-cont"]}>
          <p className={styles["albums-subtitle"]}>
            Guarda tus álbumes favoritos de {"{artistName}"}
          </p>
        </div>
        <Album />
        <Album />
        <Album />
        <Album />
      </div>
      <div className={styles["pagination-cont"]}>
        <Pagination
          selected={page}
          setSelected={setPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export default Search;
