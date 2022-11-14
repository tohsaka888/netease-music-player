import React, { startTransition, useCallback, useRef, useState } from "react";
import { usePlayerProps } from "./controller/PropsController";
import {
  ModeIcon,
  PlaylistIcon,
  VolumeBarBg,
  VolumeCurrentSlider,
  VolumeDot,
  VolumeIcon,
} from "./index.styled";
import { ModeProps } from "./type";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import {
  useDispatchVolumeVisible,
  useVolumeVisible,
} from "./controller/VolumeVisivbleController";
import { useDispatchVolume, useVolume } from "./controller/VolumeController";
import useAudio from "./hooks/useAudio";

function AddonPanel() {
  const [mode, setMode] = useState<ModeProps>("list-cycle");
  const { onModeChange, playlistLength } = usePlayerProps();
  const volumeVisible = useVolumeVisible();
  const dispatchVolumeVisible = useDispatchVolumeVisible();
  const volumeBarRef = useRef<HTMLDivElement>(null!);
  const volume = useVolume();
  const audioElement = useAudio();
  const dispatchVolume = useDispatchVolume();

  const dragEvent = useCallback(
    (info: Pick<PanInfo, "point">) => {
      startTransition(() => {
        if (audioElement) {
          const currentValue =
            1 -
            (info.point.y - volumeBarRef.current.getBoundingClientRect().y) /
              95;
          console.log(currentValue);
          if (currentValue < 0) {
            audioElement.volume = 0;
          } else if (currentValue > 1) {
            audioElement.volume = 1;
          } else {
            audioElement.volume = currentValue;
          }
          dispatchVolume(audioElement.volume);
        }
      });
    },
    [audioElement, dispatchVolume]
  );

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* volume control */}
      <AnimatePresence>
        {volumeVisible && (
          <motion.div
            initial={{
              height: "0px",
              width: "32px",
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "-5px",
            }}
            ref={volumeBarRef}
            transition={{
              bounce: 0,
            }}
            exit={{
              height: "0px",
              opacity: 0,
            }}
            animate={{
              height: "113px",
              opacity: 1,
            }}
          >
            <VolumeBarBg>
              <VolumeCurrentSlider style={{ height: volume * 94 + "%" }} />
              <motion.div
                drag={"y"}
                initial={{
                  position: "absolute",
                  marginTop: "5px",
                  left: "calc(50% - 9px)",
                }}
                animate={{
                  transform: `translateY(${8 - volume * 95}px)`,
                }}
                transition={{
                  duration: 0,
                }}
                dragMomentum={false}
                onDrag={(_, info) => {
                  dragEvent(info);
                }}
                dragElastic={0}
                dragConstraints={{
                  bottom: 8,
                  top: -95,
                }}
              >
                <VolumeDot />
              </motion.div>
            </VolumeBarBg>
          </motion.div>
        )}
      </AnimatePresence>

      <VolumeIcon
        isMuted={volume === 0}
        onClick={() => {
          dispatchVolumeVisible((volumeVisible) => !volumeVisible);
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
