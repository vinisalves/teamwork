import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: false
  },
  mutations: {
    setAppLoading(state, appLoading) {
      state.appLoading = appLoading;
    }
  },
  actions: {},
  modules: {}
});
