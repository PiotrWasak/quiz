<template>
  <ejs-grid
    v-if="isDataLoaded"
    :dataSource="quizData"
    :commandClick="commandClick"
    :allowSorting="true"
    :toolbar="toolbarOptions"
  >
    <e-columns>
      <e-column field="data.title" headerText="Tytuł"></e-column>
      <e-column
        field="data.questions.length"
        headerText="Ilość pytań"
      ></e-column>
      <e-column field="data.updatedAt" headerText="Data"></e-column>
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

export default {
  name: "QuizDashboard",
  components: { BaseSpinner },
  data() {
    return {
      isDataLoaded: false,
      quizData: null,
      commands: [
        {
          buttonOption: { content: "Rozpocznij", cssClass: "e-primary" },
        }, // bind the button here
      ],
      toolbarOptions: ["Search", "Print"],
    };
  },
  methods: {
    commandClick: function (args) {
      // event will be triggered when we click the command column button
      if (args.target.classList.contains("e-primary")) {
        // here you can perform the action as you want
        this.$router.push(`/quiz/${args.rowData.id}/1`);
      }
    },
  },
  async created() {
    this.quizData = await getData("quiz");
    this.quizData.forEach((quiz, index) => {
      console.log(new Intl.DateTimeFormat('pl-PL').format(quiz.data.updatedAt.toDate()));
      this.quizData[index].data.updatedAt = new Intl.DateTimeFormat('pl-PL').format(quiz.data.updatedAt.toDate())});
    //this.quizData.data.updatedAt = this.quizData.data.updatedAt.toDate();
    console.log("Quiz Data", this.quizData);
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
