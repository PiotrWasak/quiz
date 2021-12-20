export default {
  state: {
    points: 0,
    maxPoints: 0,
    activeQuiz: '',
    userAnswers: [],
  },
  mutations: {
    STATE_ADD_POINT(state, payload) {
      state.points += payload;
    },
    STATE_RESET_QUIZ(state) {
      state.points = 0;
      state.maxPoints = 0;
      state.activeQuiz = '';
      state.userAnswers = [];
    },
    STATE_SET_ACTIVE_QUIZ(state, payload){
      state.activeQuiz = payload;
    },
    STATE_ADD_USER_ANSWER(state, payload) {
      state.userAnswers.push(payload);
    },
    STATE_SET_MAX_POINTS(state, payload) {
      payload = parseInt(payload);
      state.maxPoints = payload;
    },
  },
  actions: {
    ADD_POINT(context, payload) {
      context.commit("STATE_ADD_POINT", payload);
    },
    RESET_QUIZ(context) {
      context.commit("STATE_RESET_QUIZ");
    },
    SET_ACTIVE_QUIZ(context, payload){
      context.commit("STATE_SET_ACTIVE_QUIZ", payload)
    },
    ADD_USER_ANSWER(context, payload){
      context.commit("STATE_ADD_USER_ANSWER", payload)
    },
    SET_MAX_POINTS(context, payload){
      context.commit("STATE_SET_MAX_POINTS", payload)
    }
  },
  getters: {
    points: (state) => state.points,
    maxPoints: (state) => state.maxPoints,
    activeQuiz: (state) => state.activeQuiz,
    userAnswers: (state) => state.userAnswers,
  },
};
