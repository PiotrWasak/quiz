<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="flushHeading">
      <ejs-button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="flushCollapseTarget"
        aria-expanded="false"
        :aria-controls="flushCollapse"
      >
        Pytanie {{ questionId }}
      </ejs-button>
    </h2>
    <div
      :id="flushCollapse"
      class="accordion-collapse collapse"
      :aria-labelledby="flushHeading"
      data-bs-parent="#accordionFlushExample"
    >
      <div class="row mt-3">
        <div class="col-md-2"><label>Pytanie</label></div>
        <div class="col-md-10">
          <textarea
            v-model="formData.question"
            type="text"
            class="e-input"
            placeholder="Wprowadź pytanie"
          ></textarea>
        </div>
      </div>
      <h3 class="text-center mt-3">Odpowiedzi</h3>
      <div v-for="index in numberOfAnswers" :key="index" class="row mt-3">
          <textarea
            v-model="formData.answers[index - 1]"
            class="e-input"
            :aria-label="index"
            :placeholder="index"
          ></textarea>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "AddQuestionForm",
  props: ["questionId"],
  data() {
    return {
      numberOfAnswers: 2,
      formData: {
        question: "",
        answers: [],
      },
    };
  },
  methods: {
    addAnswer() {
      if (this.numberOfAnswers < 8) {
        this.numberOfAnswers++;
        console.log(this.formData);
      }
    },
    removeAnswer() {
      if (this.numberOfAnswers > 2) {
        this.numberOfAnswers--;
      }
    },
  },
  created() {
    for (let i = 0; i < this.numberOfAnswers; i++) {
      this.formData.answers[i] = null;
    }
  },
  computed: {
    flushHeading() {
      return `flush-heading${this.questionId}`;
    },
    flushCollapse() {
      return `flush-collapse${this.questionId}`;
    },
    flushCollapseTarget() {
      return `#flush-collapse${this.questionId}`;
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
