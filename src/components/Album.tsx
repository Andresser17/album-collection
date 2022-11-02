import React, { useState, useEffect } from "react";
import imageSample from "images/album-sample.png";
// Icons
import styles from "./Album.module.css";

function isTouchEnabled() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function Album() {
  const [resolution, setResolution] = useState(0);

  // get document resolution
  useEffect(() => {
    // get current resolution when component is mounted
    if (resolution === 0) setResolution(document.body.clientWidth);

    const getResolution = () => {
      setResolution(document.body.clientWidth);
    };
    window.addEventListener("resize", getResolution);

    return () => {
      window.removeEventListener("resize", getResolution);
    };
  }, [resolution]);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSample} alt="Album" />
      <p className={styles.title}>{"{albumName}"}</p>
      <p className={styles.subtitle}>Publicado: {"{publishedDate}"}</p>
      {isTouchEnabled() && <button className={styles.button}>+ Add album</button>}
    </div>
  );
}

export default Album;
