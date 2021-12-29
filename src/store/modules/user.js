export default {
  state: {
    userData: null,
    userRole: null,
  },
  mutations: {
    STATE_SET_USER_DATA(state, payload) {
      state.userData = payload;
    },
    STATE_SET_USER_ROLE(state, payload) {
      state.userRole = payload;
    },
  },
  actions: {
    SET_USER_DATA(context, payload) {
      context.commit("STATE_SET_USER_DATA", payload);
    },
    SET_USER_ROLE(context, payload) {
      context.commit("STATE_SET_USER_ROLE", payload);
    },
  },
  getters: {
    userData: (state) => state.userData,
    userRole: (state) => state.userRole,
  },
};
