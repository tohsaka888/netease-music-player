import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ActiveArea,
  LeftContainer,
  LockedIcon,
  MainBackground,
  MusicPlayerContainer,
  RightBackground,
} from "./index.styled";
import AudioController from "./AudioController";
import CurrentTimeController from "./controller/CurrentTimeController";
import DurationController from "./controller/DurationController";
import ControlPanel from "./ControlPanel";
import { MusicPlayerProps } from "./type";
import PropsController from "./controller/PropsController";
import VolumeVisivbleController, {
  useVolumeVisible,
} from "./controller/VolumeVisivbleController";
import VolumeController from "./controller/VolumeController";

function ContextProvider(props: MusicPlayerProps) {
  return (
    <PropsController {...props}>
      <DurationController>
        <CurrentTimeController>
          <VolumeVisivbleController>
            <VolumeController>
              <MusicPlayer />
            </VolumeController>
          </VolumeVisivbleController>
        </CurrentTimeController>
      </DurationController>
    </PropsController>
  );
}

function MusicPlayer() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const volumeVisible = useVolumeVisible();

  const bottom = useMemo(() => {
    if (volumeVisible) {
      return "0px";
    } else {
      if (isLocked) {
        return "0px";
      } else {
        return isActive ? "0px" : "-45px";
      }
    }
  }, [volumeVisible, isLocked, isActive]);

  return (
    <motion.div
      initial={{
        position: "fixed",
        width: "100%",
        height: "53px",
        bottom: "-45px",
      }}
      animate={{
        bottom: bottom,
      }}
      transition={{
        bounce: 0,
      }}
      onMouseLeave={(event) => {
        if (
          event.clientY <
          (event.target as HTMLDivElement).getBoundingClientRect().top
        ) {
          setIsActive(false);
        }
      }}
    >
      <ActiveArea
        onMouseOver={() => {
          setIsActive(true);
        }}
      />
      <MainBackground />
      <MusicPlayerContainer style={{ color: "#fff" }}>
        <AudioController />
        <ControlPanel />
      </MusicPlayerContainer>

      <LeftContainer
        onMouseOver={() => {
          setIsActive(true);
        }}
      >
        <LockedIcon
          isLocked={isLocked}
          onClick={() => {
            setIsLocked(!isLocked);
            if (isLocked) {
              setIsActive(false);
            }
          }}
        />
      </LeftContainer>
      <RightBackground />
    </motion.div>
  );
}

export default ContextProvider;
