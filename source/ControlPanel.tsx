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
  CollectIcon,
  ControlPanelContainer,
  CurrentSlider,
  NextIcon,
  PictureInPictureIcon,
  PlayIcon,
  PrevIcon,
  ShareIcon,
  SliderArea,
  SliderDot,
  SliderIcon,
  SongImage,
  SongName,
  TimeArea,
  WordArea,
  WordSliderContainer,
} from "./index.styled";
import useAudio from "./hooks/useAudio";
import { motion, PanInfo } from "framer-motion";
import { usePlayerProps } from "./controller/PropsController";
import AddonPanel from "./AddonPanel";

function ControlPanel() {
  const duration = useDuration();
  const { currentTime, bufferedTime } = useCurrentTime();
  const audioElement = useAudio();
  const [isPlayed, setIsPlayed] = useState<boolean>(
    audioElement?.paused || false
  );
  const setCurrentTime = useDispathCurrentTime();
  const sliderRef = useRef<HTMLDivElement>(null!);
  const {
    name,
    artist,
    picUrl,
    onCollect,
    onPictureInPicture,
    onPlayNext,
    onPlayPrev,
    onShare,
    playlist,
    id,
  } = usePlayerProps();

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
      <PrevIcon
        onClick={() => {
          const currentIndex =
            playlist?.findIndex((song) => id === song.id) || 0;
          const prevIndex = playlist
            ? currentIndex === 0
              ? playlist.length - 1
              : currentIndex + 1
            : -1;
          onPlayPrev(prevIndex);
        }}
      />
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
      <NextIcon
        onClick={() => {
          const currentIndex =
            playlist?.findIndex((song) => id === song.id) || 0;
          const nextIndex = playlist
            ? currentIndex === playlist.length - 1
              ? 0
              : currentIndex + 1
            : -1;
          onPlayNext(nextIndex);
        }}
      />
      <SongImage src={picUrl} />
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
      <PictureInPictureIcon
        onClick={() => {
          onPictureInPicture();
        }}
      />
      <CollectIcon
        onClick={() => {
          onCollect();
        }}
      />
      <ShareIcon
        onClick={() => {
          onShare();
        }}
      />
      <SliderIcon />
      <AddonPanel />
    </ControlPanelContainer>
  );
}

export default ControlPanel;
