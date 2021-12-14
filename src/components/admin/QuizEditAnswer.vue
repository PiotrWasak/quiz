<template>
  <div class="row">
    <div class="col-md-6">{{ answer.answer }}</div>
    <div class="col-md-6">
      <input
        class="form-check-input"
        type="checkbox"
        ref="isCorrectCheckbox"
        @click="isCorrectCheckboxClick"
        id="isCorrectCheckbox"
        :checked="answer.isTrue"
      />
      <label class="form-check-label" for="isCorrectCheckbox">
        Default checkbox
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizEditAnswer",
  props: ["answer"],
  methods: {
    isCorrectCheckboxClick() {
      console.log(this.$refs.isCorrectCheckbox.checked);
    }
  }
};
</script>

<style scoped></style>
