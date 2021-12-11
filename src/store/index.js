import { createStore } from "vuex";
import user from "./modules/user.js";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  plugins: [new VuexPersistence().plugin],
});
