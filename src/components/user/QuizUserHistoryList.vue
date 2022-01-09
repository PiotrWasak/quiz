<template>
  <section>
    <ejs-grid
      v-if="isDataLoaded"
      :dataSource="quizData"
      :commandClick="commandClick"
      :allowSorting="true"
      :toolbar="toolbarOptions"
      :allowPaging="true"
      :recordDoubleClick="recordDoubleClick"
    >
      <e-columns>
        <e-column field="data.quiz.title" headerText="Quiz"></e-column>
        <e-column field="data.scorePercent" headerText="Wynik %"></e-column>
        <e-column field="data.createdAt" :template="dateColTemplate" headerText="Data"></e-column>
        <e-column headerText="" :commands="commands"></e-column>
      </e-columns>
    </ejs-grid>
    <div v-else>
      <base-spinner></base-spinner>
    </div>
  </section>
</template>

<script>
import { getData, queryData } from "@/utils/readData";
import BaseSpinner from "../UI/BaseSpinner";
import { dateTemplate } from "../../utils/DateTemplate";

export default {
  name: "QuizUserHistory",
  components: { BaseSpinner },
  data() {
    return {
      isDataLoaded: false,
      quizData: null,
      dateColTemplate: function () {
        return { template: dateTemplate };
      },
      commands: [
        {
          buttonOption: { content: "Szczegóły", cssClass: "e-warning" },
        }, // bind the button here
      ],
      toolbarOptions: ["Search"],
    };
  },
  methods: {
    commandClick: function (args) {
      // event will be triggered when we click the command column button
      if (args.target.classList.contains("e-warning")) {
        console.log(args.rowData);
        this.$router.push(`/quizSummary/${args.rowData.id}`);
      }
    },
    recordDoubleClick(args) {
      this.$router.push(`/quizSummary/${args.rowData.id}`);
    },
  },
  async created() {
    this.quizData = await queryData(
      "userAnswers",
      "userId",
      "==",
      this.$store.getters.userData.uid
    );
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
