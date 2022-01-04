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
    locale="pl"
  >
    <e-columns>
      <e-column field="data.quiz.title" headerText="Quiz"></e-column>
      <e-column field="data.userEmail" headerText="Użytkownik"></e-column>
      <e-column field="data.scorePercent" headerText="Wynik %"></e-column>
      <e-column field="data.createdAt" :template="dateTemplate" headerText="Data"></e-column>
    </e-columns>
  </ejs-grid>
  <div v-else>
    <base-spinner></base-spinner>
  </div>
</template>

<script>
import { getData, getDocument } from "@/utils/readData";
import BaseSpinner from "../UI/BaseSpinner";
import { dateTemplate } from "../../utils/DateTemplate";
export default {
  name: "QuizRankingGrid",
  components: { BaseSpinner },
  data() {
    return {
      dateTemplate,
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
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
