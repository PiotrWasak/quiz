<template>
  <div class="home-container container text-center mt-5">
    <h1>QUIZ</h1>
  </div>

  <div class="container text-center login-container">
    <form>
      <div class="row mt-4">
        <div class="col-2">
          <label for="login" class="col-form-label">E-mail</label>
        </div>
        <div class="col-10">
          <input
            v-model="loginData.login"
            class="form-control"
            type="email"
            id="login"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-2">
          <label for="password" class="col-form-label">Hasło</label>
        </div>
        <div class="col-10">
          <input
            v-model="loginData.password"
            class="form-control"
            type="password"
            id="password"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-auto mx-auto">
          <button @click="login" type="button" class="btn btn-success">
            Zaloguj
          </button>
        </div>
      </div>
    </form>
    <button
      type="button"
      class="btn btn-link"
      data-bs-toggle="modal"
      data-bs-target="#resetPasswordModal"
    >
      Zapomniałeś hasła? Zresetuj.
    </button>
    <my-alert :msg="errorMsg" v-if="errorMsg"></my-alert>
    <hr />
    <div class="row">
      <div class="col-auto mx-auto">
        <button
          @click="signInWithProvider(googleProvider)"
          type="button"
          class="btn mt-3 btn-primary"
        >
          Kontynuuj z Google
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mx-auto">
        <button
          @click="signInWithProvider(facebookProvider)"
          type="button"
          class="btn mt-3 btn-warning"
        >
          Kontynuuj z Facebook
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mx-auto">
        <button
          type="button"
          class="btn mt-3 btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Rejestracja przez e-mail
        </button>
      </div>
    </div>
  </div>

  <my-modal v-on:register="register"></my-modal>
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
import {db} from "../main";
import MyModal from "../components/Layout/MyModal.vue";
import ResetPasswordModal from "../components/UI/ResetPasswordModal.vue";

export default {
  name: "Home",
  components: { ResetPasswordModal, MyModal },
  data() {
    return {
      errorMsg: null,
      loginData: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    signInWithProvider(provider) {
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          this.$store.dispatch("SET_USER_DATA", result.user);
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          this.errorMsg = null;
          this.$router.push("/dashboard");
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
            role: "user"
          });
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    login() {
      signInWithEmailAndPassword(
        getAuth(),
        this.loginData.login,
        this.loginData.password
      )
        .then((userCredential) => {
          this.$store.dispatch("SET_USER_DATA", userCredential.user);
          this.errorMsg = null;
          this.checkRole();
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    sendResetPswdEmail(email) {
      sendPasswordResetEmail(getAuth(), email)
          .then(() => {
            console.log("Email reset send");
          }).catch(error=>{
        console.log(error.code);
      })
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
  },
  computed: {
    googleProvider() {
      return new GoogleAuthProvider();
    },
    facebookProvider() {
      return new FacebookAuthProvider();
    },
  },
};
</script>

<style scoped>
.svg-inline--fa {
  color: orange;
  font-size: 2rem;
}

.login-container {
  margin-top: 5em;
  width: 30em;
}
</style>
