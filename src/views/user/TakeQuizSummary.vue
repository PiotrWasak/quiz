<template>
  <div class="container text-center mt-5">
    <div ref="summary" style="margin: 50px auto 0; width: 100%">
      <br />
      <div tabindex="0" class="e-card" id="basic">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title mt-3">
              <h4>{{ quizTitle }}</h4>
              <ejs-progressbar
                id="percentage"
                :type="type"
                :showProgressValue="showProgressValue"
                :value="scorePercent"
                :animation="animation"
                progressColor="#ef4f10"
              ></ejs-progressbar>
            </div>
          </div>
        </div>
        <div class="e-card-content">
          <div class="row" v-if="scorePercent === 100">
            <div class="col-12"><h5>Gratulacje!</h5></div>
          </div>
          <div class="row">
            <div class="col-12">
              Uzyskałeś {{ points }}/{{ maxPoints }} punktów, czyli
              {{ scorePercent }}%.
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12"><h5>Odpowiedzi</h5></div>
          </div>
          <take-quiz-summary-answer
            v-for="(answer, index) in userAnswers"
            :user-answer="answer"
            :correct-answer="correctAnswers[index]"
            :question-weight="questionWeights[index]"
            :question-text="questions[index]"
            :key="index"
          ></take-quiz-summary-answer>
        </div>
      </div>
    </div>
    <ejs-button @click="savePDF" cssClass="e-primary mt-5"
      >Zapisz jako PDF</ejs-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TakeQuizSummaryAnswer from "@/components/user/TakeQuizSummaryAnswer";
import { getDocument } from "@/utils/readData";
import html2pdf from "html2pdf.js/src";

export default {
  name: "TakeQuizSummary",
  components: { TakeQuizSummaryAnswer },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      correctAnswers: [],
      quizTitle: "",
      userAnswers: [],
      questions: [],
      points: null,
      maxPoints: null,
      scorePercent: null,
      type: "Circular",
      questionWeights: [],
      showProgressValue: "true",
      animation: {
        enable: true,
        duration: 1200,
        delay: 0,
      },
    };
  },
  methods: {
    savePDF() {
      const opt = {
        margin: 1,
        filename: "wynik_quizu.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 4, logging: true },
      };
      html2pdf(this.$refs.summary, opt);
    },
  },
  async created() {
    const dbAnswers = await getDocument("userAnswers", this.$route.params.id);
    this.quizTitle = dbAnswers.quiz.title;
    this.points = dbAnswers.scorePoints;
    this.maxPoints = dbAnswers.maxPoints;
    this.scorePercent = dbAnswers.scorePercent;
    dbAnswers.answers.forEach((answer) => {
      const answerObject = JSON.parse(answer);
      this.userAnswers.push(answerObject);
    });

    let questionIndex = 0;
    dbAnswers.quiz.questions.forEach((question) => {
      this.questionWeights.push(question.weight);
      this.questions.push(question.question);
      question.answers.forEach((answer) => {
        if (answer.isTrue) {
          this.correctAnswers.push([]);
          this.correctAnswers[questionIndex].push(answer.answer);
        }
      });
      questionIndex++;
    });
    console.log(this.questions);

    // console.log("Correct answers", this.correctAnswers);
    // const userQuizData = {
    //   quizId: this.activeQuiz,
    //   userId: this.userData.uid,
    //   answers: this.userAnswers,
    //   scorePoints: this.points,
    //   maxPoints: this.maxPoints,
    //   scorePercent: this.scorePercent,
    //   createAt: Timestamp.now(),
    // };
    // addData("userAnsewers", userQuizData);
  },
};
</script>

<style scoped></style>
