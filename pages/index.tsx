import usePlaylistTracks from "@services/usePlaylistTracks";
import { MusicPlayer, MusicProps } from "../source";
import { useMemo, useState } from "react";

export default function Home() {
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 10 });
  
  const { data } = usePlaylistTracks({ ...pagination, id: 967418382 });

  const songs: MusicProps[] = useMemo(() => {
    return data?.songs.map((song: any) => ({
      ...song,
      artist: song.ar.map((ar: any) => ar.name).join(","),
    })) || [];
  }, [data]);

  const onPlayNext = async () => {

  }

  return (
    <div style={{ height: "200vh" }}>
      {songs.map((song: any) => (
        <div key={song.id} style={{ display: "flex" }}>
          <div>{song.name + "--"}</div>
          <div>{song.id}</div>
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <button
          disabled={pagination.page === 1}
          onClick={() => {
            setPagination({ ...pagination, page: pagination.page - 1 });
          }}
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            setPagination({ ...pagination, page: pagination.page + 1 });
          }}
        >
          Next Page
        </button>
      </div>
      <MusicPlayer
        name={"Beautiful World (Da Capo Version)"}
        artist={"宇多田ヒカル"}
        id={songs.length ? songs[0].id : 0}
        url={"https://music.163.com/song/media/outer/url?id=1824020873.mp3"}
        picUrl={
          "https://p2.music.126.net/l3G4LigZnOxFE9lB4bz_LQ==/109951165791860501.jpg?param=34y34"
        }
        onCollect={() => {
          console.log("collected");
        }}
        onModeChange={(mode) => {
          console.log(mode);
        }}
        onPictureInPicture={() => {
          console.log("pip");
        }}
        onPlayNext={() => {
          console.log("play next");
        }}
        onPlayPrev={() => {
          console.log("play prev");
        }}
        onShare={() => {
          console.log("share");
        }}
        playlistLength={10}
      />
    </div>
  );
}
