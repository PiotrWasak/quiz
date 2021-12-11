<template>
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="MyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MyModalLabel">Rejestracja</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row mt-4">
              <div class="col-2">
                <label for="registerLogin" class="col-form-label">E-mail</label>
              </div>
              <div class="col-10">
                <input v-model="formData.inputEmail" class="form-control" type="email" id="registerLogin"/>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-2">
                <label for="registerPassword" class="col-form-label">Hasło</label>
              </div>
              <div class="col-10">
                <input v-model="formData.inputPassword" class="form-control" type="password" id="registerPassword"/>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
          <button @click=register() type="button" class="btn btn-primary" data-bs-dismiss="modal">Zarejestruj się</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  data() {
    return {
      formData: {},
    }
  },
  methods: {
    register() {
      console.log("Register");
      this.$emit('register', this.formData);
    }
  }
}
</script>

<style scoped>

</style>