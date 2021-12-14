<template>
  <div class="alert alert-danger d-flex align-items-center alert-dismissible fade show mt-3" role="alert">
    <font-awesome-icon class="mr-5" icon="exclamation-circle"></font-awesome-icon>
    <div>
      {{msg}}
    </div>
    <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  props: {
    msg: {
      type: String,
      required: true,
    }
  },
  emits: ['close-alert'],
  methods: {
    closeAlert() {
      this.$emit('close-alert');
    }
  }
}
</script>

<style scoped>

</style>