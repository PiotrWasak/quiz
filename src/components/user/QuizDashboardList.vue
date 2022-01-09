<template>
  <ejs-grid
    v-if="isDataLoaded"
    :dataSource="quizData"
    :commandClick="commandClick"
    :allowSorting="true"
    :toolbar="toolbarOptions"
    :allowTextWrap="true"
    :recordDoubleClick="recordDoubleClick"
  >
    <e-columns>
      <e-column field="data.title" headerText="Tytuł"></e-column>
      <e-column field="data.questions.length" headerText="Pytania"></e-column>
      <e-column
        v-if="windowWidth > 600"
        field="data.createdAt"
        :template="dateColTemplate"
        headerText="Data"
      ></e-column>
      <e-column headerText="" :commands="commands"></e-column>
    </e-columns>
  </ejs-grid>
  <div v-else>
    <base-spinner></base-spinner>
  </div>
</template>

<script>
import { getData } from "@/utils/readData";
import BaseSpinner from "../UI/BaseSpinner";
import { dateTemplate } from "@/utils/DateTemplate";

export default {
  name: "QuizDashboard",
  components: { BaseSpinner },
  data() {
    return {
      windowWidth: window.innerWidth,
      isDataLoaded: false,
      quizData: null,
      dateColTemplate: function () {
        return { template: dateTemplate };
      },
      commands: [
        {
          buttonOption: { content: "Start", cssClass: "e-primary" },
        },
      ],
      toolbarOptions: ["Search"],
    };
  },
  methods: {
    commandClick: function (args) {
      if (args.target.classList.contains("e-primary")) {
        this.$router.push(`/quiz/${args.rowData.id}/1`);
      }
    },
    recordDoubleClick(args) {
      this.$router.push(`/quiz/${args.rowData.id}/1`);
    },
  },
  async created() {
    this.quizData = await getData("quiz");
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
