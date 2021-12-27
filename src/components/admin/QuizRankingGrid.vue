<template>
  <ejs-grid
    v-if="isDataLoaded"
    ref="rankingGrid"
    :dataSource="rankingData"
    :allowSorting="true"
    :sortSettings="sortOptions"
    :toolbar="toolbarOptions"
    :allowPaging="true"
    :allowGrouping="true"
    :groupSettings="groupOptions"
    locale='pl-PL'
  >
    <e-columns>
      <e-column field="data.quiz.title" headerText="Quiz"></e-column>
      <e-column field="data.userEmail" headerText="Użytkownik"></e-column>
      <e-column field="data.scorePercent" headerText="Wynik"></e-column>
      <e-column field="data.createdAt" headerText="Data"></e-column>
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
      groupOptions: {
        columns: ["data.quiz.title"],
      },
      sortOptions: {
        columns: [{ field: "data.scorePercent", direction: "Descending" }],
      },
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  async created() {
    this.rankingData = await getData("userAnswers");
    console.log(this.rankingData);
    // for (const answer of userAnswers) {
    //   const quiz = await getDocument("quiz", answer.data.quizId);
    //   const user = await getDocument("users", answer.data.userId);
    //   const newRankingDataObj = {
    //     quiz: quiz.title,
    //     user: user.eMail,
    //     scorePercent: answer.data.scorePercent,
    //     createdAt: answer.data.createdAt,
    //   };
    //   this.rankingData.push(newRankingDataObj);
    // }
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
