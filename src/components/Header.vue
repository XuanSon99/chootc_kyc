<template>
  <header>
    <div class="head">
      <div class="mowtainer align-center space">
        <router-link tag="div" to="/" class="logo">
          <div class="flex align-center">
            <img src="/img/logo-footer.png" />
          </div>
        </router-link>
        <div class="menu">
          <div class="search">
            <form class="search-box">
              <input type="text" placeholder="Tìm kiếm" v-model="query" />
              <button type="submit" @click.prevent="searchHandle()">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
          <a href="https://t.me/ChoOTCVN_bot" class="btn-all outline mx-3" target="blank">
            Đăng ký
          </a>
          <a href="https://t.me/chootcvn" class="btn-all" target="blank">
            Tham gia
          </a>
          <!-- <b-dropdown class="language" right>
          <template slot="button-content">
            <img :src="lang.img" alt="" />
            <span class="mx-2">{{ lang.text }}</span>
          </template>
          <b-dropdown-item
            v-for="(item, index) in language"
            :key="index"
            @click="changeLanguage(item)"
            v-show="lang.value != item.value"
          >
            <img :src="item.img" alt="" />
            <span class="mx-2">{{ item.text }}</span>
          </b-dropdown-item>
        </b-dropdown> -->
        </div>
        <input type="checkbox" id="menu" style="display: none" />
        <label class="menu-bar" for="menu"></label>
        <div class="mobile-menu">
          <div v-for="(item, index) in nav" :key="index">
            <span @click="toDetail(item.slug)" v-if="item.slug == 'tuyen-dung'">
              <i class="fas fa-angle-right"></i>
              {{ item.name }}
            </span>
            <span v-else>
              <i class="fas fa-angle-right"></i>
              {{ item.name }}
            </span>
            <div v-if="item.post">
              <div class="child-item" v-for="(item, index) in item.child" :key="index" @click="toDetail(item.slug)">
                {{ item.name }}
              </div>
            </div>
            <div v-else>
              <router-link class="child-item" v-for="(item, index) in item.child" :key="index" :to="item.slug">
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex mt-3">
            <a href="https://t.me/ChoOTCVN_bot" class="btn-all outline mx-3" target="blank">
              Đăng ký
            </a>
            <a href="https://t.me/chootcvn" class="btn-all" target="blank">
              Tham gia
            </a>
          </div>
          <!-- <b-dropdown class="language" left>
          <template slot="button-content">
            <img :src="lang.img" alt="" />
            <span class="mx-2">{{ lang.text }}</span>
          </template>
          <b-dropdown-item
            v-for="(item, index) in language"
            :key="index"
            @click="changeLanguage(item)"
            v-show="lang.value != item.value"
          >
            <img :src="item.img" alt="" />
            <span class="mx-2">{{ item.text }}</span>
          </b-dropdown-item>
        </b-dropdown> -->
        </div>
      </div>
    </div>
    <div id="menu">
      <div class="mowtainer align-center justify-center">
        <div class="menu">
          <div class="main-menu">
            <router-link to="/" class="menu-item">Trang chủ</router-link>
          </div>
          <div class="main-menu" v-for="(item, index) in nav" :key="index">
            <dev class="menu-item">
              <span @click="toDetail(item.slug)" v-if="item.slug == 'tuyen-dung'">{{ item.name }}</span>
              <span v-else>{{ item.name }}</span>
              <div class="child" v-if="item.post">
                <div class="child-item" v-for="(item, index) in item.child" :key="index" @click="toDetail(item.slug)">
                  {{ item.name }}
                </div>
              </div>
              <div class="child" v-else>
                <router-link class="child-item" v-for="(item, index) in item.child" :key="index" :to="item.slug">
                  {{ item.name }}
                </router-link>
              </div>
            </dev>
          </div>
          <div class="main-menu">
            <a class="menu-item" href="https://t.me/ChoOTCVN_support" target="_blank">Liên hệ</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      language: [
        {
          img: "/img/flag/en.png",
          text: "English",
          value: "en",
        },
        {
          img: "/img/flag/vi.png",
          text: "Tiếng Việt",
          value: "vi",
        },
      ],
      lang: {
        img: "/img/flag/en.png",
        text: "English",
        value: "en",
      },
      nav: [
        {
          name: "Giới thiệu",
          child: [
            {
              slug: "/bai-viet/ve-chung-toi",
              name: "Về chúng tôi",
            },
            {
              slug: "/bai-viet/quy-dinh-chinh-sach",
              name: "Quy định & chính sách",
            },
            {
              slug: "/tin-tuc/huong-dan-nguoi-moi",
              name: "Hướng dẫn người mới",
            },
          ],
        },
        {
          name: "Tỷ giá",
          child: [
            {
              slug: "/ngoai-te",
              name: "Ngoại tệ",
            },
            {
              slug: "/gia-vang",
              name: "Giá vàng",
            },
            {
              slug: "/crypto",
              name: "Crypto",
            },
            {
              slug: "/chung-khoan",
              name: "Chứng khoán",
            },
          ],
        },
        {
          post: true,
          name: "Tin tức",
          child: [],
        },
        {
          post: true,
          name: "Hướng dẫn",
          child: [],
        },
        {
          slug: "tuyen-dung",
          name: "Tuyển dụng",
        },
        // {
        //   slug: "/lien-he",
        //   name: "Liên hệ",
        // },
      ],
      query: "",
    };
  },
  mounted() {
    window.onscroll = function (e) {
      document.querySelector("#menu").checked = false;
    };
    this.getCateList();
  },
  methods: {
    scrollTo(id) {
      document.getElementById(id).scrollIntoView(true);
    },
    changeLanguage(item) {
      this.$i18n.locale = item.value;
      this.lang = item;
    },
    getCateList() {
      this.CallAPI("get", "categories", {}, (res) => {
        res.data.forEach((item) => {
          if (item.parent_slug == "news") {
            this.nav[2].child.push(item);
          }
          if (item.parent_slug == "tutorial") {
            this.nav[3].child.push(item);
          }
        });
      });
    },
    searchHandle() {
      if (!this.query) return;
      this.$router.push("/tim-kiem/" + this.query);
    },
    toDetail(slug) {
      this.$router.push("/tin-tuc/" + slug);
    },
  },
  watch: {
    $route() {
      document.querySelector("#menu").checked = false;
      window.onscroll = function (e) {
        document.querySelector("#menu").checked = false;
      };
    },
  },
};
</script>

<style></style>