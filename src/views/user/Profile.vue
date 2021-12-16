<template>
  <div class="container">
    <h1>Profile</h1>

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
  </div>
</template>

<script>
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";

export default {
  name: "Profile",
  data() {
    return {
      userData: {},
    }
  },
  computed: {
    emailVerifyText() {
      if (this.userData.emailVerified) {
        return "Your e-mail has been verified";
      } else {
        return "Please verify your e-mail";
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
