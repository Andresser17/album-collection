import React from "react";
import { Link } from "react-router-dom";
import imageSample from "images/artist-sample.png";
// Icons
import styles from "./Artist.module.css";

interface ArtistProps {
  id: string;
  image: string;
  name: string;
  followers: number;
  popularity: number;
}

function Artist({ id, image, name, followers, popularity }: ArtistProps) {
  return (
    <Link
      to={`/artist/${id}`}
      state={{ name, followers, popularity, image }}
      className={styles.container}
    >
      <div className={styles["image-cont"]}>
        <img
          className={styles.image}
          src={image.length > 0 ? image : imageSample}
          alt="Artist"
        />
      </div>
      <p className={styles.title}>{name}</p>
      <p className={styles.subtitle}>Seguidores: {followers}</p>
    </Link>
  );
}

export default Artist;
