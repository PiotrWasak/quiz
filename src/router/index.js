import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import DashBoard from "../views/User/DashBoard.vue";
import Profile from "../views/User/Profile.vue";
import ManageQuizzes from "@/views/admin/ManageQuizzes";
import QuizEdit from "@/components/admin/QuizEdit";
import AddQuiz from "@/views/admin/AddQuiz";
import UserRoles from "@/views/admin/UserRoles";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { subtitle: "" },
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          next("/dashboard");
        } else {
          next();
        }
      });
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard,
    meta: { subtitle: "Dashboard", requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { subtitle: "Dashboard", requiresAuth: true },
  },
  {
    path: "/quizAdmin",
    name: "Quiz-admin",
    component: ManageQuizzes,
    meta: { subtitle: "quizAdmin", requiresAuth: true },
  },
  {
    path: "/quizAdmin/:id",
    name: "QuizEdit",
    component: QuizEdit,
    props: true,
  },
  {
    path: "/addQuiz",
    name: "AddQuiz",
    component: AddQuiz,
  },
  {
    path: "/userRoles",
    name: "UserRoles",
    component: UserRoles,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    onAuthStateChanged(getAuth(), (user) => {
      // store.dispatch("SET_USER_DATA", user);
      if (user) {
        next();
      } else {
        next("/");
      }
    });
  } else {
    next();
  }
});

export default router;
