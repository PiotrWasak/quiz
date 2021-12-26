<template>
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    aria-labelledby="MyModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MyModalLabel">Rejestracja</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row mt-4">
              <div class="col-2">
                <label for="registerLogin" class="col-form-label">E-mail</label>
              </div>
              <div class="col-10">
                <input
                  v-model.trim="inputEmail"
                  @blur="v$.inputEmail.$touch"
                  :class="{
                    'e-input': true,
                    'e-error': this.v$.inputEmail.$error,
                    'e-success': isPropertyInputValid('inputEmail'),
                  }"
                  type="email"
                  id="registerLogin"
                  placeholder="Wprowadź e-mail"
                />
                <p class="e-error" v-if="this.v$.inputEmail.$error">
                  Nieprawidłowy adres e-mail
                </p>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-2">
                <label for="registerPassword" class="col-form-label"
                  >Hasło</label
                >
              </div>
              <div class="col-10">
                <input
                  v-model.trim="inputPassword"
                  @blur="v$.inputPassword.$touch"
                  :class="{
                    'e-input': true,
                    'e-error': this.v$.inputPassword.$error,
                    'e-success': isPropertyInputValid('inputPassword'),
                  }"
                  type="password"
                  id="registerPassword"
                  placeholder="Wprowadź hasło"
                />
                <p class="e-error" v-if="this.v$.inputPassword.$error">
                  Hasło musi zawierać minimum 6 znaków
                </p>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <ejs-button
            @click="closeRegisterModal"
            type="button"
            cssClass="e-danger"
            data-bs-dismiss="modal"
            >Zamknij</ejs-button
          >
          <ejs-button
            @click="register()"
            :disabled="!isFormValid"
            type="button"
            cssClass="e-success"
            data-bs-dismiss="modal"
            >Zarejestruj się</ejs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";

export default {
  name: "MyModal",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
    };
  },
  validations() {
    return {
      inputEmail: { required, email, $lazy: true, $autoDirty: false }, // Matches this.contact.email
      inputPassword: {
        required,
        minLength: minLength(6),
        $lazy: true,
        $autoDirty: false,
      },
    };
  },
  methods: {
    async register() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.closeRegisterModal();
      const formData = {
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword,
      };
      this.$emit("register", formData);
    },
    isPropertyInputValid(property) {
      const propertyStatus = this.v$[property];
      if (propertyStatus.$dirty) return !propertyStatus.$error;
      else return false;
    },
    closeRegisterModal() {
      this.v$.$reset();
    },
  },
  computed: {
    isFormValid() {
      return !this.v$.$invalid;
    },
  },
};
</script>

<style scoped></style>
