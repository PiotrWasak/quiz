<template>
  <div class="container mt-5">
    <h3 class="text-center">Mój profil</h3>

    <div class="row">
      <div class="col-sm-3">E-mail</div>
      <div class="col-sm-4">
        {{ userData.email }}
      </div>
      <div class="col-sm-3">{{ emailVerifyText }}</div>
      <div class="col-sm-2" v-if="!userData.emailVerified">
        <ejs-button cssClass="e-primary" @click="sendVerifyEmail"
          >Zweryfikuj e-mail</ejs-button
        >
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
  onAuthStateChanged,
} from "firebase/auth";
import QuizUserHistory from "@/components/user/QuizUserHistory";
import { useToast } from "vue-toastification";

export default {
  name: "Profile",
  components: { QuizUserHistory },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      userData: {},
    };
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
          this.toast.success(
            `Wysłano e-mail na ${this.$store.getters.userData.email}`
          );
        })
        .catch((error) => {
          this.toast.error("Wystąpił błąd");
        });
    },
    sendPasswordReset() {
      sendPasswordResetEmail(getAuth(), getAuth().currentUser.email)
        .then(() => {
          this.toast.success(
            `Wysłano e-mail na ${this.$store.getters.userData.eMail}`
          );
        })
        .catch((error) => {
          this.toast.error("Wystąpił błąd");
        });
    },
  },
  created() {
    onAuthStateChanged(getAuth(), (user) => {
      this.userData = user;
    });
  },
};
</script>

<style scoped></style>
