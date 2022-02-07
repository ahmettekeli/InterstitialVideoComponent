import { useState, useEffect, useCallback } from "react";
import { getElementVisibilityPercentage } from "utility";

function useVideoAd(videoRef: React.RefObject<HTMLVideoElement>) {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted(!muted);
    (videoRef.current! as HTMLVideoElement).muted = !muted;
  };

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

  const handleVideoPlayPause = useCallback(() => {
    let videoVisibilityPercentage = getElementVisibilityPercentage(
      videoRef.current!
    );
    videoVisibilityPercentage >= 50 ? play() : pause();
  }, [videoRef, play, pause]);

  useEffect(() => {
    document.addEventListener("scroll", handleVideoPlayPause);
    return () => {
      document.removeEventListener("scroll", handleVideoPlayPause);
    };
  }, [handleVideoPlayPause]);

  return {
    muted,
    // videoVisibilityPercentage,
    toggleMute,
    play,
    pause,
  };
}

export default useVideoAd;
