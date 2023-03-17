<template>
  <footer class="relative">
    <div class="mowtainer">
      <div class="mowgrid grid-footer align-start">
        <div class="foot-logo relative">
          <img src="/img/logo-footer.png" alt="">
          <img src="/img/logo-footer-2.png" alt="">
        </div>
        <div>
          <h2>Tỷ giá</h2>
          <p @click="$router.push('/ngoai-te')">Ngoại tệ</p>
          <p @click="$router.push('/gia-vang')">Giá vàng</p>
          <p @click="$router.push('/crypto')">Crypto</p>
          <p @click="$router.push('/chung-khoan')">Chứng khoán</p>
        </div>
        <div>
          <h2>Tin tức</h2>
          <p v-for="(item, index) in nav[0].child" :key="index" @click="toDetail(item.slug)">
            {{ item.name }}
          </p>
        </div>
        <div>
          <h2>Hướng dẫn</h2>
          <p v-for="(item, index) in nav[1].child" :key="index" @click="toDetail(item.slug)">
            {{ item.name }}
          </p>
        </div>
      </div>
      <div class="mowgrid foot align-center">
        <span>© 2023 chootc.com. All rights reserved</span>
        <div class="flex justify-center">
          <router-link to="/bai-viet/ve-chung-toi" class="px-5">Giới thiệu</router-link>
          <router-link to="/bai-viet/ve-chung-toi" class="px-5">Quy định & chính xách</router-link>
        </div>
        <div class="flex justify-end">
          <v-btn icon color="primary" href="https://t.me/chootcvn" target="_blank">
            <v-icon>fa-brands fa-telegram</v-icon>
          </v-btn>
          <v-btn icon color="primary" href="https://www.facebook.com/Chootcvietnam" target="_blank">
            <v-icon>fa-brands fa-facebook-f</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="foot-bgr"></div>
    <div class="cold-6"></div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      nav: [{ child: [] }, { child: [] }]
    }
  },
  mounted() {
    this.getCateList()
  },
  methods: {
    getCateList() {
      this.CallAPI("get", "categories", {}, (res) => {
        res.data.forEach((item) => {
          if (item.parent_slug == "news") {
            this.nav[0].child.push(item);
          }
          if (item.parent_slug == "tutorial") {
            this.nav[1].child.push(item);
          }
        });
      });
    },
    toDetail(slug) {
      this.$router.push("/tin-tuc/" + slug);
    },
  }
};
</script>

<style>
footer {
  padding-top: 200px;
}

.grid-footer {
  grid-gap: 32px;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

.foot {
  grid-gap: 32px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 50px 0;
  border-top: 1px solid #ffffff20;
  margin-top: 25px;
}

.foot span {
  color: hsla(0, 0%, 100%, .6);
  font-size: 14px;
}

.foot a {
  color: #fff !important;
  font-size: 14px;
}

footer h2 {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 25px;
}

footer p {
  color: hsla(0, 0%, 100%, .6);
  margin-bottom: 25px !important;
  cursor: pointer;
  transition: all 200ms;
}

footer p:hover {
  color: #fff;
}

.foot-logo h1 {
  position: absolute;
  top: 50%;
  transform: translateY(-20px);
  left: 65px;
}

.foot-bgr {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1800px;
  height: 100%;
  background-image: url('/img/home/footer.svg');
  background-repeat: no-repeat;
  mask-image: radial-gradient(closest-side, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: -1;
  background-size: cover;
}

.cold-6 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1800px;
  height: 100%;
  background-image: url('/img/home/cold-6.png');
  background-repeat: no-repeat;
  z-index: -1;
}
</style>