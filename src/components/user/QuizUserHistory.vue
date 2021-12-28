<template>
  <section>
    <ejs-grid
      v-if="isDataLoaded"
      :dataSource="quizData"
      :commandClick="commandClick"
      :allowSorting="true"
      :toolbar="toolbarOptions"
      :allowPaging="true"
    >
      <e-columns>
        <e-column field="data.quiz.title" headerText="Quiz"></e-column>
        <e-column field="data.scorePercent" headerText="Wynik %"></e-column>
        <e-column field="data.createdAt" headerText="Data"></e-column>
        <e-column headerText="" :commands="commands"></e-column>
      </e-columns>
    </ejs-grid>
    <div v-else>
      <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border ext-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getData, queryData } from "@/utils/readData";

export default {
  name: "QuizUserHistory",
  data() {
    return {
      isDataLoaded: false,
      quizData: null,
      commands: [
        {
          buttonOption: { content: "Szczegóły", cssClass: "e-info" },
        }, // bind the button here
      ],
      toolbarOptions: ["Search", "Print"],
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  methods: {
    commandClick: function (args) {
      // event will be triggered when we click the command column button
      if (args.target.classList.contains("e-info")) {
        console.log(args.rowData);
        //this.$router.push(`/quiz/${args.rowData.id}/1`);
      }
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
