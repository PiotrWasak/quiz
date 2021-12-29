<template>
  <div class="container mt-5">
    <ejs-button @click="goToAddQuizView" cssClass="e-primary"
      ><font-awesome-icon icon="plus"></font-awesome-icon> Dodaj
      quiz</ejs-button
    >
    <h3 class="text-center">
      <font-awesome-icon icon="list-alt"></font-awesome-icon> Lista quizów
    </h3>
    <quiz-list></quiz-list>
  </div>
</template>

<script>
import QuizList from "@/components/admin/QuizList";
import CsvImportExport from "@/components/admin/ExportQuiz.vue";
import ImportQuiz from "@/components/admin/ImportQuiz";
export default {
  name: "ManageQuizzes",
  components: { QuizList },
  data() {
    return {};
  },
  methods: {
    goToAddQuizView() {
      this.$router.push("/addQuiz");
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>
