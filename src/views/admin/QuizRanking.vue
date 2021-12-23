<template>
<div class="container mt-5 text-center">
  <h3>Ranking</h3>
  <quiz-ranking-grid></quiz-ranking-grid>
</div>
</template>

<script>
import QuizRankingGrid from "@/components/admin/QuizRankingGrid";
export default {
  name: "QuizRanking",
  components: { QuizRankingGrid }
};
</script>

<style scoped>

</style>