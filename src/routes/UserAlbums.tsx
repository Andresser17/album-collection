import React, { useState, useEffect } from "react";
import useApi, { useInstance } from "hooks/useApi";
// Components
import Album from "components/Album";
import Pagination from "components/Pagination";
import styles from "./UserAlbums.module.css";

function UserAlbums() {
  const axios = useInstance();
  const [offset, setOffset] = useState(0);
  const [toggleAlbum, setToggleAlbum] = useState<boolean | null>(null);
  const [albumToToggle, setAlbumToToggle] = useState("");
  const [isLoading, albums] = useApi(`/me/albums?offset=${offset}&limit=4`);
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
      const result = albums.items.map((item: any, i: number) => {
        const album = item.album;
        return (
          <Album
            key={album.id}
            id={album.id}
            image={album.images[1].url ?? ""}
            name={album.name}
            published={album.release_date}
            addedByUser={true}
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
        <h2 className={styles.title}>
          Mis albumes <strong>guardados</strong>
        </h2>
        <p className={styles.subtitle}>
          Disfruta de tu música a un solo click y descube que discos has
          guardado dentro de “mis álbumes”
        </p>
      </div>
      <div className={styles.albums}>{mappedAlbums}</div>
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

export default UserAlbums;
