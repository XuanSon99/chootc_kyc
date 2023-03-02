<template>
  <main>
    <div class="record-video">
      <video id="video" autoplay></video>
      <div class="start-btn" v-if="!streaming" @click="startRecording"></div>
      <div class="stop-btn" v-else @click="stopRecording"></div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      recorder: "",
      stream: "",
      streaming: false,
    };
  },
  mounted() {
    window.addEventListener("load", this.onWindowLoad);
  },
  methods: {
    async onWindowLoad() {
      const video = document.getElementById("video");
      const constraints = {
        audio: true,
        video: {
          mandatory: {
            facingMode: "environment",
          },
        },
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = this.stream;
    },

    startRecording() {
      this.recorder = new MediaRecorder(this.stream, {
        mimeType: "video/webm",
      });
      this.recorder.start();
      this.streaming = true;
    },

    stopRecording() {
      this.recorder.ondataavailable = (e) => {
        console.log("Got blob data:", e.data);
      };
      this.recorder.stop();
      this.streaming = false;
    },
  },
};
</script>

<style>
</style>