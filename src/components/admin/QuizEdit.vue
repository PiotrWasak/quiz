<template>
  <div class="container">
    {{ quizData }}
    <h1>Edycja quizu</h1>
    <div class="row">
      <div class="col-4">Tytuł</div>
      {{ quizData.title }}

      <!--      <quiz-edit-question v-for="question in quizData.questions" :key="question" :question="question"></quiz-edit-question>-->
    </div>
  </div>
</template>

<script>
import QuizEditQuestion from "@/components/admin/QuizEditQuestion";
import { getDocument } from "@/utils/readData";
export default {
  name: "QuizEdit",
  // components: { QuizEditQuestion },
  props: ["id"],
  data() {
    return{
      quizData: {},
    }
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
  },
};
</script>

<style scoped></style>