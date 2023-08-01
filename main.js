import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

const load = async () => {
  const baseURL = `https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd`;
  ffmpeg.on("log", ({ message }) => {
    debug.innerHTML += message + "<br>";
  });
  console.log("loading started");
  console.log(`${baseURL}/ffmpeg-core.js`)
  console.log(`${baseURL}/ffmpeg-core.wasm`)
  
  const javascript = await toBlobURL(
    `${baseURL}/ffmpeg-core.js`,
    "text/javascript",
  );

  const wasm = await toBlobURL(
    `${baseURL}/ffmpeg-core.wasm`,
    "application/wasm",
  );
  console.log(javascript);
  console.log(wasm);

  const worker = "";

  ffmpeg.terminate(); // does not work with or without this line
  await ffmpeg.load({
    coreURL: javascript, 
    wasmURL: wasm});
  console.log("ffmpeg loaded");
};

const transcode = async () => {
  await ffmpeg.writeFile("input.webm", await fetchFile("input.webm"));

  await ffmpeg.exec(["-i", "input.webm", "output.mov"]);
  const data = await ffmpeg.readFile("output.mp4");
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" })
  );
};

// setup actions
let video = document.getElementById("video");
let startButton = document.getElementById("start");
let loadButton = document.getElementById("load");
let debug = document.getElementById("debug");

startButton.onclick = () => {
  console.log("Start button");
  transcode();
};

loadButton.onclick = async () => {
  console.log("Load button");
  load();
};
