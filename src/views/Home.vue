<template>
  <div class="home-container container-fluid text-center pt-5">
    <div id="e-card-container">
      <div class="e-card">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title"><h1>Quiz CRA</h1></div>
          </div>
        </div>

        <div class="e-card-content text-center mt-5">
          <div class="row mt-4">
            <div class="col-2">
              <label for="login" class="col-form-label">E-mail</label>
            </div>
            <div class="col-10">
              <input
                v-model="loginData.login"
                class="e-input"
                placeholder="Wprowadź e-mail"
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
                class="e-input"
                placeholder="Wprowadź hasło"
                type="password"
                id="password"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-auto mx-auto">
              <ejs-button @click="login" type="submit" cssClass="e-success">
                Zaloguj
              </ejs-button>
            </div>
          </div>
          <button
            class="btn btn-link"
            data-bs-toggle="modal"
            data-bs-target="#resetPasswordModal"
          >
            Zapomniałeś hasła? Zresetuj.
          </button>
          <my-alert
            :msg="errorMsg"
            v-if="errorMsg"
            v-on:close-alert="closeAlert"
          ></my-alert>
          <hr />
          <div class="row">
            <div class="col-auto mx-auto">
              <ejs-button
                id="google-btn"
                @click="signInWithProvider(googleProvider)"
                cssClass="e-primary"
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
                cssClass="e-primary"
                class="mt-3"
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
                cssClass="e-primary"
                class="mt-3"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <font-awesome-icon icon="envelope"></font-awesome-icon>
                Rejestracja przez e-mail
              </ejs-button>
            </div>
          </div>
        </div>
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
import { db } from "../main";
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
          console.log(userCredential.user.providerData);
          await setDoc(doc(db, "users", userCredential.user.uid), {
            role: "user",
            uid: userCredential.user.uid,
            eMail: userCredential.user.email,
          });
        })
        .catch((error) => {
          this.errorMsg = error.code;
        });
    },
    login() {
      console.log("login");
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
}

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
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
}
#e-card-container{
  width: 50%;
  margin: 50px auto;
}
</style>
