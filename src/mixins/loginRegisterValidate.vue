<template>
  <div></div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "loginRegisterValidate",
  setup() {
    return { v$: useVuelidate() };
  },

};
</script>

<style scoped></style>
