<template>
  <div class="container mt-5">
    <h3 class="text-center">
      <font-awesome-icon icon="users"></font-awesome-icon> Ranking
    </h3>
    <quiz-ranking-grid></quiz-ranking-grid>
  </div>
</template>

<script>
import QuizRankingGrid from "@/components/admin/QuizRankingGrid";
export default {
  name: "QuizRanking",
  components: { QuizRankingGrid },
};
</script>

<style scoped></style>
