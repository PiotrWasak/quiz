<template>
  <div class="container mt-5">
    <ejs-button @click="goToAddQuizView" cssClass="e-primary">Dodaj quiz</ejs-button>
    <h3 class="text-center">Lista quizów</h3>
    <quiz-list></quiz-list>

  </div>
</template>

<script>
import QuizList from "@/components/admin/QuizList";
export default {
  name: "ManageQuizzes",
  components: { QuizList },
  data() {
    return {

    };
  },
  methods: {
    goToAddQuizView() {
      this.$router.push("/addQuiz");
    }
  }
};
</script>

<style scoped></style>
