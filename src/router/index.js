import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    component: () => import(/*webpackChunkName: "auth"*/ "../views/Auth.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(/*webpackChunkName: "login"*/ "../views/Login.vue")
      },
      {
        path: "",
        component: () =>
          import(
            /*webpackChunkName: "reset-password"*/ "../views/ResetPassword.vue"
          )
      }
    ]
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: "/auth",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
