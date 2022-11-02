import React, { useState } from "react";
// Components
import Album from "components/Album";
import Pagination from "components/Pagination";
// Icons
import { BsFillCheckCircleFill as CheckmarkIcon } from "react-icons/bs";
import styles from "./ArtistDetails.module.css";
import imageSample from "images/album-sample.png";

function ArtistDetails() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(20);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img className={styles.image} src={imageSample} alt="Album" />
        <div className={styles["top-text"]}>
          <p className={styles.certified}>
            <CheckmarkIcon /> Artista certificado
          </p>
          <h2>{"{artistName}"}</h2>
          <p className={styles.subtitle}>Followers: {"{n}"}</p>
          <p className={styles.subtitle}>Oyentes mensuales: {"{n}"}</p>
        </div>
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

export default ArtistDetails;
