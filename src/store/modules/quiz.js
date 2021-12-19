export default {
  state: {
    points: 0,
  },
  mutations: {
    STATE_ADD_POINT(state, payload) {
      state.points += payload;
    },
    STATE_RESET_POINTS(state) {
      state.points = 0;
    },
  },
  actions: {
    ADD_POINT(context, payload) {
      context.commit("STATE_ADD_POINT", payload);
    },
    RESET_POINTS(context) {
      context.commit("STATE_RESET_POINTS");
    },
  },
  getters: {
    points: (state) => state.points,
  },
};
