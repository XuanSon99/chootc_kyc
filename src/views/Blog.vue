<template>
  <main class="blog">
    <section class="news mowpad">
      <div class="mowtainer">
        <div class="blog-head">
          <div class="mowtit big-title">
            {{ cateName }}
          </div>
          <div v-if="title" class="search-title">
            <span>{{ $t("search") }}: {{ title }}</span>
          </div>
          <div v-if="!postList[0]" class="search-title">
            <span>Hiện chưa có bài viết nào</span>
          </div>
        </div>
        <div class="mowgrid" v-if="postList[0]">
          <div class="item" v-for="(item, index) in postList" :key="index">
            <div class="image">
              <img :src="image(item.image)" @click="toDetail(item.slug)" :alt="item.title" />
            </div>
            <div class="content">
              <h2 @click="toDetail(item.slug)">{{ item.title }}</h2>
              <div class="space">
                <p class="author">
                  <i class="fas fa-user-edit"></i>
                  <span>{{ item.author || "Admin" }}</span>
                </p>
                <p class="time">
                  <i class="far fa-calendar-alt"></i>
                  <span>{{ formatTime(item.created_at) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mowgrid" v-else>
          <div class="item loader" v-for="i in 6" :key="i"></div>
        </div>
        <div :class="{ 'btn-all': true, shadow: true, disabled: btnDisabled }" @click="currentPage++">
          {{ $t("readmore") }}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const moment = require("moment");
export default {
  metaInfo() {
    let data = {
      title: `Chợ OTC Việt Nam | ${this.cateName}`,
    };
    return data;
  },
  data() {
    return {
      currentPage: 1,
      postList: [],
      query: "",
      title: "",
      btnDisabled: false,
      cateName: "Tin tức",
      ok: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    toDetail(slug) {
      this.$router.push("/bai-viet/" + slug);
    },
    getList() {
      let language = this.$i18n.locale == "en" ? 0 : 1;
      if (this.$route.path.includes("tin-tuc")) {
        this.CallAPI(
          "get",
          `categories/${this.$route.params.id}?page=${this.currentPage}&language=${language}`,
          {},
          (res) => {
            if (!res.data[0]) {
              this.btnDisabled = true;
              return;
            }
            this.btnDisabled = false;
            this.cateName = res.data[0].cate_name
            this.postList = res.data;
          }
        );
        return;
      }
      if (this.$route.path.includes("tim-kiem")) {
        this.query = this.$route.params.id;
        this.searchHandle();
        return;
      }
      this.CallAPI(
        "get",
        `posts?page=${this.currentPage}&language=${language}`,
        {},
        (res) => {
          if (!res.data[0]) {
            this.btnDisabled = true;
            return;
          }
          this.btnDisabled = false;
          this.postList = res.data;
        }
      );
    },
    searchHandle() {
      if (!this.query) return;
      this.title = this.query;
      this.CallAPI(
        "get",
        `search?query=${this.$route.params.id}`,
        {},
        (res) => {
          if (!res.data.data[0]) {
            return;
          }
          this.btnDisabled = true;
          this.postList = res.data.data;
          if (!res.data.status) {
            this.title = this.query + ` (${this.$t("notresult")})`;
          }
        }
      );
    },
    formatTime(date) {
      var value = new Date(date);
      if (!date) return;
      return moment(value).format("MMMM D, YYYY");
    },
  },
  watch: {
    currentPage() {
      if (!this.title || this.currentPage > 1) {
        this.getList();
        return;
      }
      this.searchHandle();
    },
    $route() {
      this.getList();
      this.cateName = "Tin tức";
      this.postList = [];
      this.currentPage = 1;
      this.btnDisabled = false;
      this.query = "";
      this.title = "";
    },
  },
};
</script>

<style></style>