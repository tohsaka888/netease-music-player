import React, { useState } from "react";
import { usePlayerProps } from "./controller/PropsController";
import { ModeIcon, PlaylistIcon, VolumeIcon } from "./index.styled";
import { ModeProps } from "./type";

function AddonPanel() {
  const [mode, setMode] = useState<ModeProps>("list-cycle");
  const { onModeChange, playlistLength } = usePlayerProps();
  return (
    <>
      <VolumeIcon isMuted={false} />
      <ModeIcon
        mode={mode}
        onClick={() => {
          if (mode === "list-cycle") {
            setMode("single-cycle");
            onModeChange("single-cycle");
          } else if (mode === "single-cycle") {
            setMode("random");
            onModeChange("random");
          } else {
            setMode("list-cycle");
            onModeChange("list-cycle");
          }
        }}
      />
      <PlaylistIcon>{playlistLength}</PlaylistIcon>
    </>
  );
}

export default AddonPanel;
