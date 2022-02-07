import { useRef, useState } from "react";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import useVideoAd from "hooks/useVideoAd";
import { Wrapper, Controls } from "./Video.styles";
import {
  getDurationPercentage,
  handle2SecWatch,
  handleVideoQurters,
} from "utility";

function Video() {
  const [thresholdReached, setThresholdReached] = useState(false);
  const videoRef = useRef(null);
  const { muted, toggleMute } = useVideoAd(videoRef);
  const videoUrl = "https://cdn.yoc.com/ad/demo/airbnb.mp4";

  function onVideoTimeUpdate(e: React.ChangeEvent<HTMLVideoElement>) {
    let percentage = getDurationPercentage(e.target as HTMLVideoElement);
    let { currentTime } = e.target;
    if (
      percentage === 25 ||
      percentage === 50 ||
      percentage === 75 ||
      percentage === 100
    ) {
      handleVideoQurters(percentage);
    }
    if (currentTime > 2 && !thresholdReached) {
      handle2SecWatch();
      setThresholdReached(true);
    }
  }

  return (
    <Wrapper data-testid="video">
      <Controls data-testid="mute" onClick={toggleMute}>
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Controls>
      <video
        muted
        playsInline
        loop //I wasn't sure if this is expected but added anyway
        ref={videoRef}
        onTimeUpdate={onVideoTimeUpdate}
        src={videoUrl}
      />
    </Wrapper>
  );
}

export default Video;
