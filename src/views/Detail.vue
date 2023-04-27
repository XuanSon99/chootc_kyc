<template>
  <main class="news detail">
    <div class="mowtainer">
      <div class="space mowpad">
        <div class="main-content">
          <div v-if="info.title">
            <h1>
              {{ info.title }}
            </h1>
            <p class="author">
              <span>
                <i class="fas fa-user-edit"></i>
                {{ info.author || "Admin" }}
              </span>
              <span>
                <i class="far fa-calendar-alt"></i>
                {{ formatTime(info.created_at) }}
              </span>
            </p>
            <div class="details">
              <div v-html="info.body"></div>
            </div>
          </div>
          <div class="details loader" v-else></div>
        </div>
        <div class="feature" v-if="postList[0]">
          <h1>{{ $t("LastestPosts") }}</h1>
          <div class="space" v-for="(item, index) in postList" :key="index">
            <img :src="image(item.image)" alt="" />
            <div class="title">
              <h3 @click="toDetail(item.slug)">{{ formatTitle(item.title) }}</h3>
              <p class="space">
                <span>
                  <i class="far fa-calendar-alt"></i>
                  {{ formatTime(item.created_at) }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="feature" v-else>
          <h1>{{ $t("LastestPosts") }}</h1>
          <div class="loader" v-for="i in 6" :key="i"></div>
        </div>
      </div>
      <div v-if="relatedList[0]">
        <div class="mowtit big-title" :data-name="$t('RelatedPosts')">
          {{ $t("RelatedPosts") }}
        </div>
        <div class="mowgrid">
          <div class="item" v-for="(item, index) in relatedList" :key="index">
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
        <router-link tag="div" class="btn-all shadow" :to="'/danh-muc/' + info.category">
          {{ $t("readmore") }}
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
const moment = require("moment");
export default {
  metaInfo() {
    let data = {
      title: `Chợ OTC Việt Nam | ${this.info.title ? this.info.title : "Tin tức"}`,
      meta: [
        {
          property: "og:title",
          content: this.info.title,
        },
        {
          property: "og:image",
          content: this.image(this.info.image),
        },
        {
          property: "og:description",
          content: this.info.excerpt,
        },
      ],
    };
    return data;
  },
  data() {
    return {
      info: {},
      postList: [],
      relatedList: [],
    };
  },
  mounted() {
    this.getList();
    this.getPostContent();
  },
  watch: {
    $route() {
      this.getPostContent();
    },
  },
  methods: {
    getPostContent() {
      this.relatedList = [];
      let language = this.$i18n.locale == "en" ? 0 : 1;
      this.CallAPI("get", "posts/" + this.$route.params.id, {}, (res) => {
        this.info = res.data;
        if (!res.data.category) return;
        this.CallAPI(
          "get",
          `categories/${res.data.category}?language=${language}`,
          {},
          (res) => {
            this.relatedList = res.data.data;
          }
        );
      });
    },
    getList() {
      let language = this.$i18n.locale == "en" ? 0 : 1;
      this.CallAPI("get", "posts?language=" + language, {}, (res) => {
        this.postList = res.data.data;
      });
    },
    toDetail(slug) {
      this.$router.push("/" + slug);
    },
    formatTime(date) {
      var value = new Date(date);
      if (!date) return;
      return moment(value).format("MMMM D, YYYY");
    },
    formatTitle(value) {
      if (!value) return
      let array = value.split(" ")
      if (array.length <= 10) {
        return value
      }
      return array.slice(0, 10).join(" ") + "..."
    }
  },
};
</script>

<style></style>