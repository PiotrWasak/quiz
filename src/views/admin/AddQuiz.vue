<template>
  <form ref="addQuizForm" @submit.prevent="submitForm">
    <div class="container mt-5">
      <h3>Dodaj quiz</h3>
      <div class="row">
        <div class="col-md-2"><label for="title">Tytuł</label></div>
        <div class="col-md-10">
          <input
            v-model="title"
            type="text"
            id="title"
            class="e-input"
            placeholder="Wprowadź tytuł"
            name="title"
          />
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

      <ejs-button @click="addQuestion" type="button" class="btn btn-dark mt-3"
        >Dodaj pytanie</ejs-button
      >
      <ejs-button
        @click="removeQuestion"
        type="button"
        class="btn btn-outline-danger mt-3"
        >Usuń pytanie</ejs-button
      >
      <hr />
      <ejs-button type="submit" class="btn btn-success mt-3"
        >Zatwierdź quiz</ejs-button
      >
    </div>
  </form>
</template>

<script>
import AddQuestionForm from "@/components/admin/AddQuestionForm";
import { Timestamp } from "firebase/firestore";
import { addData } from "@/utils/setData";
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
    submitForm() {
      let data = new FormData(this.$refs.addQuizForm);
      let title = "";
      let lastWeight = 1;
      let questionIndex = -1;
      let questions = [];
      let lastKey;
      data.forEach((value, key) => {
        console.log(`${key} - ${value}`);
        if (value) {

          if (key === "title") {
            title = value;
          }
          if (key === "question") {
            questionIndex++;
            questions.push({ question: value, weight: lastWeight, answers: [] });
          }
          if (key === "weight") {
            lastWeight = value
          }
          if (key === "answer") {
            let isTrue;
            lastKey === "isTrue" ? isTrue = true : isTrue = false;
            questions[questionIndex].answers.push({answer: value, isTrue: isTrue});
          }
        }
        lastKey = key;
      });
      const quizData = { title: title, questions: questions, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), isActive: true };
      console.log(quizData);
      addData("quiz", quizData)
    },
  },
};
</script>

<style scoped></style>
