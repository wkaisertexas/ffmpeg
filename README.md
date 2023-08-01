# FFMpeg WASM

Load `input.webm` and convert it to `output.mov` using FFmpeg.wasm.

Made in Vanilla Javascript

## Running

```console
npm run dev
```

## Changes made

1. Updating Vite's Build Settings to exclude `@ffmpeg/fmpeg` and `@ffmpeg/util` from the optimized dependencies `optimizeDeps`. This was able to resolve a **504 error**``. 

```javascript
export default defineConfig({
    optimizeDeps: {
        exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
});
```