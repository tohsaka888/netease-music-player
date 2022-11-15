import { MusicPlayer } from "../source";

export default function Home() {
  return (
    <div style={{ height: "200vh" }}>
      <MusicPlayer
        name={"Beautiful World (Da Capo Version)"}
        artist={"宇多田ヒカル"}
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
