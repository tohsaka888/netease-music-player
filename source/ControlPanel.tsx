import React, { startTransition, useRef, useState } from "react";
import {
  useCurrentTime,
  useDispathCurrentTime,
} from "./controller/CurrentTimeController";
import { useDuration } from "./controller/DurationController";
import moment from "moment";
import {
  ArtistName,
  BufferedSlider,
  ControlPanelContainer,
  CurrentSlider,
  NextIcon,
  PlayIcon,
  PrevIcon,
  SliderArea,
  SliderDot,
  SongImage,
  SongName,
  TimeArea,
  WordArea,
  WordSliderContainer,
} from "./index.styled";
import useAudio from "./hooks/useAudio";
import { motion, PanInfo } from "framer-motion";
import { usePlayerProps } from "./controller/PropsController";

function ControlPanel() {
  const duration = useDuration();
  const { currentTime, bufferedTime } = useCurrentTime();
  const audioElement = useAudio();
  const [isPlayed, setIsPlayed] = useState<boolean>(
    audioElement?.paused || false
  );
  const setCurrentTime = useDispathCurrentTime();
  const sliderRef = useRef<HTMLDivElement>(null!);
  const { name, artist } = usePlayerProps();

  /**
   * handle drag events
   * @date 11/13/2022 - 1:44:02 PM
   *
   * @param {Pick<PanInfo, "point">} info
   * @param {boolean} isDispatch // dispatch currentTime state or only change audio's currentTime property
   */
  const dragEventHandler = (
    info: Pick<PanInfo, "point">,
    isDispatch: boolean
  ) => {
    startTransition(() => {
      if (audioElement) {
        // calc the dot's position (x)
        const currentValue =
          (info.point.x - sliderRef.current.getBoundingClientRect().x) / 493;
        if (currentValue < 0) {
          if (isDispatch) {
            setCurrentTime((playTime) => ({
              ...playTime,
              currentTime: 0,
            }));
          } else {
            audioElement.currentTime = 0;
          }
        } else if (currentValue > 1) {
          if (isDispatch) {
            setCurrentTime((playTime) => ({
              ...playTime,
              currentTime: duration,
            }));
          } else {
            audioElement.currentTime = duration;
          }
        } else {
          if (isDispatch) {
            setCurrentTime((playTime) => ({
              ...playTime,
              currentTime: currentValue * duration,
            }));
          } else {
            audioElement.currentTime = currentValue * duration;
          }
        }
      }
    });
  };

  return (
    <ControlPanelContainer>
      <PrevIcon />
      <PlayIcon
        isPlayed={isPlayed}
        onClick={() => {
          audioElement?.pause();
          if (isPlayed) {
            audioElement?.pause();
            setIsPlayed(false);
          } else {
            audioElement?.play();
            setIsPlayed(true);
          }
        }}
      />
      <NextIcon />
      <SongImage
        src={
          "https://p2.music.126.net/l3G4LigZnOxFE9lB4bz_LQ==/109951165791860501.jpg?param=34y34"
        }
      />
      <WordSliderContainer>
        <WordArea>
          <SongName>{name}</SongName>
          <ArtistName>{artist}</ArtistName>
        </WordArea>
        <SliderArea
          ref={sliderRef}
          onClick={(event) => {
            dragEventHandler(
              {
                point: { x: event.clientX, y: event.clientY },
              },
              false
            );
          }}
        >
          <BufferedSlider
            style={{
              width: `${(bufferedTime / duration) * 100}%`,
            }}
          />
          <CurrentSlider
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
          <motion.div
            initial={{
              position: "absolute",
              left: "0px",
              bottom: "0px",
            }}
            drag={"x"}
            animate={{
              transform: `translateX(${(currentTime / duration) * 493}px)`,
            }}
            transition={{
              duration: 0,
            }}
            dragMomentum={false}
            dragElastic={0}
            onDrag={(e, info) => {
              dragEventHandler(info, true);
            }}
            dragConstraints={sliderRef}
            onDragEnd={(e, info) => {
              dragEventHandler(info, false);
              if (audioElement) {
                isPlayed && audioElement.play();
              }
            }}
          >
            <SliderDot />
          </motion.div>
        </SliderArea>
      </WordSliderContainer>
      <TimeArea>
        <div style={{ color: "#a1a1a1" }}>
          {moment(currentTime * 1000).format("mm:ss")}
        </div>
        <div>/</div>
        <div>{moment(duration * 1000).format("mm:ss")}</div>
      </TimeArea>
    </ControlPanelContainer>
  );
}

export default ControlPanel;
