<template>
  <div class="container text-center">
    <div class="row">
      <h6>{{ questionData.question }}</h6>
    </div>
    <div class="row mt-5">
      <div
        class="col-md-6 mt-5"
        v-for="answer in questionData.answers"
        :key="answer"
        @click="submitAnswer(answer)"
      >
        {{ answer.answer }}
      </div>
    </div>
  </div>
</template>

<script>
import { getDocument } from "@/utils/readData";

export default {
  name: "TakeQuizQuestion",
  props: ["id", "questionIndex"],
  data() {
    return {
      questionData: {},
      quizData: {},
      pointWeight: 1,
    };
  },
  methods: {
    submitAnswer(answer) {
      this.$store.dispatch("ADD_USER_ANSWER", answer);
      if (answer.isTrue) {
        this.$store.dispatch("ADD_POINT", parseInt(this.questionData.weight));
      }
      if (this.questionIndex < this.quizData.questions.length) {
        this.$router.replace(
          `/quiz/${this.id}/${parseInt(this.questionIndex) + 1}`
        );
        this.questionData = this.quizData.questions[this.questionIndex];
      } else {
        console.log(
          "Quiz finnished. Your points: ",
          this.$store.getters.points
        );
        this.$router.replace("/quizSummary");
      }
    },
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
    this.questionData = this.quizData.questions[this.questionIndex - 1];
  },
};
</script>

<style scoped></style>
