import React from "react";

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
