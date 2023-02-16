import AuthGuard from "@/auth.guard";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import PurchasesView from "../views/PurchasesView.vue";
import CustomersView from "../views/CustomersView.vue";
import SuppliersView from "../views/SuppliersView.vue";
import UserLogin from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: UserLogin,
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: "/",
      beforeEnter: AuthGuard,
      name: "home",
      component: HomeView,
    },
    {
      path: "/purchases",
      beforeEnter: AuthGuard,
      name: "purchases",
      component: PurchasesView,
    },
    {
      path: "/products",
      beforeEnter: AuthGuard,
      name: "products",
      component: ProductsView,
    },
    {
      path: "/customers",
      beforeEnter: AuthGuard,
      name: "customers",
      component: CustomersView,
    },
    {
      path: "/suppliers",
      beforeEnter: AuthGuard,
      name: "suppliers",
      component: SuppliersView,
    },
  ],
});

export default router;
