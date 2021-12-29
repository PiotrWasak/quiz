<template>
  <div v-if="interestingFact" style="margin:50px auto 0; width:100%;">
    <br>
    <div tabindex="0" class="e-card" id="basic">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-title"><font-awesome-icon icon="lightbulb"></font-awesome-icon> Ciekawostka</div>
        </div>
      </div>
      <div class="e-card-content">
        {{interestingFact}}
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from "../../utils/readData";

export default {
  name: "QuizDashboardFacts",
  data() {
    return {
      interestingFact: null,
    }
  },
  async created() {
    const interestingFactsArray = await getData("interestingFacts");
    const randomIndex = Math.floor(Math.random() * interestingFactsArray.length);
    this.interestingFact = interestingFactsArray[randomIndex].data.content;
  }
}
</script>

<style scoped>

</style>