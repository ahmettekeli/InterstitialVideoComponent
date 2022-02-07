import { Wrapper } from "./VideoContainer.styles";
import Video from "components/Video";

function VideoContainer() {
  return (
    <Wrapper data-testid="video-container">
      <Video />
    </Wrapper>
  );
}

export default VideoContainer;
