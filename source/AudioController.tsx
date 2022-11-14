import React, { startTransition } from "react";
import { useDispathCurrentTime } from "./controller/CurrentTimeController";
import { useDispathDuration } from "./controller/DurationController";
import { usePlayerProps } from "./controller/PropsController";

function AudioController() {
  const dispatchDuration = useDispathDuration();
  const dispatchCurrentTime = useDispathCurrentTime();
  const { url } = usePlayerProps();
  return (
    <>
      <video
        controls={false}
        id={"netease-audio"}
        style={{ display: "none" }}
        onTimeUpdate={({ currentTarget }) => {
          startTransition(() => {
            const bufferedTime = currentTarget.buffered.end(
              currentTarget.buffered.length - 1
            );

            dispatchCurrentTime({
              bufferedTime,
              currentTime: currentTarget.currentTime,
            });
          });
        }}
        preload={"auto"}
        onPlay={({ currentTarget }) => {
          dispatchDuration(currentTarget.duration);
        }}
        src={url}
      />
    </>
  );
}

export default AudioController;
