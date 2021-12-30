<template>
  <div class="container mt-5">
    <base-dialog
      ref="deleteDialog"
      content="Czy na pewno usunąć quiz?"
      @confirm="deleteQuiz"
    ></base-dialog>
    <h1>Edytuj quiz: {{ quizData.title }}</h1>
    <p id="text-id" class="text-muted">ID: {{ id }}</p>
    <ejs-button
      style="float: left"
      @click="showDeleteDialog"
      type="submit"
      cssClass="e-primary e-outline"
    >
      Usuń quiz
    </ejs-button>

    <export-quiz v-if="id" :document-id="id"></export-quiz>

    <add-quiz-form
      v-if="quizData.questions.length > 0"
      :edit-quiz-data="quizData"
      mode="edit"
    ></add-quiz-form>
  </div>
</template>

<script>
import QuizEditQuestion from "@/components/admin/QuizEditQuestion";
import { getDocument } from "@/utils/readData";
import { deleteDocument } from "@/utils/setData";
import AddQuizForm from "@/components/admin/AddQuizForm";
import BaseDialog from "@/components/UI/BaseDialog";
import { useToast } from "vue-toastification";
import ExportQuiz from "@/components/admin/ExportQuiz";
export default {
  name: "QuizEdit",
  components: { ExportQuiz, BaseDialog, AddQuizForm },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["id"],
  data() {
    return {
      quizData: {
        questions: [],
      },
    };
  },
  methods: {
    showDeleteDialog() {
      this.$refs.deleteDialog.showDialog();
    },
    async deleteQuiz() {
      console.log("delete quiz");
      const status = await deleteDocument("quiz", this.id);
      if (status === "success") {
        this.toast.success("Pomyślnie usunięto quiz");
      } else if (status === "error") {
        this.toast.error("Wystąpił błąd podczas usuwania quizu");
      }
      await this.$router.replace("/quizAdmin");
    },
  },
  async created() {
    this.quizData = await getDocument("quiz", this.id);
    console.log("QuizData", this.quizData);
  },
};
</script>

<style scoped>
#text-id {
  font-size: 0.8em;
}
button{
  margin: 10px;
}
</style>
