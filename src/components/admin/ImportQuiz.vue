<template>
  <!--  <ejs-uploader ref="uploadObj" id='defaultfileupload' name="UploadFiles"></ejs-uploader>-->

  <!--  <ejs-button @click="importQuiz" cssClass="e-primary e-outline"-->
  <!--  ><font-awesome-icon icon="file-import"></font-awesome-icon> Importuj-->
  <!--    quiz</ejs-button-->
  <!--  >-->
  <input type="file" id="input" multiple />
  <button @click="getFile">Get</button>
</template>

<script>
import { addData } from "@/utils/setData";

export default {
  name: "ImportQuiz",
  methods: {
    importQuiz() {
      // addData("quiz", )
    },
    getFile() {
      const selectedFile = document.getElementById("input").files[0];
      console.log(selectedFile);
      const json = URL.cr;
    },
  },
};
</script>

<style scoped></style>
