import React, { useState } from "react";
import { usePlayerProps } from "./controller/PropsController";
import {
  ModeIcon,
  PlaylistIcon,
  VolumeBarBg,
  VolumeIcon,
} from "./index.styled";
import { ModeProps } from "./type";
import { motion } from "framer-motion";
import {
  useDispatchVolumeVisible,
  useVolumeVisible,
} from "./controller/VolumeVisivbleController";

function AddonPanel() {
  const [mode, setMode] = useState<ModeProps>("list-cycle");
  const { onModeChange, playlistLength } = usePlayerProps();
  const volumeVisible = useVolumeVisible();
  const dispatchVolumeVisible = useDispatchVolumeVisible();

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* volume control */}
      <motion.div
        initial={{
          height: "0px",
          width: "32px",
          position: "absolute",
          bottom: "calc(100% + 10px)",
          left: "-5px",
        }}
        animate={{
          height: volumeVisible ? "113px" : "0px",
        }}
      >
        <VolumeBarBg />
      </motion.div>

      <VolumeIcon
        isMuted={false}
        onClick={() => {
          dispatchVolumeVisible(true);
        }}
      />

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
    </div>
  );
}

export default AddonPanel;
