import React, { useEffect, useState } from "react";

function useAudio() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    if (!audioElement) {
      setAudioElement(
        document.getElementById("netease-audio") as HTMLAudioElement
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return audioElement;
}

export default useAudio;
