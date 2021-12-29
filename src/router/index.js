import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import DashBoard from "../views/user/DashBoard.vue";
import Profile from "../views/user/Profile.vue";
import ManageQuizzes from "@/views/admin/ManageQuizzes";
import QuizEdit from "@/views/admin/QuizEdit";
import AddQuiz from "@/views/admin/AddQuiz";
import UserRoles from "@/views/admin/UserRoles";
import NotFound404 from "@/views/NotFound404";
import TakeQuiz from "@/views/user/TakeQuiz";
import TakeQuizQuestion from "@/views/user/TakeQuizQuestion";
import TakeQuizSummary from "@/views/user/TakeQuizSummary";
import QuizRanking from "@/views/admin/QuizRanking";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { subtitle: "" },
    beforeEnter: (to, from) => {
      const user = store.getters.userRole;
      if (user) {
        return "/dashboard";
      } else {
        return true;
      }
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
    meta: { subtitle: "Profil", requiresAuth: true },
  },
  {
    path: "/quizAdmin",
    name: "Quiz-admin",
    component: ManageQuizzes,
    meta: { subtitle: "Admin", requiresAdminRole: true },
  },
  {
    path: "/quizAdmin/:id",
    name: "QuizEdit",
    component: QuizEdit,
    props: true,
    meta: { subtitle: "Edycja", requiresAdminRole: true },
  },
  {
    path: "/addQuiz",
    name: "AddQuiz",
    component: AddQuiz,
    meta: { subtitle: "Dodawanie", requiresAdminRole: true },
  },
  {
    path: "/userRoles",
    name: "UserRoles",
    component: UserRoles,
    meta: { subtitle: "Role", requiresAdminRole: true },
  },
  {
    path: "/quizSummary/:id",
    name: "QuizSummary",
    component: TakeQuizSummary,
    props: true,
    meta: { subtitle: "Podsumowanie", requiresAuth: true },
  },
  {
    path: "/ranking",
    name: "QuizRanking",
    component: QuizRanking,
    meta: { subtitle: "Ranking", requiresAdminRole: true },
  },
  {
    path: "/quiz/:id",
    name: "Quiz",
    component: TakeQuiz,
    props: true,
    meta: { subtitle: "Quiz", requiresAuth: true },
    children: [
      {
        path: ":questionIndex",
        name: "QuizQuestion",
        component: TakeQuizQuestion,
        props: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.meta.subtitle) {
    document.title = `Quiz - ${to.meta.subtitle}`;
  }

  const user = store.getters.userRole;
  if (to.meta.requiresAuth) {
    if (user) {
      return true;
    } else {
      return "/";
    }
  }
  if (to.meta.requiresAdminRole) {
    if (store.getters.userRole.role === "admin") {
      return true;
    } else {
      return false;
    }
  }
});

export default router;
