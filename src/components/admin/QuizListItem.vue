<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-8">{{ quiz.data.title }}</div>
      <div class="col-4">
        <button @click="editQuiz" class="btn btn-warning">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizListItem",
  props: ["quiz"],
  methods: {
    editQuiz() {
      let objectToString = JSON.stringify(this.quiz.data);
      this.$router.push({ name: "QuizEdit", params: { id: this.quiz.id, quizData: objectToString } });
    },
  },
};
</script>

<style scoped></style>
