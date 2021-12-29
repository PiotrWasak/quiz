<template>
  <div class="home-container container-fluid text-center spinner-container">
    <div id="e-card-container">
      <div class="e-card">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title">
              <h1>
                <font-awesome-icon icon="feather-alt"></font-awesome-icon> Quiz
              </h1>
            </div>
          </div>
        </div>

        <div class="e-card-content text-center mt-5">
          <form @submit.prevent="logIn">
            <div class="row mt-4">
              <div class="col-2">
                <label for="login" class="col-form-label">E-mail</label>
              </div>
              <div class="col-10">
                <input
                  @blur="v$.login.$touch"
                  v-model.trim="login"
                  :class="{
                    'e-input': true,
                    'e-error': this.v$.login.$error,
                    'e-success': isPropertyInputValid('login'),
                  }"
                  placeholder="Wprowadź e-mail"
                  type="email"
                  id="login"
                />
              </div>
              <p class="e-error" v-if="this.v$.login.$error">
                Nieprawidłowy adres e-mail
              </p>
            </div>
            <div class="row mt-4">
              <div class="col-2">
                <label for="password" class="col-form-label">Hasło</label>
              </div>
              <div class="col-10">
                <input
                  @blur="v$.password.$touch"
                  v-model.trim="password"
                  :class="{
                    'e-input': true,
                    'e-error': this.v$.password.$invalid,
                    'e-success': isPropertyInputValid('password'),
                  }"
                  placeholder="Wprowadź hasło"
                  type="password"
                  id="password"
                />
              </div>
              <p class="e-error" v-if="this.v$.password.$error">
                Hasło musi zawierać minimum 6 znaków
              </p>
            </div>
            <div class="row mt-4">
              <div class="col-auto mx-auto">
                <ejs-button @click="logIn" type="submit" cssClass="e-primary">
                  Zaloguj
                </ejs-button>
              </div>
            </div>
            <ejs-button
              type="button"
              class="mt-3"
              cssClass="e-link e-flat"
              data-bs-toggle="modal"
              data-bs-target="#resetPasswordModal"
            >
              Zapomniałeś hasła? Zresetuj.
            </ejs-button>
            <my-alert
              :msg="errorMsgAlert"
              v-if="errorMsgAlert"
              v-on:close-alert="closeAlert"
            ></my-alert>
            <hr />
            <div class="row">
              <div class="col-auto mx-auto">
                <ejs-button
                  id="google-btn"
                  type="button"
                  @click="signInWithProvider(googleProvider)"
                  cssClass=""
                  class="mt-3"
                >
                  <font-awesome-icon
                    style="color: #4285f4"
                    :icon="['fab', 'google']"
                  ></font-awesome-icon>
                  Kontynuuj z Google
                </ejs-button>
              </div>
            </div>
            <div class="row">
              <div class="col-auto mx-auto">
                <ejs-button
                  id="facebook-btn"
                  @click="signInWithProvider(facebookProvider)"
                  cssClass=""
                  class="mt-3"
                  type="button"
                >
                  <font-awesome-icon
                    style="color: white"
                    :icon="['fab', 'facebook-f']"
                  ></font-awesome-icon>
                  Kontynuuj z Facebook
                </ejs-button>
              </div>
            </div>
            <div class="row">
              <div class="col-auto mx-auto">
                <ejs-button
                  type="button"
                  cssClass="e-outline e-primary"
                  class="mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <font-awesome-icon icon="envelope"></font-awesome-icon>
                  Rejestracja przez e-mail
                </ejs-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <register-modal v-on:register="register"></register-modal>
  <reset-password-modal
    v-on:sendResetPswdEmail="sendResetPswdEmail"
  ></reset-password-modal>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../main";
import RegisterModal from "../components/user/RegisterModal.vue";
import ResetPasswordModal from "../components/user/ResetPasswordModal.vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default {
  name: "Home",
  components: { ResetPasswordModal, RegisterModal },
  setup() {
    const toast = useToast();
    return { v$: useVuelidate(), toast };
  },
  data() {
    return {
      errorMsg: null,
      login: "",
      password: "",
    };
  },
  validations() {
    return {
      login: { required, email, $lazy: true, $autoDirty: false }, // Matches this.contact.email
      password: {
        required,
        minLength: minLength(6),
        $lazy: true,
        $autoDirty: false,
      },
    };
  },
  methods: {
    async signInWithProvider(provider) {
      signInWithPopup(getAuth(), provider)
        .then(async (result) => {
          this.$store.dispatch("SET_USER_DATA", result.user);
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          this.errorMsg = null;
          await this.checkRole();
          await this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    register(formData) {
      createUserWithEmailAndPassword(
        getAuth(),
        formData.inputEmail,
        formData.inputPassword
      )
        .then(async (userCredential) => {
          this.$store.dispatch("SET_USER_DATA", userCredential.user);
          await setDoc(doc(db, "users", userCredential.user.uid), {
            role: "user",
            uid: userCredential.user.uid,
            eMail: userCredential.user.email,
          });
          this.errorMsg = null;
          await this.checkRole();
          await this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    async logIn() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      signInWithEmailAndPassword(getAuth(), this.login, this.password)
        .then(async (userCredential) => {
          this.$store.dispatch("SET_USER_DATA", userCredential.user);
          this.errorMsg = null;
          await this.checkRole();
          await this.$router.push("/dashboard");
          console.log("pushed");
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    sendResetPswdEmail(email) {
      sendPasswordResetEmail(getAuth(), email)
        .then(() => {
          this.toast.success("Link do resetu hasła został wysłany");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
    async checkRole() {
      const currentUserUID = this.$store.getters.userData.uid;
      const docRef = doc(db, "users", currentUserUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.$store.dispatch("SET_USER_ROLE", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    closeAlert() {
      this.errorMsg = null;
    },
    isPropertyInputValid(property) {
      const propertyStatus = this.v$[property];
      if (propertyStatus.$dirty) return !propertyStatus.$error;
      else return false;
    },
  },
  computed: {
    googleProvider() {
      return new GoogleAuthProvider();
    },
    facebookProvider() {
      return new FacebookAuthProvider();
    },
    isFormValid() {
      return !this.v$.$invalid;
    },
    errorMsgAlert() {
      if (this.errorMsg === "auth/invalid-email") {
        return "Brak użytkownika o podanym adresie e-mail";
      } else if (this.errorMsg === "auth/email-already-in-use") {
        return "Istnieje już użytkownik o podanym adresie e-mail";
      } else if (
        this.errorMsg === "auth/invalid-password" ||
        this.errorMsg === "auth/wrong-password"
      ) {
        return "Nieprawidłowe hasło";
      } else if (this.errorMsg === "auth/popup-closed-by-user") {
        return null;
      } else {
        return this.errorMsg;
      }
    },
  },
  updated() {
    console.log(this.v$.login);
  },
  mounted() {
    console.log(this.v$.login);
  },
};
</script>

<style scoped>
#google-btn {
  color: #676767;
  background-color: white;
}

#facebook-btn {
  background-color: #4267b2;
  color: white;
}

button {
  width: 20em;
}

.home-container {
  height: 100vh;
  background-image: linear-gradient(0deg, #ff9d76 0%, #ffffff 100%);
}

.e-card {
  padding: 50px;
}

@media only screen and (min-width: 1300px) {
  #e-card-container {
    width: 50%;
    margin: 50px auto;
  }
  .e-card {
    border-radius: 15% 85% 71% 29% / 48% 56% 44% 52%;
    padding: 100px 125px;
  }
}
</style>
