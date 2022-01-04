<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col">
        <h4>{{ question.pytanie }}</h4>
      </div>
    </div>
    <quiz-edit-answer
      class="row"
      v-for="answer in question.answers"
      :key="answer"
      :answer="answer"
    >
    </quiz-edit-answer>
  </div>
</template>

<script>
import QuizEditAnswer from "@/components/admin/EditQuizAnswer";
export default {
  name: "QuizEditQuestion",
  components: { QuizEditAnswer },
  props: ["question"],
};
</script>

<style scoped></style>
