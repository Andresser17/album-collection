import React from "react";
import imageSample from "images/album-sample.png";
// Icons
import styles from "./Album.module.css";

function Album() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSample} alt="Album" />
      <p className={styles.title}>{"{albumName}"}</p>
      <p className={styles.subtitle}>Publicado: {"{publishedDate}"}</p>
      <button className={styles.button}>+ Add album</button>
    </div>
  );
}

export default Album;
