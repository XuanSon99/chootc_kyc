<template>
  <main>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit">
              <span>Crypto</span>
              <v-btn icon color="primary" class="ml-2" @click="getCoin">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
            <v-responsive max-width="220">
              <v-text-field v-model="search" label="Tìm kiếm" append-icon="mdi-magnify"></v-text-field>
            </v-responsive>
          </div>
          <v-data-table :headers="headers.crypto" :items="crypto" :search="search" :page.sync="page.usdt_crypto"
            :items-per-page="10" hide-default-footer :mobile-breakpoint="0">
            <template v-slot:[`item.symbol`]="{ item }">
              <div class="align-center">
                <img :src="item.image" class="table-image" alt="">
                <span class="ml-2">{{ item.symbol.toUpperCase() }}</span>
              </div>
            </template>
            <template v-slot:[`item.price_change_percentage_24h`]="{ item }">
              <div
                :class="{ 'price-up': item.price_change_percentage_24h > 0 ? true : false, 'price-down': item.price_change_percentage_24h < 0 ? true : false }">
                {{ formatNumber(Math.abs(item.price_change_percentage_24h)) }} %
              </div>
            </template>
            <template v-slot:[`item.current_price`]="{ item }">
              ${{ formatPrice(item.current_price) }}
            </template>
            <template v-slot:[`item.market_cap`]="{ item }">
              ${{ formatVNPrice(item.market_cap) }}
            </template>
          </v-data-table>
          <v-pagination class="pt-3" v-model="page.usdt_crypto" :length="Math.ceil(crypto.length / 10)">
          </v-pagination>
        </div>
      </div>
    </section>
    <section class="news mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức crypto</span>
          </div>
          <v-btn icon color="primary" to="/danh-muc/crypto">
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
      search: '',
      crypto: [],
      headers: {
        crypto: [
          { text: 'Tên', value: 'symbol', sortable: false },
          { text: 'Giá', value: 'current_price', sortable: false },
          { text: '24h', value: 'price_change_percentage_24h', sortable: false },
          { text: 'Vốn hóa', value: 'market_cap', sortable: false },
        ],
      },
      page: {
        usdt_crypto: 1,
      },
      crypto_post: []
    };
  },
  mounted() {
    this.getCoin();
    this.getPost();
  },
  methods: {
    getPost() {
      this.CallAPI(
        "get",
        "categories/crypto",
        {},
        (res) => {
          this.crypto_post = res.data.data;
        }
      );
    },
    getCoin() {
      this.crypto = []
      this.CallAPI("get", "coins", {}, (res) => {
        this.crypto = res.data;
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