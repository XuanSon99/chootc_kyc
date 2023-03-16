<template>
  <v-app data-app>
    <Header v-if="$route.meta.header" />
    <router-view />
    <Footer v-if="$route.meta.header" />
  </v-app>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>
<style>
#app {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #fff;
}

.theme--dark.v-tabs>.v-tabs-bar,
.theme--dark.v-tabs-items,
.theme--dark.v-data-table {
  background: none !important;
}

.theme--dark.v-application {
  background: #000211 !important;
}</style>
