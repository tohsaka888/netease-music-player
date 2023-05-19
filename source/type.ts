import React from "react";

export type ModeProps = "single-cycle" | "list-cycle" | "random";

export type MusicProps = {
  name: string | React.ReactNode;
  artist: string | React.ReactNode;
  picUrl: string;
  id: string | number;
  url?: string;
};

export type MusicPlayerProps = {
  autoplay?: boolean;
  onPlayNext: (id: number) => void;
  onPlayPrev: (id: number) => void;
  onPictureInPicture: () => void;
  onCollect: () => void;
  onShare: () => void;
  onModeChange: (mode: ModeProps) => void;
  playlistLength: number;
  playlist?: MusicPlayerProps[];
} & MusicProps;
