const form = document.getElementById("capture-form");
/**
 * @type{HTMLVideoElement}
 */
const captureVideo = document.getElementById("capture-video");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const captureFormData = new CaptureVideoForm(form);
  const [width, height] = captureFormData.res;
  playVideo(width, height);
});

function playVideo(width, height) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: { width, height, frameRate: { ideal: 60 } },
        audio: {
          latency: { ideal: 0.001 },
          sampleRate: { ideal: 48000 },
          channelCount: { ideal: 2 },
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      })
      .then((stream) => {
        captureVideo.srcObject = stream;
        captureVideo.width = width;
        captureVideo.height = height;
        captureVideo.style.width = width.toString() + "px";
        captureVideo.style.height = height.toString() + "px";
        captureVideo.requestFullscreen({ navigationUI: "show" });
      });
  }
}

class CaptureVideoForm {
  resolution;

  constructor(data) {
    this.resolution = data.resolution.value;
  }

  get res() {
    return this.resolution.split("x").map(Number);
  }
}
