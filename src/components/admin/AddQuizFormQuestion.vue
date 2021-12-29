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
        <div class="col-md-10">
          <textarea
            v-model="formData.question"
            type="text"
            class="e-input"
            placeholder="Wprowadź pytanie"
            name="question"
          ></textarea>
        </div>
        <div class="col-md-2">
          <input
            type="number"
            class="e-input"
            value="1"
            placeholder="Waga pytania"
            name="weight"
          />
        </div>
      </div>
      <h3 class="text-center mt-3">Odpowiedzi</h3>
      <div v-for="index in numberOfAnswers" :key="index" class="row mt-3">
        <ejs-checkbox
          :checked="formData?.answers[index - 1]?.isTrue"
          label="Poprawna odpowiedź"
          name="isTrue"
        ></ejs-checkbox>
        <textarea
          v-model="formData.answers[index - 1].answer"
          class="e-input"
          :aria-label="index"
          :placeholder="index"
          name="answer"
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
  name: "AddQuizFormQuestion",
  props: ["questionId", "editQuestionData"],
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
        this.formData.answers.push({ answer: null, isTrue: null });
      }
    },
    removeAnswer() {
      if (this.numberOfAnswers > 2) {
        this.numberOfAnswers--;
        this.formData.answers.pop();
      }
    },
  },
  created() {
    if (this.editQuestionData) {
      this.numberOfAnswers = this.editQuestionData.answers.length;
      console.log("Answers local", this.formData.answers);
      console.log("Answers props", this.editQuestionData.answers);
      this.formData.answers = this.editQuestionData.answers;
      console.log("local = props");
      console.log("Answers local", this.formData.answers);
      console.log("Answers props", this.editQuestionData.answers);
      this.formData.question = this.editQuestionData.question;
    } else {
      for (let i = 0; i < this.numberOfAnswers; i++) {
        this.formData.answers[i] = { answer: null, isTrue: null };
      }
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
