import { createStore } from "vuex";
import user from "./modules/user.js";
import VuexPersistence from "vuex-persist";
import quiz from "@/store/modules/quiz";

const vuexPersist = new VuexPersistence({
  storage: window.sessionStorage,
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    quiz,
  },
  plugins: [vuexPersist.plugin],
});
