<template>
  <span class="text-muted">
    Wielokrotnego wyboru
    <ejs-switch
      v-model="isMultipleChoice"
      :checked="isMultipleChoice"
      @change="changeMultipleChoiceSwitch"
      id="switch"
    ></ejs-switch>
  </span>
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
          :edit-question-data="this.editQuizData?.questions[index - 1]"
          :is-multiple-choice="isMultipleChoice"
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

      <ejs-button v-if="mode === 'add'" type="submit" cssClass="e-primary"
        >Zatwierdź quiz</ejs-button
      >
      <ejs-button
        v-if="mode === 'edit'"
        type="submit"
        cssClass="e-primary e-outline"
        >Edytuj quiz</ejs-button
      >
    </div>
  </form>
</template>

<script>
import { Timestamp } from "firebase/firestore";
import { addData, setData } from "@/utils/setData";
import AddQuizFormQuestion from "@/components/admin/AddQuizFormQuestion";
import { useToast } from "vue-toastification";

export default {
  name: "AddQuizForm",
  components: { AddQuizFormQuestion },
  setup() {
    const toast = useToast();
    return { toast };
  },
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
      isValid: true,
      isMultipleChoice: false,
    };
  },
  methods: {
    changeMultipleChoiceSwitch() {
      this.isMultipleChoice = !this.isMultipleChoice;
    },
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
    async submitForm() {
      let data = new FormData(this.$refs.addQuizForm);
      let title = "";
      let lastWeight = 1;
      let questionIndex = -1;
      let questions = [];
      let lastKey;
      data.forEach((value, key) => {
        if (this.isValid) {
          if (!value) {
            this.toast.warning("Nie wszystkie pola zostały wypełnione");
            this.isValid = false;
            return;
          }
          if (value) {
            if (key === "title") {
              title = value;
            }
            if (key === "question") {
              questionIndex++;
              console.log("Weight", lastWeight);
              questions.push({
                question: value,
                weight: 1,
                answers: [],
              });
            }
            if (key === "weight") {
              lastWeight = value;
              questions[questionIndex].weight = parseInt(lastWeight);
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
        }
      });
      questions.forEach((value) => {});
      if (!this.isValid) {
        this.isValid = true;
        return;
      }
      const quizData = {
        title: title,
        questions: questions,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        multipleChoice: this.isMultipleChoice,
      };
      console.log("Quiz data", quizData);
      let status;
      if (this.mode == "add") {
        status = await addData("quiz", quizData);
      } else {
        status = await setData("quiz", this.$route.params.id, quizData);
      }
      if (status) {
        this.toast.success("Pomyślnie zapisano quiz");
        await this.$router.replace("/quizAdmin");
      } else {
        this.toast.error("Wystąpił błąd");
      }
    },
  },
  mounted() {
    if (this.editQuizData?.questions?.length > 0) {
      this.title = this.editQuizData.title;
      this.questionNumber = this.editQuizData?.questions?.length;
      this.isMultipleChoice = this.editQuizData?.multipleChoice;
    }
  },
};
</script>

<style scoped>
.text-muted {
  font-size: 0.8em;
  float: right;
}
</style>
