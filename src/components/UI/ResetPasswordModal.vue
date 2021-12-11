<template>
  <div class="modal fade" id="resetPasswordModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resetPasswordModalLabel">Resetuj hasło</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row mt-4">
              <div class="col-2">
                <label for="registerLogin" class="col-form-label">E-mail</label>
              </div>
              <div class="col-10">
                <input v-model="inputEmail" class="form-control" type="email" id="registerLogin"/>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
          <button @click=sendResetPasswordEmail() type="button" class="btn btn-primary" data-bs-dismiss="modal">Zresetuj hasło</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordModal",
  data(){
    return {
      inputEmail: '',
    }
  },
  methods: {
    sendResetPasswordEmail() {
      this.$emit("sendResetPswdEmail", this.inputEmail);
    }
  }
}
</script>

<style scoped>

</style>