<template>
  <div class="container">
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
        <e-column field="data.title" headerText="Tytuł" width="150"></e-column>
        <e-column
          field="data.createdAt"
          :template="dateColTemplate"
          headerText="Data utworzenia"
          width="120"
        ></e-column>
        <e-column
          headerText="Edytuj"
          width="150"
          :commands="commands"
        ></e-column>
      </e-columns>
    </ejs-grid>
    <div v-else>
      <base-spinner></base-spinner>
    </div>
  </div>
</template>

<script>
import { getData } from "@/utils/readData";
import BaseSpinner from "../UI/BaseSpinner";
import { dateTemplate } from "../../utils/DateTemplate";
export default {
  name: "QuizList",
  components: { BaseSpinner },
  data() {
    return {
      quizData: null,
      isDataLoaded: false,
      dateColTemplate: function () {
        return { template: dateTemplate };
      },
      commands: [
        {
          buttonOption: { content: "Edytuj", cssClass: "e-warning" },
        }, // bind the button here
      ],
      toolbarOptions: ["Search", "Print"],
      dateFormat: { type: "date", skeleton: "short" },
    };
  },
  methods: {
    commandClick: function (args) {
      // event will be triggered when we click the command column button
      if (args.target.classList.contains("e-warning")) {
        // here you can perform the action as you want
        this.$router.push({
          name: "QuizEdit",
          params: { id: args.rowData.id },
        });
      }
    },
    recordDoubleClick(args) {
      this.$router.push({
        name: "QuizEdit",
        params: { id: args.rowData.id },
      });
    },
  },
  async created() {
    this.quizData = await getData("quiz");
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
