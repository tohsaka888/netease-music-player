import React, { useEffect, useState } from "react";

function useAudio() {
  const [audioElement, setAudioElement] = useState<HTMLVideoElement | null>(
    null
  );

  useEffect(() => {
    if (!audioElement) {
      setAudioElement(
        document.getElementById("netease-audio") as HTMLVideoElement
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return audioElement;
}

export default useAudio;
