<template>
  <div class="container mt-5">
    <router-link to="/addQuiz" class="btn btn-primary">Dodaj quiz</router-link>
    <h1 class="mt-3">Lista quizów</h1>
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
};
</script>

<style scoped></style>
