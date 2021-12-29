<template>
  <div class="modal fade" id="resetPasswordModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resetPasswordModalLabel">Resetuj hasło</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row mt-4">
              <div class="col-2">
                <label for="resetPasswordLogin" class="col-form-label">E-mail</label>
              </div>
              <div class="col-10">
                <input @keydown.enter="sendResetPasswordEmail" v-model="inputEmail" class="e-input" type="email" id="resetPasswordLogin"/>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <ejs-button type="button" cssClass="e-outline" data-bs-dismiss="modal">Zamknij</ejs-button>
          <ejs-button @click=sendResetPasswordEmail() type="button" cssClass="e-primary" data-bs-dismiss="modal">Zresetuj hasło</ejs-button>
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