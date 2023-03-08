<template>
  <main class="home">
    <section>
      <div class="mowtainer">
        <div class="mowgrid grid-top">
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
                  hide-default-footer>
                  <template v-slot:[`item.buy`]="{ item }">
                    <span class="up-color">{{ item.buy }}</span>
                  </template>
                  <template v-slot:[`item.sell`]="{ item }">
                    <span class="down-color">{{ item.buy }}</span>
                  </template>
                </v-data-table>
                <v-pagination class="pt-3" v-model="page.bank_rate" :length="Math.ceil(bank.length / 9)">
                </v-pagination>
              </v-tab-item>
              <v-tab-item>
                <v-data-table :headers="headers.world" :items="world" hide-default-footer>
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
                <input type="text" v-model="buy_vnd" @input="buyVND" @focus="unFormatBuy"
                  @blur="buy_vnd = formatVNPrice(buy_vnd)" />
                <div class="unit">
                  <img src="/img/exchange/vnd.png" alt="" />
                  <span>VND</span>
                </div>
              </div>
              <label>Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" v-model="buy_usdt" @input="buyUSDT" />
                <div class="unit">
                  <img src="/img/exchange/usdt.png" alt="" />
                  <span>USDT</span>
                </div>
              </div>
              <p>Giá ước tính: 1 USDT ≈ {{ formatVNPrice(buy_price) }}</p>
              <div class="detail-price">
                <div class="item">
                  <img src="/img/logo.png" alt="" />
                  <h3>Chợ OTC VN</h3>
                  <h4>
                    <span>Giá mua:</span>
                    {{ formatVNPrice(buy_price) }}
                  </h4>
                </div>
                <div class="item">
                  <img src="/img/binance.png" alt="" />
                  <h3>P2P Binance</h3>
                  <h4>
                    <span>Giá mua:</span>
                    {{ formatVNPrice(buy_price + 5) }}
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all">Mua miễn phí</a>
            </div>
            <div class="pd-30" v-else>
              <label>Tôi muốn trao đổi</label>
              <div class="input-box">
                <input type="text" v-model="sell_usdt" @input="sellUSDT" />
                <div class="unit">
                  <img src="/img/exchange/usdt.png" alt="" />
                  <span>USDT</span>
                </div>
              </div>
              <label>Tôi sẽ nhận được≈</label>
              <div class="input-box">
                <input type="text" v-model="sell_vnd" @input="sellVND" @focus="unFormatSell"
                  @blur="sell_vnd = formatVNPrice(sell_vnd)" />
                <div class="unit">
                  <img src="/img/exchange/vnd.png" alt="" />
                  <span>VND</span>
                </div>
              </div>
              <p>Giá ước tính: 1 USDT ≈ {{ formatVNPrice(sell_price) }}</p>
              <div class="detail-price">
                <div class="item">
                  <img src="/img/logo.png" alt="" />
                  <h3>Chợ OTC</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    {{ formatVNPrice(sell_price) }}
                  </h4>
                </div>
                <div class="item">
                  <img src="/img/binance.png" alt="" />
                  <h3>P2P Binance</h3>
                  <h4 class="sell-price">
                    <span>Giá bán:</span>
                    {{ formatVNPrice(sell_price - 5) }}
                  </h4>
                </div>
              </div>
              <a href="https://t.me/chootcvn" target="_blank" class="btn-all btn-sell">Bán miễn phí</a>
            </div>
          </div>
        </div>
        <div class="mowgrid grid-bot mt-8">
          <div class="item pd-30">
            <div class="space">
              <div class="mowtit">
                <span>Crypto</span>
                <v-btn icon color="primary" class="ml-2" @click="refreshHandle(2)">
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </div>
              <v-responsive max-width="220">
                <v-text-field v-model="search" label="Tìm kiếm" append-icon="mdi-magnify"></v-text-field>
              </v-responsive>
            </div>
            <div>
              <v-data-table :headers="headers.crypto" :items="coin_list" :search="search" :page.sync="page.usdt_crypto"
                :items-per-page="18" hide-default-footer>
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
              <v-pagination class="pt-3" v-model="page.usdt_crypto" :length="Math.ceil(coin_list.length / 10)">
              </v-pagination>
            </div>
          </div>
          <div>
            <div class="item pd-30 mb-8">
              <div class="space">
                <div class="mowtit mb-2">
                  <span>Lực thị trường</span>
                  <v-btn icon color="primary" class="ml-2" @click="refreshHandle(3)">
                    <v-icon>mdi-cached</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-data-table class="market-force" :headers="headers.market_force" :items="market_force"
                hide-default-footer>
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
                  <span>Giá vàng</span>
                  <v-btn icon color="primary" class="ml-2" @click="refreshHandle(4)">
                    <v-icon>mdi-cached</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-data-table class="gold-price" :headers="headers.gold" :items="gold" hide-default-footer>
                <template v-slot:[`item.buy`]="{ item }">
                  {{ item.buy }}
                  <span v-if="item.buy_change"
                    :class="{ 'price-up': item.buy_change > 0 ? true : false, 'price-down': item.buy_change < 0 ? true : false }">
                    {{ Math.abs(item.buy_change) }}
                  </span>
                </template>
                <template v-slot:[`item.sell`]="{ item }">
                  {{ item.sell }}
                  <span
                    :class="{ 'price-up': item.sell_change > 0 ? true : false, 'price-down': item.sell_change < 0 ? true : false }">
                    {{ Math.abs(item.sell_change) }}
                  </span>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="partner">
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
    </section>
  </main>
</template>

<script>
import axios from "axios";
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
      sell_price: "",
      buy_price: "",
      tabs: ["Mua", "Bán"],
      tab: 0,
      buy_usdt: "",
      buy_vnd: 1000000,
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
      },
      rate_tab: 0,
      page: {
        usdt_crypto: 1,
        bank_rate: 1
      }
    };
  },
  mounted() {
    this.getList();
    this.getPrice();
  },
  methods: {
    refreshHandle(value) {
      if (value == 1) {
        this.bank = []
        this.world = []
        this.getBank();
        this.getWorld();
      }
      if (value == 2) {
        this.coin_list = []
        this.getCoin();
      }
      if (value == 3) {
        this.market_force = []
        this.getMarketForce();
      }
      if (value == 4) {
        this.gold = []
        this.getGold();
      }
    },
    getList() {
      this.CallAPI("get", "exchanges", {}, (res) => {
        this.exchanges = res.data.slice(0, 19);
      });
      this.getCoin();
      this.getBank();
      this.getWorld();
      this.getGold();
      this.getMarketForce();
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
    getPrice() {
      this.CallAPI("get", "p2p/buy", {}, (res) => {
        this.buy_price = Number(res.data.data[0].adv.price) - 5;
        this.buyVND();
        this.buy_vnd = this.formatVNPrice(this.buy_vnd);
      });
      this.CallAPI("get", "p2p/sell", {}, (res) => {
        this.sell_price = Number(res.data.data[0].adv.price) + 5;
        this.sellUSDT();
      });
    },
    buyUSDT() {
      this.buy_vnd = this.formatVNPrice(this.buy_usdt * this.buy_price);
    },
    buyVND() {
      this.buy_usdt = this.formatNumber(this.buy_vnd / this.buy_price);
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
  },
};
</script>

<style></style>