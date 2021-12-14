<template>
  <div class="container" v-if="quizData">
    <quiz-list-item v-for="quiz in quizData" :key="quiz.id" :quiz="quiz"></quiz-list-item>
  </div>
</template>

<script>
import QuizListItem from "@/components/admin/QuizListItem";
import getData from "@/utils/readData";
export default {
  name: "QuizList",
  components: { QuizListItem },
  data() {
    return{
      quizData: null,
    }
  },
  mounted() {
    const getQuizData = async () => {
      this.quizData = await getData("quiz");
    }
    getQuizData();
  },
};
</script>

<style scoped></style>
