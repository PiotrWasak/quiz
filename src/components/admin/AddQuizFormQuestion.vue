<template>
  <div class="row mt-3">
    <div class="col-md-2"><label>Pytanie</label></div>
    <div class="col-md-10">
      <textarea type="text" class="form-control"></textarea>
    </div>
  </div>
  <h3 class="text-center mt-3">Odpowiedzi</h3>
  <div v-for="index in numberOfAnswers" :key="index" class="row mt-3">
    <div class="input-group">
      <span class="input-group-text">{{ index }}</span>
      <textarea class="form-control" :aria-label="index"></textarea>
    </div>
  </div>
  <div class="text-center mt-3">
    <font-awesome-icon
      v-if="numberOfAnswers < 8"
      @click="addAnswer"
      class="icon"
      icon="plus-circle"
    ></font-awesome-icon>
    <font-awesome-icon
      v-if="numberOfAnswers > 2"
      @click="removeAnswer"
      class="icon"
      icon="minus-circle"
    ></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: "AddQuizFormQuestion",
  data() {
    return {
      numberOfAnswers: 2,
    };
  },
  methods: {
    addAnswer() {
      if (this.numberOfAnswers < 8) {
        this.numberOfAnswers++;
      }
    },
    removeAnswer() {
      if (this.numberOfAnswers > 2) {
        this.numberOfAnswers--;
      }
    },
  },
};
</script>

<style scoped>
.icon {
  font-size: 3rem;
  cursor: pointer;
  margin: 0px 20px;
}
</style>
