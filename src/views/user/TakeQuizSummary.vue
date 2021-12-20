<template>
  <div class="container">
    <h4>Gratulacje! Twój wynik: {{ scorePercent }}%</h4>
    <p>Twoja ilość punktów: {{points}}</p>
    <p>Maksymalna ilość punktów: {{maxPoints}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addData } from "@/utils/setData";
import { Timestamp } from "firebase/firestore";

export default {
  name: "TakeQuizSummary",
  computed: {
    ...mapGetters(["points", "activeQuiz", "userData", "userAnswers", "maxPoints"]),
    scorePercent() {
      return Math.round( (this.points/this.maxPoints)*100);
    }
  },
  created() {
    const userQuizData = {
      quizId: this.activeQuiz,
      userId: this.userData.uid,
      answers: this.userAnswers,
      scorePoints: this.points,
      maxPoints: this.maxPoints,
      scorePercent: this.scorePercent,
      createAt: Timestamp.now(),
    }
    addData("userAnsewers", userQuizData)
  }
};
</script>

<style scoped></style>
