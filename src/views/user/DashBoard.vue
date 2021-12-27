<template>
  <div v-if="userData" class="container mt-5">Cześć {{ userData.email }} !</div>

  <quiz-dashboard class="mt-5"></quiz-dashboard>
</template>

<script>
import QuizDashboard from "@/components/user/QuizDashboard";
export default {
  name: "Dashboard",
  components: { QuizDashboard },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>

<style scoped></style>
