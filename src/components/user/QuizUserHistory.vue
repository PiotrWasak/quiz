<template>
  <section>
    <ejs-grid
      :dataSource="quizData"
      :commandClick="commandClick"
      :allowSorting="true"
      :toolbar="toolbarOptions"
      :allowPaging="true"
    >
      <e-columns>
        <e-column field="data.quizId" headerText="Quiz"></e-column>
        <e-column
          field="data.scorePercent"
          headerText="Wynik %"
        ></e-column>
        <e-column
          field="data.createAt"
          headerText="Data"
        ></e-column>
        <e-column headerText="" :commands="commands"></e-column>
      </e-columns>
    </ejs-grid>
  </section>
</template>

<script>
import { getData } from "@/utils/readData";

export default {
  name: "QuizUserHistory",
  data() {
    return {
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
        // here you can perform the action as you want
        //this.$router.push(`/quiz/${args.rowData.id}/1`);
      }
    },
  },
  created() {
    const getQuizData = async () => {
      this.quizData = await getData("userAnsewers");
      console.log(this.quizData);
    };
    getQuizData();
  },
};
</script>

<style scoped></style>
