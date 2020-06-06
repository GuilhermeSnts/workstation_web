import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  // AUTH
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
        path: "reset",
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
  },
  {
    path: "/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Account.vue"),
    meta: {
      requiresAuth: true
    }
  },

  // CUSTOMERS

  {
    path: "/customers",
    name: "customers",
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/Customers.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        component: () =>
          import(
            /*webpackChunkName: "customer-list"*/ "../components/customers/CustomerList.vue"
          )
      },
      {
        path: ":id",
        component: () =>
          import(
            /*webpackChunkName: "customer-page"*/ "../components/customers/CustomerPage.vue"
          )
      }
    ]
  },
  {
    path: "/work-orders",
    name: "workOrders",
    component: () =>
      import(/* webpackChunkName: "orkorders" */ "../views/WorkOrders.vue"),
    meta: {
      requiresAuth: true,
      title: "Ordens De Serviço",
      icon: "mdi-file-outline"
    }
  },
  {
    path: "/work-orders/:internal_code",
    name: "workOrderPanel",
    component: () =>
      import(
        /* webpackChunkName: "workOrderPanel" */ "../views/WorkOrderPanel.vue"
      ),
    meta: {
      requiresAuth: true,
      title: "Ordem De Serviço",
      icon: "mdi-file-outline"
    }
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/Tickets.vue"),
    meta: {
      requiresAuth: true,
      title: "Chamados",
      icon: "mdi-ticket"
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
