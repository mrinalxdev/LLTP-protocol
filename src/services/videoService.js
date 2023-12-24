const ffmpeg = require("ffmpeg");
const Video = require("../models/Video");
const cv = require('opencv4nodejs')

const transcodeVideo = async (inputFilePath, outputFilePath) => {
  try {
    const process = new ffmpeg(inputFilePath);
    process.then(
      (video) => {
        video
          .setAudioCodec("aac")
          .setVideoCodec("libx264")
          .save(outputFilePath, (error, file) => {
            if (!error) {
              console.log("Video transcoded successfully: ", file);
            } else {
              console.error("Error transcoding video :", error);
            }
          });
      },
      (error) => {
        console.error("Error opening video: ", error);
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const processVideoMetadata = async (inputFilePath) => {
  try {
    const process = new ffmpeg(inputFilePath);
    const videoInfo = await process.then((video) => {
      return {
        duration: video.metadata.duration.raw,
        resolution: video.metadata.video.resolution,
        bitrate: video.metadata.video.bitrate,
        format: video.metadata.format,
        creationDate: video.metadata.creation_date,
      };
    });
    return videoInfo;
  } catch (err) {
    console.error("Error Occurred while viewing metadata :", err);
    throw err;
  }
};

const analyzeVideoContent = async(inputFilePath) => {
  // Here I have used OpenCv for analysing of the video
  try {
    const cap = new cv.VideoCpature(inputFilePath)
    const frameRate = cap.get(cv.CAP_PROPS_FPS)
    const totalFrames = cap.get(cv.CAP_PROP_FRAME_COUNT)

    const objectDetected = []
    const scenesDetected = []

    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += frameRate){
      const frame = cap.read()
      if (frame.empty){
        break;
      }
    }

    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const faces = classifier.detectMultiScale(frame);
    
    
  }catch (err) {
    console.error(err, 'Error While analyzing your video');
  }
}
