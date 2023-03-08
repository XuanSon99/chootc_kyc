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
  color: #1E2329;
}
</style>
