import React, { useState } from "react";
// Components
import Album from "components/Album";
import Pagination from "components/Pagination";
import styles from "./UserAlbums.module.css";

function Search() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(20);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          Mis albumes <strong>guardados</strong>
        </h1>
        <p className={styles.subtitle}>
          Disfruta de tu música a un solo click y descube que discos has
          guardado dentro de “mis álbumes”
        </p>
      </div>
      <div className={styles.albums}>
        <div className={styles["by-artist"]}>
          <div className={styles["by-artist-title"]}>
            <p>Nirvana</p>
          </div>
          <Album />
          <Album />
          <Album />
          <Album />
        </div>
        <div className={styles["by-artist"]}>
          <div className={styles["by-artist-title"]}>
            <p>Metallica</p>
          </div>
          <Album />
          <Album />
          <Album />
          <Album />
        </div>
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
