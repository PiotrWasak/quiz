<template>
  <div class="container">
    <button class="btn btn-primary">Add quiz</button>
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
