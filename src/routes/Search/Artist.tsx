import React from "react";
import { Link } from "react-router-dom";
import imageSample from "images/artist-sample.png";
// Icons
import styles from "./Artist.module.css";

function Artist() {
  return (
    <Link to="/artist" className={styles.container}>
      <img className={styles.image} src={imageSample} alt="Album" />
      <p className={styles.title}>{"{ArtistName}"}</p>
      <p className={styles.subtitle}>Seguidores: {"{n}"}</p>
    </Link>
  );
}

export default Artist;
