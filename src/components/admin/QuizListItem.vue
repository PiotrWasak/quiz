<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-8">{{ quiz.title }}</div>
      <div class="col-4"><button class="btn btn-warning">Edit</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizListItem",
  props: ['quiz']
};
</script>

<style scoped></style>
