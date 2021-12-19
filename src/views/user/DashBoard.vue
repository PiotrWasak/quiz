<template>
  <div v-if="userData" class="container">

  {{ userData.email }}
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>

<style scoped></style>
