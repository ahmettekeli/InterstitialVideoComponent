import { useState, useEffect, useCallback } from "react";
import useScroll from "./useScroll";
import { getElementVisibilityPercentage } from "utility";

function useVideoAd(videoRef: React.RefObject<HTMLVideoElement>) {
  const [muted, setMuted] = useState(true);

  //
  const scroll = useScroll();

  const videoVisibilityPercentage = getElementVisibilityPercentage(
    videoRef.current!
  );

  function toggleMute() {
    setMuted(!muted);
    (videoRef.current! as HTMLVideoElement).muted = !muted;
  }

  const play = useCallback(() => {
    let video = videoRef.current! as HTMLVideoElement;
    if (video.paused) {
      video.play();
      console.log("Video has started.");
    }
  }, [videoRef]);

  const pause = useCallback(() => {
    let video = videoRef.current! as HTMLVideoElement;
    if (!video.paused) {
      video.pause();
      console.log("Video has paused.");
    }
  }, [videoRef]);

  useEffect(() => {
    videoVisibilityPercentage >= 50 ? play() : pause();
  }, [videoVisibilityPercentage, play, pause]);

  return {
    muted,
    scroll,
    videoVisibilityPercentage,
    toggleMute,
    play,
    pause,
  };
}

export default useVideoAd;
