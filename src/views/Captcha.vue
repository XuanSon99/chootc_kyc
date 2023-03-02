<template>
  <main>
    <div class="noti">
      <vue-recaptcha :sitekey="sitekey" @verify="verify"> </vue-recaptcha>
    </div>
  </main>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  data() {
    return {
      sitekey: "6LdJZsgjAAAAAESlgW4p3tfQKHT5JFJnh1MAKtJb",
    };
  },
  methods: {
    verify(res) {
      if (!res) return;
      const chat_id = this.$route.params.id.split("-")[1];
      const username = this.$route.params.id.split("-")[0];

      this.CallAPI(
        "post",
        "captcha",
        { username: username, chat_id: chat_id },
        (res) => {}
      );
    },
  },
};
</script>

<style>
</style>