import React, { useState } from "react";
import { ModeIcon, PlaylistIcon, VolumeIcon } from "./index.styled";
import { ModeProps } from "./type";

function AddonPanel() {
  const [mode, setMode] = useState<ModeProps>("list-cycle");
  return (
    <>
      <VolumeIcon isMuted={false} />
      <ModeIcon
        mode={mode}
        onClick={() => {
          if (mode === "list-cycle") {
            setMode("single-cycle");
          } else if (mode === "single-cycle") {
            setMode("random");
          } else {
            setMode("list-cycle");
          }
        }}
      />
      <PlaylistIcon>123</PlaylistIcon>
    </>
  );
}

export default AddonPanel;
