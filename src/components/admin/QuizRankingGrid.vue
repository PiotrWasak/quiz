<template>
  <ejs-grid
    :dataSource="quizHistory"
    :allowSorting="true"
    :toolbar="toolbarOptions"
    :allowPaging="true"
    :allowGrouping="true"
    :groupSettings="groupOptions"
  >
    <e-columns>
      <e-column field="data.quizId" headerText="Quiz"></e-column>
      <e-column field="data.userId" headerText="Użytkownik"></e-column>
      <e-column field="data.scorePercent" headerText="Wynik"></e-column>
      <e-column field="data.createAt" headerText="Data"></e-column>
    </e-columns>
  </ejs-grid>
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
import { getData } from "@/utils/readData";

Grid.Inject(Sort, Page, Toolbar, Search, Group);
export default {
  name: "QuizRankingGrid",
  data() {
    return {
      quizHistory: null,
      toolbarOptions: ["Search", "Print"],
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  async created() {
    this.quizHistory = await getData("userAnsewers");
  },
};
</script>

<style scoped></style>
