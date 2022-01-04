<template>
  <div class="background">
    <div class="container card-container">
      <div tabindex="0" class="e-card" id="basic">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title">{{ quizData.title }}</div>
          </div>
        </div>
        <div class="e-card-content">
          <ejs-progressbar
            v-if="quizData"
            type="Linear"
            :minimum="0"
            :segmentCount="3"
            :gapWidth="30"
            :maximum="quizData?.questions?.length"
            :value="$route?.params?.questionIndex - 1"
            progressColor="#ef4f10"
          ></ejs-progressbar>
          <router-view></router-view>
        </div>
      </div>
      <div class="container mt-5"></div>
    </div>
  </div>
  <base-dialog
    @confirm="leaveRoute"
    ref="leaveQuizDialog"
    content="Czy chcesz opuścić quiz?"
  ></base-dialog>
</template>

<script>
import { getDocument } from "@/utils/readData";
import BaseDialog from "../../components/UI/BaseDialog";

export default {
  name: "TakeQuiz",
  components: { BaseDialog },
  props: ["id"],
  data() {
    return {
      quizData: {},
      numberOfPoints: 0,
      confirmLeave: false,
      to: null,
    };
  },
  methods: {
    leaveRoute() {
      this.confirmLeave = true;
      this.$router.push(this.to);
    },
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
    let maxPoints = 0;
    this.quizData.questions.forEach((question) => {
      maxPoints += +question.weight;
    });
    this.$store.dispatch("RESET_QUIZ");
    this.$store.dispatch("SET_ACTIVE_QUIZ", this.id);
    this.$store.dispatch("SET_MAX_POINTS", maxPoints);
  },
  beforeRouteLeave(to, from) {
    if (to.name === "QuizSummary") return true;
    this.$refs.leaveQuizDialog.showDialog();
    this.to = to;
    if (!this.confirmLeave) return false;
    // const answer = window.confirm('Czy opuścić quiz?')
    // if (!answer) return false
  },
};
</script>

<style scoped>
.card-container {
  height: calc(100vh - 16em);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.background {
  height: calc(100vh - 60px);
  background: url("../../assets/images/quiz.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
