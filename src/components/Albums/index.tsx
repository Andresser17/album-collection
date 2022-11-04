import React, { useState, useEffect } from "react";
import { useInstance } from "hooks/useApi";
// Components
import Album from "./Album";

interface AlbumsProps {
  albums: Array<any>;
  isLoading: boolean;
  byArtist?: boolean;
}

function Albums({ albums, isLoading, byArtist }: AlbumsProps) {
  const axios = useInstance();
  const [toggleAlbum, setToggleAlbum] = useState<boolean | null>(null);
  const [albumToToggle, setAlbumToToggle] = useState("");
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

  // check if albums where added by user and mapped it
  useEffect(() => {
    const req = async () => {
      let contains: { data: Array<any> } = { data: [] };

      if (byArtist) {
        const ids = albums.map((album: any) => album.id).join(",");
        contains = await axios(`/me/albums/contains?ids=${ids}`);
      }

      const result = albums.map((item: any, i: number) => {
        const album = item.album ? item.album : item;
        const addedByUser = contains.data.length > 0 ? contains.data[i] : true;

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
  }, [isLoading, albums, axios, byArtist]);

  return <>{mappedAlbums}</>;
}

export default Albums;
