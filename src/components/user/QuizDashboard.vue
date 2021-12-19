<template>
  <div class="container">
    <ejs-grid
      :dataSource="quizData"
      :commandClick="commandClick"
      :allowSorting="true"
      :toolbar="toolbarOptions"
      :allowPaging="true"
    >
      <e-columns>
        <e-column field="data.title" headerText="Tytuł"></e-column>
        <e-column
          field="data.questions.length"
          headerText="Ilość pytań"
        ></e-column>
        <e-column
          field="data.updatedAt"
          headerText="Data aktualizacji"
        ></e-column>
        <e-column headerText="" :commands="commands"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import { getData } from "@/utils/readData";

export default {
  name: "QuizDashboard",
  data() {
    return {
      quizData: null,
      commands: [
        {
          buttonOption: { content: "Rozpocznij", cssClass: "e-success" },
        }, // bind the button here
      ],
      toolbarOptions: ["Search", "Print"],
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  methods: {
    commandClick: function (args) {
      // event will be triggered when we click the command column button
      if (args.target.classList.contains("e-success")) {
        // here you can perform the action as you want
        this.$router.push(`/quiz/${args.rowData.id}/1`);
      }
    },
  },
  created() {
    const getQuizData = async () => {
      this.quizData = await getData("quiz");
    };
    getQuizData();
  },
};
</script>

<style scoped></style>
