<template>
  <form ref="addQuizForm" @submit.prevent="submitForm">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-2"><label for="title">Tytuł</label></div>
        <div class="col-md-10">
          <input
            type="text"
            id="title"
            class="e-input"
            placeholder="Wprowadź tytuł"
            name="title"
            v-model="title"
          />
        </div>
      </div>
      <hr />

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <add-quiz-form-question
          v-for="index in questionNumber"
          :key="index"
          :question-id="index"
          :edit-question-data="this.editQuizData?.questions[index-1]"
          >{{ index }}</add-quiz-form-question
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

      <ejs-button v-if="mode === 'add'" type="submit" cssClass="e-success"
        >Zatwierdź quiz</ejs-button
      >
      <ejs-button v-if="mode === 'edit'" type="submit" cssClass="e-warning"
        >Edytuj quiz</ejs-button
      >
    </div>
  </form>
</template>

<script>
import { Timestamp } from "firebase/firestore";
import { addData, setData } from "@/utils/setData";
import AddQuizFormQuestion from "@/components/admin/AddQuizFormQuestion";

export default {
  name: "AddQuizForm",
  components: { AddQuizFormQuestion },
  props: {
    editQuizData: Object,
    mode: {
      required: true,
      validator: (value) => {
        return ["add", "edit"].indexOf(value) !== -1;
      },
    },
  },
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
        if (value) {
          if (key === "title") {
            title = value;
          }
          if (key === "question") {
            questionIndex++;
            questions.push({
              question: value,
              weight: lastWeight,
              answers: [],
            });
          }
          if (key === "weight") {
            lastWeight = value;
          }
          if (key === "answer") {
            let isTrue;
            lastKey === "isTrue" ? (isTrue = true) : (isTrue = false);
            questions[questionIndex].answers.push({
              answer: value,
              isTrue: isTrue,
            });
          }
        }
        lastKey = key;
      });
      const quizData = {
        title: title,
        questions: questions,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
      };
      if (this.mode == "add") {
        addData("quiz", quizData);
      } else {
        setData("quiz", this.$route.params.id, quizData);
      }
    },
  },
  created() {
    if (this.editQuizData?.questions?.length > 0) {
      this.title = this.editQuizData.title;
      console.log("Length", this.editQuizData?.questions?.length);
      this.questionNumber = this.editQuizData?.questions?.length;
    }
  }
};
</script>

<style scoped></style>
