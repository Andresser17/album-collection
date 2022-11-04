import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useApi from "hooks/useApi";
// Components
import Albums from "components/Albums";
import Pagination from "components/Pagination";
// Icons
import { BsFillCheckCircleFill as CheckmarkIcon } from "react-icons/bs";
import styles from "./ArtistDetails.module.css";
import imageSample from "images/album-sample.png";

function ArtistDetails() {
  const { id } = useParams();
  const location = useLocation();
  const {
    name: artistName,
    followers,
    popularity,
    image: artistImage,
  } = location.state;
  const [offset, setOffset] = useState(0);
  const [isLoading, albums] = useApi(
    `/artists/${id}/albums?offset=${offset}&limit=4`
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img
          className={styles.image}
          src={artistImage ?? imageSample}
          alt="Album"
        />
        <div className={styles["top-text"]}>
          <p className={styles.certified}>
            <CheckmarkIcon /> Artista certificado
          </p>
          <h2>{artistName}</h2>
          <p className={styles.subtitle}>Seguidores: {followers}</p>
          <p className={styles.subtitle}>Popularidad: {popularity}%</p>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles["middle-subtitle"]}>
          <p>
            Guarda tus álbumes favoritos de {artistName}
          </p>
        </div>
        <div className={styles.albums}>
        <Albums
          albums={albums ? albums.items : []}
          isLoading={isLoading}
          byArtist
        />
        </div>
      </div>
      <div className={styles["pagination-cont"]}>
        <Pagination
          selected={offset}
          setSelected={setOffset}
          pageCount={albums ? albums.total : 0}
          limit={4}
        />
      </div>
    </div>
  );
}

export default ArtistDetails;
