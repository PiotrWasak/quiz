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
          @click="submitAnswer(answer)"
          size="large"
          :cssClass="answerBtnClass"
          :ref="setAnswerBtnRef"
          >{{ answer.answer }}</ejs-button
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
      pointWeight: 1,
      answerBtnClass: "e-custom e-outline",
      answerBtnRefs: [],
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
    scorePercent() {
      return Math.round((this.points / this.maxPoints) * 100);
    },
  },
  methods: {
    setAnswerBtnRef(el) {
      if (el) {
        this.answerBtnRefs.push(el);
      }
    },
    async submitAnswer(answer) {
      this.$store.dispatch("ADD_USER_ANSWER", answer);
      if (answer.isTrue) {
        this.$store.dispatch("ADD_POINT", parseInt(this.questionData.weight));
        event.target.classList.add("e-success");
        event.target.classList.remove("e-outline");
      } else {
        event.target.classList.add("e-danger");
        event.target.classList.remove("e-outline");
      }
      await new Promise((r) => setTimeout(r, 2000));
      if (this.questionIndex < this.quizData.questions.length) {
        await this.$router.replace(
          `/quiz/${this.id}/${parseInt(this.questionIndex) + 1}`
        );
        this.questionData = this.quizData.questions[this.questionIndex - 1];
      } else {
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
        console.log(id);
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
