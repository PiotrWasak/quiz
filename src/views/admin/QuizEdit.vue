<template>
  <div class="container mt-5">
    <h1>Edytuj quiz: {{id}} - {{quizData.title}}</h1>

    <ejs-button @click="deleteQuiz" type="submit" cssClass="e-danger">
      Usuń quiz
    </ejs-button>

    <add-quiz-form :edit-quiz-data="quizData" mode="edit"></add-quiz-form>
  </div>
</template>

<script>
import QuizEditQuestion from "@/components/admin/QuizEditQuestion";
import { getDocument } from "@/utils/readData";
import { deleteDocument } from "@/utils/setData";
import AddQuizForm from "@/components/admin/AddQuizForm";
export default {
  name: "QuizEdit",
  components: { AddQuizForm },
  // components: { QuizEditQuestion },
  props: ["id"],
  data() {
    return{
      quizData: {},
    }
  },
  methods: {
    deleteQuiz() {
      console.log("delete quiz");
      deleteDocument("quiz", this.id);
    }
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
  },
};
</script>

<style scoped></style>