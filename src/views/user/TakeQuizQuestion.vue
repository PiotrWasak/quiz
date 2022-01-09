<template>
  <div class="container text-center">
    <div class="row">
      <h3>{{ questionData.question }}</h3>
    </div>
    <div class="row mt-5">
      <div
        class="col-md-6 mt-5"
        v-for="answer in questionData.answers"
        :key="answer"
      >
        <ejs-button
          v-if="!quizData.multipleChoice"
          @click="submitAnswer"
          :value="answer"
          size="large"
          :cssClass="answerBtnClass"
          :class="[{ correct: answer.isTrue }]"
          ref="answerBtnRefs"
          >{{ answer.answer }}</ejs-button
        >
        <ejs-button
          v-else
          :is-toggle="true"
          :value="answer"
          size="large"
          :cssClass="answerBtnClass"
          :class="[{ correct: answer.isTrue }]"
          ref="answerBtnRefs"
          >{{ answer.answer }}</ejs-button
        >
      </div>
    </div>
    <div class="row mt-5" v-if="quizData.multipleChoice">
      <div class="col-12">
        <ejs-button size="large" cssClass="e-primary" @click="submitAnswer"
          >Dalej</ejs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getDocument } from "@/utils/readData";
import { mapGetters } from "vuex";
import { Timestamp } from "firebase/firestore";
import { addData } from "@/utils/setData";

export default {
  name: "TakeQuizQuestion",
  props: ["id", "questionIndex"],
  data() {
    return {
      questionData: {},
      quizData: {},
      correctAnswers: 0,
    };
  },
  computed: {
    ...mapGetters([
      "points",
      "activeQuiz",
      "userData",
      "userAnswers",
      "maxPoints",
    ]),
    answerBtnClass() {
      return "e-custom e-outline";
    },
    scorePercent() {
      return Math.round((this.points / this.maxPoints) * 100);
    },
  },
  methods: {
    countCorrectAnswers() {
      this.correctAnswers = 0;
      this.questionData.answers.forEach((answer) => {
        if (answer.isTrue) {
          this.correctAnswers++;
        }
      });
    },
    async submitAnswer() {
      if (!this.quizData.multipleChoice) {
        event.target.classList.add("e-active");
      }
      let correctUserAnswers = 0;
      this.countCorrectAnswers();
      const userAnswersArray = [];
      this.$refs.answerBtnRefs.forEach((val) => {
        const classList = val.$el.classList;
        console.log(classList);
        if (classList.contains("e-active") && classList.contains("correct")) {
          correctUserAnswers++;
          userAnswersArray.push(val.$attrs.value);
        } else if (classList.contains("e-active")) {
          correctUserAnswers--;
          userAnswersArray.push(val.$attrs.value);
        }
        if (!classList.contains("correct")) {
          classList.add("e-danger");
        } else {
          classList.add("e-success");
        }
      });

      if (correctUserAnswers === this.correctAnswers) {
        this.$store.dispatch("ADD_POINT", parseInt(this.questionData.weight));
      }
      // Save answers as JSON because firestore can't handle nested arrays.
      this.$store.dispatch("ADD_USER_ANSWER", JSON.stringify(userAnswersArray));
      console.log(this.$store.state.quiz);
      // this.$store.dispatch("ADD_USER_ANSWER", answer);
      // if (answer.isTrue) {
      //   this.$store.dispatch("ADD_POINT", parseInt(this.questionData.weight));
      //   event.target.classList.add("e-success");
      //   event.target.classList.remove("e-outline");
      // } else {
      //   event.target.classList.add("e-danger");
      //   event.target.classList.remove("e-outline");
      // }
      await new Promise((r) => setTimeout(r, 2000));
      if (this.questionIndex < this.quizData.questions.length) {
        await this.$router.replace(
          `/quiz/${this.id}/${parseInt(this.questionIndex) + 1}`
        );
        this.questionData = this.quizData.questions[this.questionIndex - 1];
      } else {
        //Submit answers
        const quizData = await getDocument("quiz", this.activeQuiz);
        const newQuizData = {
          quiz: quizData,
          userId: this.userData.uid,
          userEmail: this.userData.email,
          answers: this.userAnswers,
          scorePoints: this.points,
          maxPoints: this.maxPoints,
          scorePercent: this.scorePercent,
          createdAt: Timestamp.now(),
        };
        const id = await addData("userAnswers", newQuizData);
        await this.$router.replace(`/quizSummary/${id}`);
      }
    },
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
    this.questionData = this.quizData.questions[this.questionIndex - 1];
  },
};
</script>

<style scoped>
.e-custom {
  width: 100%;
  padding: 30px 60px;
}
</style>
