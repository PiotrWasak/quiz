<template>
  <div class="container mt-5">
    <h4>{{ quizData.title }}</h4>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getDocument } from "@/utils/readData";
import TakeQuizQuestion from "@/views/user/TakeQuizQuestion";

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
    console.log(maxPoints);
    this.$store.dispatch("RESET_QUIZ");
    this.$store.dispatch("SET_ACTIVE_QUIZ", this.id);
    this.$store.dispatch("SET_MAX_POINTS", maxPoints);
  },
};
</script>

<style scoped></style>
