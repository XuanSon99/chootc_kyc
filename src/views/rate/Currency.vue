<template>
  <main>
    <section class="pd-top">
      <div class="mowtainer">
        <div class="mowgrid grid-bot">
          <div class="item pd-30">
            <div class="space mb-5">
              <div class="mowtit">
                <span>Tỷ giá ngoại tệ</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(1)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-tabs v-model="rate_tab" right>
                <v-tab :value="1">Ngân hàng</v-tab>
                <v-tab :value="2">Thế giới</v-tab>
              </v-tabs>
            </div>
            <v-tabs-items v-model="rate_tab">
              <v-tab-item>
                <v-data-table :headers="headers.bank" :items="bank" :page.sync="page.bank_rate" :items-per-page="8"
                  hide-default-footer :mobile-breakpoint="0">
                  <template v-slot:[`item.buy`]="{ item }">
                    <span class="up-color">{{ item.buy }}</span>
                  </template>
                  <template v-slot:[`item.sell`]="{ item }">
                    <span class="down-color">{{ item.sell }}</span>
                  </template>
                </v-data-table>
                <v-pagination class="pt-3" v-model="page.bank_rate" :length="Math.ceil(bank.length / 8)">
                </v-pagination>
              </v-tab-item>
              <v-tab-item>
                <v-data-table :headers="headers.world" :items="world" hide-default-footer :mobile-breakpoint="0">
                  <template v-slot:[`item.name`]="{ item }">
                    {{ item.from }} / {{ item.to }}
                  </template>
                  <template v-slot:[`item.buy`]="{ item }">
                    <span>{{ item.buy.toFixed(5) }}</span>
                  </template>
                  <template v-slot:[`item.change`]="{ item }">
                    <div
                      :class="{ 'price-up': item.change > 0 ? true : false, 'price-down': item.change < 0 ? true : false }">
                      {{ Math.abs(item.change) }} %
                    </div>
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </div>
          <div class="item pd-30">
            <div class="mowtit mb-10 mt-2">
              <span>Quy đổi ngoại tệ</span>
            </div>
            <v-text-field outlined label="Số lượng" v-model="amount"></v-text-field>
            <v-autocomplete label="Mua/bán" outlined :items="types" item-text="title" item-value="value" v-model="type">
            </v-autocomplete>
            <v-autocomplete label="Loại tiền tệ" outlined :items="bank" item-text="code" v-model="from" return-object>
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
    <section class="mt-8">
      <div class="mowtainer">
        <div class="item pd-30">
          <div class="space">
            <div class="mowtit mb-2">
              <span>Lực thị trường</span>
              <v-btn icon color="primary" class="ml-2" @click="refreshHandle(4)">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
          </div>
          <v-data-table class="market-force" :headers="headers.market_force" :items="market_force" hide-default-footer
            :mobile-breakpoint="0">
            <template v-slot:[`item.five_minutes`]="{ item }">
              <div
                :class="{ 'up-color': item.five_minutes.includes('Mua') ? true : false, 'down-color': item.five_minutes.includes('Bán') ? true : false }">
                {{ item.five_minutes }}
              </div>
            </template>
            <template v-slot:[`item.fifteen_minutes`]="{ item }">
              <div
                :class="{ 'up-color': item.fifteen_minutes.includes('Mua') ? true : false, 'down-color': item.fifteen_minutes.includes('Bán') ? true : false }">
                {{ item.fifteen_minutes }}
              </div>
            </template>
            <template v-slot:[`item.one_hour`]="{ item }">
              <div
                :class="{ 'up-color': item.one_hour.includes('Mua') ? true : false, 'down-color': item.one_hour.includes('Bán') ? true : false }">
                {{ item.one_hour }}
              </div>
            </template>
          </v-data-table>
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
      title: `Chợ OTC Việt Nam | Ngoại tệ`,
    };
    return data;
  },
  data() {
    return {
      bank: [],
      world: [],
      market_force: [],
      headers: {
        bank: [
          { text: 'Tên', value: 'code', sortable: false },
          { text: 'Giá Mua', value: 'buy', sortable: false },
          { text: 'Chuyển Khoản', value: 'transfer', sortable: false },
          { text: 'Giá Bán', value: 'sell', sortable: false },
        ],
        world: [
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá', value: 'buy', sortable: false },
          { text: 'Thay đổi', value: 'change', sortable: false },
        ],
        market_force: [
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá', value: 'price', sortable: false },
          { text: '5m', value: 'five_minutes', sortable: false },
          { text: '15m', value: 'fifteen_minutes', sortable: false },
          { text: '1h', value: 'one_hour', sortable: false },
        ],
      },
      rate_tab: 0,
      page: {
        bank_rate: 1,
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
        },
        {
          title: "Chuyển khoản",
          value: "transfer"
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    convertHandle() {
      if (this.type == 'buy') {
        this.result = this.amount * Number(this.from.buy.replace(",", ""))
      }
      if (this.type == 'sell') {
        this.result = this.amount * Number(this.from.sell.replace(",", ""))
      }
      if (this.type == 'transfer') {
        this.result = this.amount * Number(this.from.transfer.replace(",", ""))
      }
      this.result = this.formatPrice(this.result)
    },
    refreshHandle(value) {
      if (value == 1) {
        this.bank = []
        this.world = []
        this.getBank();
        this.getWorld();
      }
      if (value == 4) {
        this.market_force = []
        this.getMarketForce();
      }
    },
    getList() {
      this.getBank();
      this.getWorld();
      this.getMarketForce();
    },
    getBank() {
      this.CallAPI("get", "rate/bank", {}, (res) => {
        this.bank = res.data;
        this.bank.unshift(res.data[19])
        this.bank.splice(-1)
        this.from = this.bank[0]
        this.convertHandle()
      });
    },
    getWorld() {
      this.CallAPI("get", "rate/world", {}, (res) => {
        this.world = res.data;
      });
    },
    getMarketForce() {
      this.CallAPI("get", "rate/market-force", {}, (res) => {
        this.market_force = res.data;
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