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

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <DurationController>
      <CurrentTimeController>
        <VolumeVisivbleController>{children}</VolumeVisivbleController>
      </CurrentTimeController>
    </DurationController>
  );
}

function MusicPlayer(props: MusicPlayerProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const volumeVisible = useVolumeVisible();

  console.log(volumeVisible)

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
    <PropsController {...props}>
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
      >
        <ActiveArea
          onMouseOver={() => {
            setIsActive(true);
          }}
          onMouseLeave={(event) => {
            if (
              event.clientY <
              (event.target as HTMLDivElement).getBoundingClientRect().top
            ) {
              setIsActive(false);
            }
          }}
        />
        <MainBackground />
        <MusicPlayerContainer style={{ color: "#fff" }}>
          <ContextProvider>
            <AudioController />
            <ControlPanel />
          </ContextProvider>
        </MusicPlayerContainer>

        <LeftContainer
          onMouseOver={() => {
            setIsActive(true);
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
    </PropsController>
  );
}

export default MusicPlayer;
