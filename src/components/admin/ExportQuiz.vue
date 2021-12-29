<template>
  <div>
    <ejs-button @click="exportToJsonFile" cssClass="e-primary"
      >Eksport do JSON</ejs-button
    >
  </div>
</template>

<script>
import { getDocument } from "@/utils/readData";

const { Parser } = require("json2csv");
export default {
  name: "ExportQuiz",
  props: {
    documentId: {
      required: true,
      type: String,
      jsonData: null,
    },
  },
  methods: {
    async exportToJsonFile() {
      let dataStr = JSON.stringify(this.jsonData);
      let dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      let exportFileDefaultName = "data.json";

      let linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    },
  },
  async created() {
    this.jsonData = await getDocument("quiz", this.documentId);
  },
};
</script>

<style scoped></style>
