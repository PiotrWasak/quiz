<template>
  <div class="container card-container">
      <div tabindex="0" class="e-card" id="basic">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title">{{ quizData.title }}</div>
          </div>
        </div>
        <div class="e-card-content">
          <router-view></router-view>
        </div>
      </div>
    <div class="container mt-5">

    </div>
  </div>
</template>

<script>
import { getDocument } from "@/utils/readData";
import TakeQuizQuestion from "@/views/user/TakeQuizQuestion";
import BaseDialog from "../../components/UI/BaseDialog";

export default {
  name: "TakeQuiz",
  props: ["id"],
  data() {
    return {
      quizData: {},
      numberOfPoints: 0,
    };
  },
  async created() {;
    this.quizData = await getDocument("quiz", this.id);
    let maxPoints = 0;
    this.quizData.questions.forEach(question => {
      maxPoints += +question.weight;
    })
    this.$store.dispatch("RESET_QUIZ");
    this.$store.dispatch("SET_ACTIVE_QUIZ", this.id);
    this.$store.dispatch("SET_MAX_POINTS", maxPoints);
  },

};
</script>

<style scoped>
.card-container{
  margin-top: 10vh;
}
</style>
