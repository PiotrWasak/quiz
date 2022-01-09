<template>
  <div class="container mt-5">
    <div class="card-container">
      <div tabindex="0" class="e-card" id="basic">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-title">ID</div>
            <h3 class="text-center">
              <font-awesome-icon icon="user-circle"></font-awesome-icon> Mój
              profil
            </h3>
          </div>
        </div>
        <div class="e-card-content text-center">
          <p>{{ userData.email }}</p>
          <p v-if="userRole === 'admin'">Administrator</p>
          {{ emailVerifyText }}
          <ejs-button
            v-if="!userData.emailVerified"
            cssClass="e-primary"
            @click="sendVerifyEmail"
            >Zweryfikuj e-mail</ejs-button
          >
        </div>
      </div>
    </div>
    <div class="text-center mt-5 row">
      <div class="col-12">
        <ejs-button @click="showHistory" cssClass="e-primary"
          >{{ toggleHistoryText }} historie</ejs-button
        >
      </div>
    </div>
      <div v-if="isHistoryVisible" class="mt-5">
        <h4>
          <font-awesome-icon icon="history"></font-awesome-icon> Historia quizów
        </h4>
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
import QuizUserHistory from "@/components/user/QuizUserHistoryList";
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
      isHistoryVisible: false,
    };
  },
  computed: {
    toggleHistoryText() {
      if (this.isHistoryVisible) return "Ukryj";
      else return "Pokaż";
    },
    emailVerifyText() {
      if (this.userData.emailVerified) {
        return "Twój e-mail jest zweryfikowany";
      } else {
        return "Zweryfikuj swój e-mail";
      }
    },
    userRole() {
      return this.$store.getters.userRole.role;
    },
  },
  methods: {
    showHistory() {
      this.isHistoryVisible = !this.isHistoryVisible;
    },
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.card-container {
  width: 50%;
}
</style>
