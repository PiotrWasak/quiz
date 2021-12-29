<template>
  <div class="container mt-5">
    <h3>Dodaj quiz</h3>
    <add-quiz-form mode="add"></add-quiz-form>
  </div>
</template>

<script>
import AddQuizForm from "@/components/admin/AddQuizForm";
export default {
  name: "AddQuiz",
  components: { AddQuizForm },
};
</script>

<style scoped></style>
