<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <router-link to="/dashboard" class="navbar-brand"> QUIZ </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="userRole" class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link"
                >Mój profil</router-link
              >
            </li>
            <div v-if="userRole">
              <li v-if="userRole.role === 'admin'" class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link to="/quizAdmin" class="dropdown-item" href="#"
                      >Zarządzanie quizami</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/userRoles" class="dropdown-item"
                      >Role użytkowników</router-link
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Ranking użytkowników</a>
                  </li>
                </ul>
              </li>
            </div>
            <li class="nav-item">
              <a @click="logout" to="/profile" class="nav-link">Wyloguj</a>
            </li>
          </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import { getAuth } from "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "TheNavbar",
  methods: {
    logout() {
      getAuth()
        .signOut()
        .then(() => {
          console.log("Succesfully signed out");
        })
        .catch(() => {
          console.log("Error while signing out");
        });
      this.$store.dispatch("SET_USER_DATA", null);
      this.$store.dispatch("SET_USER_ROLE", null);
      this.$router.replace("/");
    },
  },
  computed: {
    ...mapGetters(["userRole"]),
  },
};
</script>

<style scoped></style>
