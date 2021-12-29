<template>
  <div class="container">
    <ejs-grid
      v-if="isDataLoaded"
      :dataSource="quizData"
      :commandClick="commandClick"
      :allowSorting="true"
      :toolbar="toolbarOptions"
      :allowPaging="true"
    >
      <e-columns>
        <e-column field="data.title" headerText="Tytuł" width="150"></e-column>
        <e-column
          field="data.updatedAt"
          headerText="Data aktualizacji"
          width="150"
        ></e-column>
        <e-column
          field="data.createdAt"
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
import QuizListItem from "@/components/admin/QuizListItem";
import { getData } from "@/utils/readData";
import {
  Sort,
  Grid,
  Page,
  Toolbar,
  Search,
  CommandColumn,
} from "@syncfusion/ej2-vue-grids";
import BaseSpinner from "../UI/BaseSpinner";
Grid.Inject(Sort, Page, Toolbar, Search, CommandColumn);
export default {
  name: "QuizList",
  components: { BaseSpinner },
  data() {
    return {
      quizData: null,
      isDataLoaded: false,
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
  },
  async created() {
    this.quizData = await getData("quiz");
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
