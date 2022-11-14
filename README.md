This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

[![CodeFactor](https://www.codefactor.io/repository/github/tohsaka888/react-knowledge-graph/badge?style=flat-square)](https://www.codefactor.io/repository/github/tohsaka888/react-knowledge-graph)
[![GitHub Release Date](https://img.shields.io/github/release-date/tohsaka888/react-knowledge-graph.svg?style=flat-square)](https://github.com/tohsaka888/react-knowledge-graph/releases)
[![npm package](https://img.shields.io/npm/v/react-knowledge-graph.svg?style=flat-square)](https://www.npmjs.org/package/react-knowledge-graph)
[![NPM downloads](http://img.shields.io/npm/dm/react-knowledge-graph.svg?style=flat-square)](https://npmjs.org/package/react-knowledge-graph)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/tohsaka888/react-knowledge-graph/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

https://user-images.githubusercontent.com/58759688/201613972-351dd14b-175b-4bf4-8e3f-b9b108768002.mp4

## install

suggest use `pnpm` to install the package.

```bash
pnpm i netease-music-player
# or
npm i netease-music-player
# or
yarn add netease-music-player
```

## useage

```tsx
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
```

## props

```ts
export type ModeProps = "single-cycle" | "list-cycle" | "random";

export type MusicPlayerProps = {
  name: string | React.ReactNode;
  artist: string | React.ReactNode;
  url: string;
  autoplay?: boolean;
  picUrl: string;
  onPlayNext: () => void;
  onPlayPrev: () => void;
  onPictureInPicture: () => void;
  onCollect: () => void;
  onShare: () => void;
  onModeChange: (mode: ModeProps) => void;
  playlistLength: number;
};
```

## develop

first, clone this repository.

```bash
git clone https://github.com/tohsaka888/netease-music-player.git
```

then, install the packages.

```bash
pnpm i
```

open the develop server

```bash
pnpm dev
```

## license

MIT
