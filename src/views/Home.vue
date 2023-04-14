<template>
  <main class="home">
    <section class="banner">
      <div class="mowtainer">
        <div class="space">
          <div class="content">
            <h1>
              Cập nhật
              <br>
              <span>tỷ giá</span> & <span>tin tức
                <br>
                thị trường</span> nhanh chóng
            </h1>
          </div>
          <div class="image">
            <img src="/img/home/banner.gif" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="relative">
      <div class="mowtainer">
        <div class="mowgrid grid-top">
          <div class="item exchange">
            <div class="flex">
              <div :class="{ tab: true, active: tab == index }" v-for="(item, index) in tabs" :key="index"
                @click="tab = index">
                {{ item }}
              </div>
            </div>
            <div class="pd-30" v-if="tab == 0">
              <label>Tôi muốn trao đổi</label>
              <div class="input-box">
                <input type="text" class="exchange-input" v-model="buy_vnd" @input="buyVND" @focus="unFormatBuy"
                  @blur="buy_vnd = formatVNPrice(buy_vnd)" />
                <div class="unit">
                  <v-select class="mt-7" dense solo :items="p2p_currency_list" v-model="p2p_currency.buy">
                    <template slot="selection" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.png'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.png'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                  </v-select>
                </div>
              </div>
              <label>Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" class="exchange-input" v-model="buy_usdt" @input="buyUSDT" />
                <div class="unit">
                  <v-select class="mt-7" dense solo :items="p2p_token_list" v-model="p2p_token.buy">
                    <template slot="selection" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.svg'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.svg'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="d-flex align-center">
                <span>Giá ước tính: 1 {{ p2p_token.buy.toUpperCase() }} ≈ {{ formatPrice(buy_price) }} {{
                  p2p_currency.buy.toUpperCase() }}</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(2)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <div class="detail-price">
                <div class="item">
                  <img src="/img/logo.png" alt="" />
                  <h3>Chợ OTC VN</h3>
                  <h4>
                    <span>Giá mua:</span>
                    <b v-if="p2p_token.buy == 'usdt' && p2p_currency.buy == 'vnd'">{{ formatVNPrice(buy_price) }}</b>
                    <b v-else>{{ formatPrice(buy_price) }}</b>
                  </h4>
                </div>
                <div class="item">
                  <img src="/img/binance.png" alt="" />
                  <h3>P2P Binance</h3>
                  <h4>
                    <span>Giá mua:</span>
                    <b v-if="p2p_token.buy == 'usdt' && p2p_currency.buy == 'vnd'">{{ formatVNPrice(buy_price + 5) }}</b>
                    <b v-else>{{ formatPrice(buy_price) }}</b>
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all">Mua miễn phí</a>
            </div>
            <div class="pd-30" v-else>
              <label>Tôi muốn trao đổi</label>
              <div class="input-box">
                <input type="text" class="exchange-input" v-model="sell_usdt" @input="sellUSDT" />
                <div class="unit">
                  <v-select class="mt-7" dense solo :items="p2p_token_list" v-model="p2p_token.sell">
                    <template slot="selection" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.svg'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.svg'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                  </v-select>
                </div>
              </div>
              <label>Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" class="exchange-input" v-model="sell_vnd" @input="sellVND" @focus="unFormatSell"
                  @blur="sell_vnd = formatVNPrice(sell_vnd)" />
                <div class="unit">
                  <v-select class="mt-7" dense solo :items="p2p_currency_list" v-model="p2p_currency.sell">
                    <template slot="selection" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.png'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <img :src="'/img/p2p/' + data.item + '.png'" alt="">
                      {{ data.item.toUpperCase() }}
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="d-flex align-center">
                <span>Giá ước tính: 1 {{ p2p_token.sell.toUpperCase() }} ≈ {{ formatPrice(sell_price) }} {{
                  p2p_currency.sell.toUpperCase() }}</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(2)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <div class="detail-price">
                <div class="item">
                  <img src="/img/logo.png" alt="" />
                  <h3>Chợ OTC</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    <b v-if="p2p_token.sell == 'usdt' && p2p_currency.sell == 'vnd'">{{ formatVNPrice(sell_price) }}</b>
                    <b v-else>{{ formatPrice(sell_price) }}</b>
                  </h4>
                </div>
                <div class="item">
                  <img src="/img/binance.png" alt="" />
                  <h3>P2P Binance</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    <b v-if="p2p_token.sell == 'usdt' && p2p_currency.sell == 'vnd'">{{ formatVNPrice(sell_price - 5)
                    }}</b>
                    <b v-else>{{ formatPrice(sell_price) }}</b>
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all btn-sell">Bán miễn phí</a>
            </div>
          </div>
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
                <v-data-table :headers="headers.bank" :items="bank" :page.sync="page.bank_rate" :items-per-page="9"
                  hide-default-footer :mobile-breakpoint="0">
                  <template v-slot:[`item.buy`]="{ item }">
                    <span class="up-color">{{ item.buy }}</span>
                  </template>
                  <template v-slot:[`item.sell`]="{ item }">
                    <span class="down-color">{{ item.sell }}</span>
                  </template>
                </v-data-table>
                <v-pagination class="pt-3" v-model="page.bank_rate" :length="Math.ceil(bank.length / 9)">
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
        </div>
        <div class="mowgrid grid-bot mt-8">
          <div class="vertical-news">
            <div class="space mb-6">
              <div class="mowtit">
                <span>Hướng dẫn người mới</span>
              </div>
              <v-btn icon color="primary" to="/tin-tuc/huong-dan-nguoi-moi">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
            <div class="item-news mt-5" v-for="(item, index) in tutorial_post" :key="index">
              <div class="image" @click="toDetail(item.slug)">
                <img :src="image(item.image)" alt="">
              </div>
              <div class="content">
                <h3 @click="toDetail(item.slug)">{{ item.title }}</h3>
                <span><i class="far fa-calendar-alt"></i> {{ formatTime(item.created_at) }} </span>
              </div>
            </div>
          </div>
          <div class="item pd-30">
            <div class="space mb-2">
              <div class="mowtit">
                <span>Giá vàng</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(5)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-btn text to="/gia-vang">
                Quy đổi
                <v-icon class="ml-1" size="20" color="primary">
                  mdi-arrow-right
                </v-icon>
              </v-btn>
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
        </div>
      </div>
      <div class="planet"></div>
      <div class="bgr-planet"></div>
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
    <section class="relative mb-8">
      <div class="mowtainer">
        <div class="mowgrid grid-2 mt-8">
          <div class="item pd-30">
            <div class="space">
              <div class="mowtit">
                <span>Crypto</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(3)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-responsive max-width="220">
                <v-text-field v-model="search" label="Tìm kiếm" append-icon="mdi-magnify"></v-text-field>
              </v-responsive>
            </div>
            <v-data-table :headers="headers.crypto" :items="coin_list" :search="search" :page.sync="page.usdt_crypto"
              :items-per-page="17" hide-default-footer :mobile-breakpoint="0">
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
                {{ formatPrice(item.current_price) }}
              </template>
            </v-data-table>
            <v-pagination class="pt-3" v-model="page.usdt_crypto" :length="Math.ceil(coin_list.length / 17)">
            </v-pagination>
          </div>
          <div>
            <div class="item pd-30 mb-8">
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
            <div class="item pd-30">
              <div class="space">
                <div class="mowtit mb-2">
                  <span>Chứng khoán</span>
                  <v-btn icon color="primary" class="ml-2" @click="refreshHandle(6)">
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
              </v-data-table>
              <v-pagination class="pt-3" v-model="page.stock" :length="Math.ceil(stock.length / 7)">
              </v-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="earth"></div>
    </section>
    <!-- <section id="partner">
      <div class="mowtainer">
        <div class="mowtit big-title">
          Đối tác
        </div>
        <div class="mowgrid">
          <div class="image part">
            <img src="img/partner/1.png" alt="" />
            <h3>CoinGo24</h3>
          </div>
          <div class="image" v-for="(item, index) in exchanges" :key="index">
            <img :src="item.image" alt="" />
            <h3>{{ item.name.replace("Exchange", "") }}</h3>
          </div>
        </div>
      </div>
    </section> -->
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
      coin_list: [],
      bank: [],
      world: [],
      gold: [],
      market_force: [],
      stock: [],
      sell_price: "",
      buy_price: "",
      tabs: ["Mua", "Bán"],
      tab: 0,
      buy_usdt: "",
      buy_vnd: 10000000,
      sell_usdt: 100,
      sell_vnd: "",
      exchanges: "",
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
        crypto: [
          { text: 'Tên', value: 'symbol', sortable: false },
          { text: 'Giá', value: 'current_price', sortable: false },
          { text: 'Thay đổi', value: 'price_change_percentage_24h' },
        ],
        gold: [
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá Mua', value: 'buy', sortable: false },
          { text: 'Giá Bán', value: 'sell', sortable: false },
        ],
        market_force: [
          { text: 'Tên', value: 'name', sortable: false },
          { text: 'Giá', value: 'price', sortable: false },
          { text: '5m', value: 'five_minutes', sortable: false },
          { text: '15m', value: 'fifteen_minutes', sortable: false },
          { text: '1h', value: 'one_hour', sortable: false },
        ],
        stock: [
          { text: 'Tên', value: 'code', sortable: false },
          { text: 'Giá', value: 'price', sortable: false },
          { text: 'Biến động', value: 'change', sortable: false },
        ],
      },
      rate_tab: 0,
      page: {
        usdt_crypto: 1,
        bank_rate: 1,
        gold: 1,
        stock: 1
      },
      tutorial_post: [],
      market_post: [],
      p2p_token: {
        buy: "usdt",
        sell: "usdt"
      },
      p2p_token_list: ["usdt", "btc", "eth", "busd", "bnb", "ada"],
      p2p_currency: {
        buy: "vnd",
        sell: "vnd"
      },
      p2p_currency_list: ["vnd", "aud", "cad", "cny", "eur", "jpy"],
    };
  },
  mounted() {
    this.getList();
    this.getBuyPrice();
    this.getSellPrice();
    this.getPost();
  },
  methods: {
    getPost() {
      this.CallAPI(
        "get",
        "categories/huong-dan-nguoi-moi",
        {},
        (res) => {
          this.tutorial_post = res.data.reverse().slice(0, 4);
        }
      );
      this.CallAPI(
        "get",
        "categories/tin-tuc-thi-truong",
        {},
        (res) => {
          this.market_post = res.data;
        }
      );
    },
    refreshHandle(value) {
      if (value == 1) {
        this.bank = []
        this.world = []
        this.getBank();
        this.getWorld();
      }
      if (value == 2) {
        this.getBuyPrice();
        this.getSellPrice();
      }
      if (value == 3) {
        this.coin_list = []
        this.getCoin();
      }
      if (value == 4) {
        this.market_force = []
        this.getMarketForce();
      }
      if (value == 5) {
        this.gold = []
        this.getGold();
      }
      if (value == 6) {
        this.stock = []
        this.getStock();
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async getList() {
      this.CallAPI("get", "exchanges", {}, (res) => {
        this.exchanges = res.data.slice(0, 19);
      });
      this.getCoin();
      this.getBank();
      this.getWorld();
      this.getMarketForce();
      this.getGold();
      await this.sleep(3000);
      this.getStock();
    },
    getCoin() {
      this.CallAPI("get", "coins", {}, (res) => {
        this.coin_list = res.data;
      });
    },
    getBank() {
      this.CallAPI("get", "rate/bank", {}, (res) => {
        this.bank = res.data;
        this.bank.unshift(res.data[19])
        this.bank.splice(-1)
      });
    },
    getWorld() {
      this.CallAPI("get", "rate/world", {}, (res) => {
        this.world = res.data;
      });
    },
    getGold() {
      this.CallAPI("get", "rate/gold", {}, (res) => {
        this.gold = res.data;
      });
    },
    getMarketForce() {
      this.CallAPI("get", "rate/market-force", {}, (res) => {
        this.market_force = res.data;
      });
    },
    getStock() {
      this.CallAPI("get", "rate/stock", {}, (res) => {
        this.stock = res.data;
      });
    },
    getBuyPrice() {
      this.buy_price = 0
      const buy_params = `p2p?type=buy&asset=${this.p2p_token.buy}&fiat=${this.p2p_currency.buy}&page=1`
      this.CallAPI("get", buy_params, {}, (res) => {
        this.buy_price = Number(res.data.data[4].adv.price);
        if (this.p2p_token.buy == 'usdt' && this.p2p_currency.buy == 'vnd') {
          this.buy_price = Number(res.data.data[4].adv.price) - 5;
        }
        this.buyVND();
        if (this.buy_vnd.toString().includes(",")) return
        this.buy_vnd = this.formatVNPrice(this.buy_vnd);
      });
    },
    getSellPrice() {
      this.sell_price = 0
      const sell_params = `p2p?type=sell&asset=${this.p2p_token.sell}&fiat=${this.p2p_currency.sell}&page=1`
      this.CallAPI("get", sell_params, {}, (res) => {
        this.sell_price = Number(res.data.data[4].adv.price);
        if (this.p2p_token.sell == 'usdt' && this.p2p_currency.sell == 'vnd') {
          this.sell_price = Number(res.data.data[4].adv.price) + 5;
        }
        this.sellUSDT();
      });
    },
    buyUSDT() {
      this.buy_vnd = this.formatVNPrice(this.buy_usdt * this.buy_price);
    },
    buyVND() {
      let buy_vnd = this.buy_vnd
      if (this.buy_vnd.toString().includes(",")) {
        buy_vnd = this.buy_vnd.replaceAll(",", "");
      }
      this.buy_usdt = this.formatNumber(buy_vnd / this.buy_price);
    },
    sellUSDT() {
      this.sell_vnd = this.formatVNPrice(this.sell_usdt * this.sell_price);
    },
    sellVND() {
      this.sell_usdt = this.formatNumber(this.sell_vnd / this.sell_price);
    },
    unFormatBuy() {
      this.buy_vnd = this.buy_vnd.replaceAll(",", "");
    },
    unFormatSell() {
      this.sell_vnd = this.sell_vnd.replaceAll(",", "");
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
  watch: {
    "p2p_token.buy"() {
      this.getBuyPrice()
    },
    "p2p_currency.buy"() {
      this.getBuyPrice()
    },
    "p2p_token.sell"() {
      this.getSellPrice()
    },
    "p2p_currency.sell"() {
      this.getSellPrice()
    },
  }
};
</script>

<style></style>