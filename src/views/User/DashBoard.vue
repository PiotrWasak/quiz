<template>
  <div v-if="userData" class="container">
  user:
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
