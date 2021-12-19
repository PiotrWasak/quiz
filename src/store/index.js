import { createStore } from "vuex";
import user from "./modules/user.js";
import VuexPersistence from "vuex-persist";
import quiz from "@/store/modules/quiz";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    quiz
  },
  plugins: [new VuexPersistence().plugin],
});
