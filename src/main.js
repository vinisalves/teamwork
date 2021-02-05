import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "@/plugins/axios.js";
import "@/plugins/filters.js";

Vue.prototype.$axios = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
