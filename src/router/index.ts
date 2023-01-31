import AuthGuard from "@/auth.guard";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      beforeEnter: AuthGuard,
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: UserLogin,
    },
  ],
});

export default router;
