<template>
  <div class="container mt-5">
    <h3>Mój profil</h3>

    <div class="row">
      <div class="col-3">E-mail</div>
      <div class="col-4">
        {{ userData.email }}
      </div>
      <div class="col-3">{{ emailVerifyText }}</div>
      <div class="col-2" v-if="!userData.emailVerified">
        <ejs-button cssClass="e-primary" @click="sendVerifyEmail">Send verification e-mail</ejs-button>
      </div>
    </div>

    <div class="mt-5">
      <h4>Historia quizów:</h4>
      <quiz-user-history></quiz-user-history>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import QuizUserHistory from "@/components/user/QuizUserHistory";

export default {
  name: "Profile",
  components: { QuizUserHistory },
  data() {
    return {
      userData: {},
    }
  },
  computed: {
    emailVerifyText() {
      if (this.userData.emailVerified) {
        return "Twój e-mail jest zweryfikowany";
      } else {
        return "Zweryfikuj swój e-mail";
      }
    },
  },
  methods: {
    sendVerifyEmail() {
      sendEmailVerification(getAuth().currentUser)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendPasswordReset() {
      sendPasswordResetEmail(getAuth(), getAuth().currentUser.email)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    onAuthStateChanged(getAuth(), user => {
      this.userData = user;
    })
  }
};
</script>

<style scoped></style>
