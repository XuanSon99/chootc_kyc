<template>
  <main class="home">
    <!-- <section class="note">
      <a href="https://t.me/chootcvn" target="_blank">
        Tham gia nhóm @chootcvn ngay để giao dịch OTC uy tín và nhanh chóng!
      </a>
    </section> -->
    <section>
      <div class="mowtainer">
        <div class="mowgrid">
          <div class="item pd-30">
            <table class="mowtable">
              <tr>
                <th>Tên</th>
                <th>Giá Mua</th>
                <th>Chuyển Khoản</th>
                <th>Giá Bán</th>
              </tr>
              <tr v-for="(item, index) in bank" :key="index">
                <td>{{ item.code }}</td>
                <td>{{ item.buy }}</td>
                <td>{{ item.transfer }}</td>
                <td>{{ item.sell }}</td>
              </tr>
            </table>
          </div>
          <div class="price-box">
            <h2>Thị trường Crypto</h2>
            <div class="head">
              <span>Tên</span>
              <span>Giá</span>
            </div>
            <div class="list">
              <div class="space" v-for="item in coin_list" :key="item.id">
                <div>
                  <img :src="item.image" alt="" />
                  <span class="name">{{ item.name }}</span>
                  <span class="symbol">{{ item.symbol }}</span>
                </div>
                <span>${{ item.current_price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item exchange">
          <div class="flex">
            <div
              :class="{ tab: true, active: tab == index }"
              v-for="(item, index) in tabs"
              :key="index"
              @click="tab = index"
            >
              {{ item }}
            </div>
          </div>
          <div class="pd-30" v-if="tab == 0">
            <label>Tôi muốn trả</label>
            <div class="input-box">
              <input
                type="text"
                v-model="buy_vnd"
                @input="buyVND"
                @focus="unFormatBuy"
                @blur="buy_vnd = formatPrice(buy_vnd)"
              />
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
            <p>Giá ước tính: 1 USDT ≈ {{ formatPrice(buy_price) }} VND</p>
            <div class="detail-price">
              <div class="item pd-30">
                <img src="/img/logo.png" alt="" />
                <h3>Chợ OTC</h3>
                <h4>
                  Giá mua:
                  <span>{{ formatPrice(buy_price) }} VND</span>
                </h4>
              </div>
              <div class="item pd-30">
                <img src="/img/binance.png" alt="" />
                <h3>P2P Binance</h3>
                <h4>
                  Giá mua:
                  <span>{{ formatPrice(buy_price + 5) }} VND</span>
                </h4>
              </div>
            </div>
            <a href="https://t.me/chootcvn" target="_blank" class="btn-all"
              >Mua miễn phí</a
            >
          </div>
          <div class="pd-30" v-else>
            <label>Tôi muốn bán</label>
            <div class="input-box">
              <input type="text" v-model="sell_usdt" @input="sellUSDT" />
              <div class="unit">
                <img src="/img/exchange/usdt.png" alt="" />
                <span>USDT</span>
              </div>
            </div>
            <label>Tôi sẽ nhận được≈</label>
            <div class="input-box">
              <input
                type="text"
                v-model="sell_vnd"
                @input="sellVND"
                @focus="unFormatSell"
                @blur="sell_vnd = formatPrice(sell_vnd)"
              />
              <div class="unit">
                <img src="/img/exchange/vnd.png" alt="" />
                <span>VND</span>
              </div>
            </div>
            <p>Giá ước tính: 1 USDT ≈ {{ formatPrice(sell_price) }} VND</p>
            <div class="detail-price">
              <div class="item pd-30">
                <img src="/img/logo.png" alt="" />
                <h3>Chợ OTC</h3>
                <h4 class="sell-price">
                  Giá bán:
                  <span>{{ formatPrice(sell_price) }} VND</span>
                </h4>
              </div>
              <div class="item pd-30">
                <img src="/img/binance.png" alt="" />
                <h3>P2P Binance</h3>
                <h4 class="sell-price">
                  Giá bán:
                  <span>{{ formatPrice(sell_price - 5) }} VND</span>
                </h4>
              </div>
            </div>
            <a
              href="https://t.me/chootcvn"
              target="_blank"
              class="btn-all btn-sell"
              >Bán miễn phí</a
            >
          </div>
        </div>
      </div>
    </section>
    <section id="partner">
      <div class="mowtainer">
        <h1 class="title">Đối tác</h1>
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
      coin_list: [],
      bank: [],
      sell_price: "",
      buy_price: "",
      tabs: ["Mua", "Bán"],
      tab: 0,
      buy_usdt: "",
      buy_vnd: 1000000,
      sell_usdt: 100,
      sell_vnd: "",
      exchanges: "",
    };
  },
  mounted() {
    this.getList();
    this.getPrice();
  },
  methods: {
    getList() {
      this.CallAPI("get", "coins", {}, (res) => {
        this.coin_list = res.data;
      });
      this.CallAPI("get", "exchanges", {}, (res) => {
        this.exchanges = res.data.slice(0, 19);
      });
      this.CallAPI("get", "rate/bank", {}, (res) => {
        this.bank = res.data;
      });
    },
    getPrice() {
      this.CallAPI("get", "p2p/buy", {}, (res) => {
        this.buy_price = Number(res.data.data[0].adv.price) - 5;
        this.buyVND();
        this.buy_vnd = this.formatPrice(this.buy_vnd);
      });
      this.CallAPI("get", "p2p/sell", {}, (res) => {
        this.sell_price = Number(res.data.data[0].adv.price) + 5;
        this.sellUSDT();
      });
    },
    buyUSDT() {
      this.buy_vnd = this.formatPrice(this.buy_usdt * this.buy_price);
    },
    buyVND() {
      this.buy_usdt = this.formatNumber(this.buy_vnd / this.buy_price);
    },
    sellUSDT() {
      this.sell_vnd = this.formatPrice(this.sell_usdt * this.sell_price);
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

<style>
</style>