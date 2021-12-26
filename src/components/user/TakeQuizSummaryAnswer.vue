<template>
  <div class="row mt-3">
    <div class="col-md-6"><strong>Twoja odpowiedź:</strong></div>
    <div class="col-md-6"><strong>Prawidłowa odpowiedź:</strong></div>
  </div>
  <div class="row mt-3">
    <div class="col-md-6">{{ userAnswer }}</div>
    <div class="col-md-6">{{ correctAnswer }}</div>
  </div>
</template>

<script>
export default {
  name: "TakeQuizSummaryAnswer",
  props: {
    userAnswer: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
