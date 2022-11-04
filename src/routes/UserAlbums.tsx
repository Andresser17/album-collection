import React, { useState } from "react";
import useApi from "hooks/useApi";
// Components
import Albums from "components/Albums";
import Pagination from "components/Pagination";
import styles from "./UserAlbums.module.css";

function UserAlbums() {
  const [offset, setOffset] = useState(0);
  const [isLoading, albums] = useApi(`/me/albums?offset=${offset}&limit=8`);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2 className={styles.title}>
          Mis albumes <strong>guardados</strong>
        </h2>
        <p className={styles.subtitle}>
          Disfruta de tu música a un solo click y descube que discos has
          guardado dentro de “mis álbumes”
        </p>
      </div>
      <div className={styles.albums}>
        <Albums albums={albums ? albums.items : []} isLoading={isLoading} />
      </div>
      <div className={styles["pagination-cont"]}>
        <Pagination
          selected={offset}
          setSelected={setOffset}
          pageCount={albums ? albums.total : 0}
          limit={8}
        />
      </div>
    </div>
  );
}

export default UserAlbums;
