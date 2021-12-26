<template>
  <ejs-grid
    v-if="isDataLoaded"
    ref="rankingGrid"
    :dataSource="rankingData"
    :allowSorting="true"
    :toolbar="toolbarOptions"
    :allowPaging="true"
    :allowGrouping="true"
    :groupSettings="groupOptions"
  >
    <e-columns>
      <e-column field="quiz" headerText="Quiz"></e-column>
      <e-column field="user" headerText="Użytkownik"></e-column>
      <e-column field="scorePercent" headerText="Wynik"></e-column>
      <e-column field="createdAt" headerText="Data"></e-column>
    </e-columns>
  </ejs-grid>
  <div v-else>
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border ext-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Grid,
  Page,
  Search,
  Sort,
  Toolbar,
  Group,
} from "@syncfusion/ej2-vue-grids";
import { getData, getDocument } from "@/utils/readData";

Grid.Inject(Sort, Page, Toolbar, Search, Group);
export default {
  name: "QuizRankingGrid",
  data() {
    return {
      rankingData: [],
      isDataLoaded: false,
      toolbarOptions: ["Search", "Print"],
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  async created() {
    const userAnswers = await getData("userAnswers");
    for (const answer of userAnswers) {
      console.log(answer);
      const quiz = await getDocument("quiz", answer.data.quizId);
      const user = await getDocument("users", answer.data.userId);
      console.log(quiz);
      console.log(user);
      const newRankingDataObj = {
        quiz: quiz.title,
        user: user.eMail,
        scorePercent: answer.data.scorePercent,
        createdAt: answer.data.createAt,
      };
      this.rankingData.push(newRankingDataObj);
    }
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
