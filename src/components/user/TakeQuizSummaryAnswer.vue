<template>
  <div class="row mt-3">
    <div class="col-12">
      <span class="question-text"> {{ questionText }} </span>
    </div>
  </div>
  <div class="row mt-1">
    <div class="col-12">
      <span class="weight-text muted"> Waga: {{ questionWeight }} </span>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-md-6"><strong>Twoja odpowiedź:</strong></div>
    <div class="col-md-6"><strong>Prawidłowa odpowiedź:</strong></div>
  </div>
  <div class="row mt-3">
    <div class="col-md-6">
      <p
        v-for="(answer, index) in userAnswer"
        :key="index"
        :class="[{ 'e-success': answer.isTrue, 'e-error': !answer.isTrue }]"
      >
        {{ answer.answer }}
      </p>
    </div>
    <div class="col-md-6">
      <p v-for="(correctAnswer, index) in correctAnswer" :key="index">
        {{ correctAnswer }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TakeQuizSummaryAnswer",
  props: {
    userAnswer: {
      type: Array,
      required: true,
    },
    correctAnswer: {
      type: Array,
      required: true,
    },
    questionWeight: {
      required: true,
    },
    questionText: {
      required: true,
    },
  },
};
</script>

<style scoped>
.weight-text {
  font-size: 12px;
  color: rgb(173, 173, 173);
}
.question-text {
  font-size: 1.4em;
}
</style>