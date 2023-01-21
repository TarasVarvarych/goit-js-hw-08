import Player from "@vimeo/player";
import throttle from "lodash.throttle";
const vimeoPlayer = new Player("vimeo-player");
console.log(vimeoPlayer);

const onTimeUpdate = function (currentTime) {
  const timeInSeconds = currentTime.seconds;
  localStorage.setItem("videoplayer-current-time", timeInSeconds);
};

vimeoPlayer.on("timeupdate", throttle(onTimeUpdate, 1000));
const storageTime = localStorage.getItem("videoplayer-current-time");

vimeoPlayer
  .setCurrentTime(storageTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
