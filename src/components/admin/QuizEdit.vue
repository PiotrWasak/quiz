<template>
  <div class="container">
    <h1>Edycja quizu</h1>
    <div class="row">
      <div class="col-4">Tytuł</div>
      <div class="col-8">{{ quiz.title }}</div>

      <quiz-edit-question v-for="question in quiz.questions" :key="question" :question="question"></quiz-edit-question>

    </div>
    {{ id }} - {{ quiz }}
  </div>
</template>

<script>
import QuizEditQuestion from "@/components/admin/QuizEditQuestion";
export default {
  name: "QuizEdit",
  components: { QuizEditQuestion },
  props: ["quizData", "id"],
  computed: {
    quiz() {
      return JSON.parse(this.quizData);
    },
  },
  mounted() {
    console.log(this.quiz.questions.length);
  }
};
</script>

<style scoped></style>
