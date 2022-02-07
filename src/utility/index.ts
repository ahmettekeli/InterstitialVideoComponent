export function getElementVisibilityPercentage(element: HTMLElement) {
  if(!element || !isElementInScreen){
    return 0;
  }

  let {top, bottom} = element.getBoundingClientRect();
  let windowHeight = window.innerHeight;
  let percent=0;

  if (top < 0) {
    percent = (bottom / (bottom - top)) * 100;
  } else if (bottom > windowHeight) {
    percent = ((windowHeight - top) / (bottom - top)) * 100;
  } else {
    percent = 100;
  }
  return Math.floor(percent);
}

export function isElementInScreen(element: HTMLElement) {
  if (!element) {
    return false;
  }
  let {top, bottom } = element.getBoundingClientRect();
  let windowHeight = window.innerHeight;
  return top < windowHeight && bottom > 0;

}

export function getDurationPercentage(video: HTMLVideoElement): number {
  if (!video) {
    return 0;
  }
  let duration = video.duration;
  let currentTime = video.currentTime;
  let percentage = (currentTime / duration) * 100;
  return Number(percentage.toFixed(0));
}

export function handleVideoQurters(percent: number) {
  console.log(`Video has reached ${percent} %`);
}

export function handle2SecWatch() {
  console.log("Video has been watched for at least 2 seconds.");
}
