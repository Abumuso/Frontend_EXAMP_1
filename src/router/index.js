import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import superadmin from "./superadmin";
import admin from "./admin";
import notfounded from "./notfounded";

const routes = [auth, admin, superadmin, notfounded];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const name = to.name === "auth";
  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && name) {
      return next({ name: "admin" });
    } else {
      next();
    }
  }
});

export default router;
