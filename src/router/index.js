import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import authRoutes from "../modules/auth/routes.js";
import dashboardRoutes from "../modules/dashboard/routes.js";
Vue.use(VueRouter);

const routes = [
  ...dashboardRoutes,
  ...authRoutes,
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

  // Work Orders
  {
    path: "/work-orders",
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/WorkOrders.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        component: () =>
          import(
            /*webpackChunkName: "Work-Orders"*/ "../components/workOrders/WorkOrders.vue"
          )
      },
      {
        path: ":internal_code",
        component: () =>
          import(
            /*webpackChunkName: "WorkOrder-Panel"*/ "../components/workOrders/WorkOrderPanel.vue"
          )
      }
    ]
  },

  // Tickets
  {
    path: "/tickets",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/Tickets.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        component: () =>
          import(
            /*webpackChunkName: "Ticket-List"*/ "../components/tickets/TicketList.vue"
          )
      },
      {
        path: ":id",
        component: () =>
          import(
            /*webpackChunkName: "Ticket-Panel"*/ "../components/tickets/TicketPanel.vue"
          )
      }
    ]
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
        path: "/signin",
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
