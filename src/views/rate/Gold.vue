<template>
  <main>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="mowgrid grid-bot">
          <div class="item pd-30">
            <div class="space">
              <div class="mowtit mb-2">
                <span>Giá vàng</span>
                <v-btn icon color="primary" class="ml-2" @click="getGold">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
            </div>
            <v-data-table class="gold-price" :headers="headers.gold" :items="gold" :page.sync="page.gold"
              :items-per-page="8" hide-default-footer :mobile-breakpoint="0">
              <template v-slot:[`item.buy`]="{ item }">
                <span v-if="item.name == 'Thế giới'">
                  ${{ formatPrice(item.buy) }}
                </span>
                <span class="mr-1" v-else>{{ formatVNPrice(item.buy) }}</span>
                <span v-if="item.buy_change"
                  :class="{ 'price-up': item.buy_change > 0 ? true : false, 'price-down': item.buy_change < 0 ? true : false }">
                  {{ Math.abs(item.buy_change) }}
                </span>
              </template>
              <template v-slot:[`item.sell`]="{ item }">
                <span v-if="item.name == 'Thế giới'">
                  ${{ formatPrice(item.sell) }}
                </span>
                <span class="mr-1" v-else>{{ formatVNPrice(item.sell) }}</span>
                <span v-if="item.sell_change"
                  :class="{ 'price-up': item.sell_change > 0 ? true : false, 'price-down': item.sell_change < 0 ? true : false }">
                  {{ Math.abs(item.sell_change) }}
                </span>
              </template>
            </v-data-table>
            <v-pagination class="pt-3" v-model="page.gold" :length="Math.ceil(gold.length / 8)">
            </v-pagination>
          </div>
          <div class="item pd-30">
            <div class="mowtit mb-6">
              <span>Quy đổi giá vàng</span>
            </div>
            <v-text-field outlined label="Số lượng" v-model="amount"></v-text-field>
            <v-autocomplete label="Mua/bán" outlined :items="types" item-text="title" item-value="value" v-model="type">
            </v-autocomplete>
            <v-autocomplete label="Loại vàng" outlined :items="gold" item-text="name" v-model="from" return-object>
            </v-autocomplete>
            <div class="justify-center flex mb-7">
              <v-btn icon color="primary">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </div>
            <v-text-field outlined label="Thành tiền" v-model="result" readonly></v-text-field>
            <v-btn class="primary" large block @click="convertHandle">Chuyển đổi</v-btn>
          </div>
        </div>
      </div>
    </section>
    <section class="news relative mt-8">
      <div class="mowtainer">
        <div class="space mb-6">
          <div class="mowtit">
            <span>Tin tức thị trường</span>
          </div>
          <v-btn icon color="primary" to="/tin-tuc/tin-tuc-thi-truong">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="mowgrid" v-if="market_post[0]">
          <div class="item" v-for="(item, index) in market_post.slice(0, 3)" :key="index">
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
      gold: [],
      headers: {
        gold: [
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá Mua', value: 'buy', sortable: false },
          { text: 'Giá Bán', value: 'sell', sortable: false },
        ],
      },
      page: {
        gold: 1,
      },
      amount: 1,
      from: "",
      result: "",
      type: "buy",
      types: [
        {
          title: "Mua",
          value: "buy"
        },
        {
          title: "Bán",
          value: "sell"
        }
      ],
      market_post: []
    };
  },
  mounted() {
    this.getGold();
    this.getPost();
  },
  methods: {
    convertHandle() {
      if (this.from.name == this.gold[0].name) {
        let usd = (Number(this.bank[0].buy.replace(",", "")) + Number(this.bank[0].sell.replace(",", ""))) / 2
        this.result = this.formatPrice(this.amount * Number(this.from.buy) * usd)
        return
      }
      if (this.type == 'buy') {
        this.result = this.formatVNPrice(this.amount * Number(this.from.buy) * 1000)
        return
      }
      this.result = this.formatVNPrice(this.amount * Number(this.from.sell) * 1000)
    },
    getPost() {
      this.CallAPI(
        "get",
        "categories/tin-tuc-thi-truong",
        {},
        (res) => {
          this.market_post = res.data;
        }
      );
    },
    getGold() {
      this.gold = []
      this.CallAPI("get", "rate/gold", {}, (res) => {
        this.gold = res.data;
        this.from = res.data[0]
        this.CallAPI("get", "rate/bank", {}, (res) => {
          this.bank = res.data;
          this.bank.unshift(res.data[19])
          this.bank.splice(-1)
          this.convertHandle()
        });
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
      this.$router.push("/bai-viet/" + slug);
    },
  },
};
</script>

<style></style>