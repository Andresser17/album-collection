import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useApi, { useInstance } from "hooks/useApi";
// Components
import Album from "components/Album";
import Pagination from "components/Pagination";
// Icons
import { BsFillCheckCircleFill as CheckmarkIcon } from "react-icons/bs";
import styles from "./ArtistDetails.module.css";
import imageSample from "images/album-sample.png";

function ArtistDetails() {
  const { id } = useParams();
  const location = useLocation();
  const axios = useInstance();
  const {
    name: artistName,
    followers,
    popularity,
    image: artistImage,
  } = location.state;
  const [offset, setOffset] = useState(0);
  const [toggleAlbum, setToggleAlbum] = useState<boolean | null>(null);
  const [albumToToggle, setAlbumToToggle] = useState("");
  const [isLoading, albums] = useApi(
    `/artists/${id}/albums?offset=${offset}&limit=4`
  );
  const [mappedAlbums, setMappedAlbums] = useState<Array<any>>([]);

  const handleToggleAlbum = (albumId: string, addedByUser: boolean) => {
    setAlbumToToggle(albumId);
    setToggleAlbum(addedByUser);
  };

  // add or delete album from user's library
  useEffect(() => {
    const req = async () => {
      try {
        if (toggleAlbum) {
          await axios.delete(`/me/albums?ids=${albumToToggle}`);
        } else await axios.put(`/me/albums?ids=${albumToToggle}`);
        const mapped = mappedAlbums.map((album: any) => {
          const props = album.props;
          const added =
            props.id === albumToToggle ? !props.addedByUser : props.addedByUser;

          return (
            <Album
              key={props.id}
              id={props.id}
              image={props.image}
              name={props.name}
              published={props.published}
              addedByUser={added}
              toggleAlbum={handleToggleAlbum}
            />
          );
        });

        setMappedAlbums(mapped);

        setToggleAlbum(null);
      } catch (err) {
        console.log(err);
      }
    };
    if (mappedAlbums.length > 0 && toggleAlbum !== null) req();
  }, [axios, toggleAlbum, albumToToggle, mappedAlbums]);

  // fetch user added albums and mapped it
  useEffect(() => {
    const req = async () => {
      const ids = albums.items.map((album: any) => album.id).join(",");

      const contains = await axios(`/me/albums/contains?ids=${ids}`);

      const result = albums.items.map((album: any, i: number) => {
        const addedByUser = contains.data[i];

        return (
          <Album
            key={album.id}
            id={album.id}
            image={album.images[1].url ?? ""}
            name={album.name}
            published={album.release_date}
            addedByUser={addedByUser}
            toggleAlbum={handleToggleAlbum}
          />
        );
      });

      setMappedAlbums(result);
    };

    if (!isLoading && albums) req();
  }, [isLoading, albums, axios]);

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
      <div className={styles.albums}>
        <div className={styles["subtitle-cont"]}>
          <p className={styles["albums-subtitle"]}>
            Guarda tus álbumes favoritos de {artistName}
          </p>
        </div>
        {mappedAlbums}
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
