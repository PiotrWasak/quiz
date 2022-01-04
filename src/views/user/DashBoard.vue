<template>
  <div class="container grid-container">
    <h3 class="text-center">
      <font-awesome-icon icon="rocket"></font-awesome-icon> Rozpocznij quiz
    </h3>
    <quiz-dashboard class="mt-5"></quiz-dashboard>
    <quiz-dashboard-facts></quiz-dashboard-facts>
  </div>
</template>

<script>
import QuizDashboard from "@/components/user/QuizDashboardList";
import QuizDashboardFacts from "../../components/user/QuizDashboardFacts";
export default {
  name: "Dashboard",
  components: { QuizDashboardFacts, QuizDashboard },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>

<style scoped>
.grid-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
