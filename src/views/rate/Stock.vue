<template>
  <main>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit mb-2">
              <span>Chứng khoán</span>
              <v-btn icon color="primary" class="ml-2" @click="getStock">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
          </div>
          <v-data-table :headers="headers.stock" :items="stock" :page.sync="page.stock" :items-per-page="7"
            hide-default-footer :mobile-breakpoint="0">
            <template v-slot:[`item.change`]="{ item }">
              <span
                :class="{ 'price-up': item.change.includes('+') ? true : false, 'price-down': item.change.includes('-') ? true : false }">
                {{ item.change.substring(1) }}
              </span>
              <span>{{ item.time }}</span>
            </template>
            <template v-slot:[`item.code`]="{ item }">
              <span class="max-content">{{ item.code }}</span>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <span class="max-content">{{ item.name }}</span>
            </template>
          </v-data-table>
          <v-pagination class="pt-3" v-model="page.stock" :length="Math.ceil(stock.length / 7)">
          </v-pagination>
        </div>
      </div>
    </section>
    <section class="news mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức thị trường</span>
          </div>
          <v-btn icon color="primary" to="/danh-muc/tin-tuc-thi-truong">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="mowgrid" v-if="crypto_post[0]">
          <div class="item" v-for="(item, index) in crypto_post.slice(0, 3)" :key="index">
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
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
const moment = require("moment");
export default {
  metaInfo() {
    let data = {
      title: `Chợ OTC Việt Nam | Trang chủ`,
    };
    return data;
  },
  data() {
    return {
      stock: [],
      headers: {
        stock: [
          { text: 'Mã', value: 'code', sortable: false },
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá', value: 'price', sortable: false },
          { text: 'Biến động', value: 'change', sortable: false },
        ],
      },
      page: {
        stock: 1
      },
      crypto_post: []
    };
  },
  mounted() {
    this.getStock();
    this.getPost();
  },
  methods: {
    getPost() {
      this.CallAPI(
        "get",
        "categories/tin-tuc-thi-truong",
        {},
        (res) => {
          this.crypto_post = res.data.data;
        }
      );
    },
    getStock() {
      this.stock = []
      this.CallAPI("get", "rate/stock", {}, (res) => {
        this.stock = res.data;
      });
    },
    formatPrice(value) {
      if (!value) return 0;
      let val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatVNPrice(value) {
      if (!value) return 0;
      return String(parseFloat(value).toFixed(0))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatNumber(value) {
      if (Number.isInteger(value)) return value;
      return value.toFixed(2);
    },
    formatTime(date) {
      var value = new Date(date);
      if (!date) return;
      return moment(value).format("MMMM D, YYYY");
    },
    toDetail(slug) {
      this.$router.push("/" + slug);
    },
  },
};
</script>

<style></style>