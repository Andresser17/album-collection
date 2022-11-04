import React from "react";
import imageSample from "images/album-sample.png";
// Icons
import styles from "./Album.module.css";

interface AlbumProps {
  id: string;
  image: string;
  name: string;
  published: string;
  addedByUser: boolean;
  toggleAlbum: any;
}

function Album({
  id,
  image,
  name,
  published,
  addedByUser,
  toggleAlbum,
}: AlbumProps) {
  return (
    <div className={styles.container}>
      <div className={styles["image-cont"]}>
        <img
          className={styles.image}
          src={image.length > 0 ? image : imageSample}
          alt="Album"
        />
      </div>
      <p className={styles.title}>{name}</p>
      <p className={styles.subtitle}>
        Publicado: {new Date(published).toDateString()}
      </p>
      <button
        onClick={() => {
          toggleAlbum(id, addedByUser);
        }}
        className={`${styles.button} ${addedByUser ? "danger" : ""}`}
      >
        {!addedByUser ? "+ Add album" : "- Remove album"}
      </button>
    </div>
  );
}

export default Album;
