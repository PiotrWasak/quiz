<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id=flushHeading>
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target=flushCollapseTarget
        aria-expanded="false"
        :aria-controls=flushCollapse
      >
        Pytanie {{questionId}}
      </button>
    </h2>
    <div
      :id=flushCollapse
      class="accordion-collapse collapse"
      :aria-labelledby=flushHeading
      data-bs-parent="#accordionFlushExample"
    >
      <form @submit.prevent="addQuestion" class="mt-5">
        <div class="row mt-3">
          <div class="col-md-2"><label>Pytanie</label></div>
          <div class="col-md-10">
            <textarea
              v-model="formData.question"
              type="text"
              class="form-control"
            ></textarea>
          </div>
        </div>
        <h3 class="text-center mt-3">Odpowiedzi</h3>
        <div v-for="index in numberOfAnswers" :key="index" class="row mt-3">
          <div class="input-group">
            <span class="input-group-text">{{ index }}</span>
            <textarea
              v-model="formData.answers[index]"
              class="form-control"
              :aria-label="index"
            ></textarea>
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
      </form>
    </div>
  </div>
</template>

<script>
import AddQuizFormQuestion from "@/components/admin/AddQuizFormQuestion";
export default {
  name: "AddQuizForm",
  props: ['questionId'],
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
    addQuestion() {
      console.log(this.formData);
    },
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
  created() {
    for (let i = 0; i < this.numberOfAnswers; i++) {
      this.formData.answers[i] = null;
    }
  },
  computed: {
    flushHeading() {
      return `flush-heading${this.questionId}`;
    },
    flushHeadingTarget() {
      return `#flush-heading${this.questionId}`;
    },
    flushCollapse() {
      return `flush-collapse${this.questionId}`;
    },
    flushCollapseTarget() {
      return `#flush-collapse${this.questionId}`;
    }
  }
};
</script>

<style scoped>
.icon {
  font-size: 3rem;
  cursor: pointer;
  margin: 0px 20px;
}
</style>
