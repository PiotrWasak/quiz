<template>
  <div class="container mt-5">
    <h3>Dodaj quiz</h3>
    <div class="row">
      <div class="col-md-2"><label for="title">Tytuł</label></div>
      <div class="col-md-10">
        <input v-model="title" type="text" id="title" class="e-input" placeholder="Wprowadź tytuł"/>
      </div>
    </div>
    <hr />

    <div class="accordion accordion-flush" id="accordionFlushExample">
      <add-question-form
        v-for="index in questionNumber"
        :key="index"
        :question-id="index"
        >{{ index }}</add-question-form
      >
    </div>

    <ejs-button @click="addQuestion" class="btn btn-dark mt-3"
      >Dodaj pytanie</ejs-button
    >
    <ejs-button @click="removeQuestion" class="btn btn-outline-danger mt-3"
      >Usuń pytanie</ejs-button
    >
    <hr />
    <ejs-button class="btn btn-success mt-3">Zatwierdź quiz</ejs-button>
  </div>
</template>

<script>
import AddQuestionForm from "@/components/admin/AddQuestionForm";
export default {
  name: "AddQuiz",
  components: { AddQuestionForm },
  data() {
    return {
      title: "",
      questionNumber: 1,
    };
  },
  methods: {
    addQuestion() {
      if (this.questionNumber < 10) {
        this.questionNumber++;
      }
    },
    removeQuestion() {
      if (this.questionNumber > 1) {
        this.questionNumber--;
      }
    },
  },
};
</script>

<style scoped></style>
