export default [
  {
    path: "/settings",
    component: () => import(/*webpackChunkName: "auth"*/ "./pages"),
    children: [
      {
        path: "",
        name: "settings",
        component: () =>
          import(/* webpackChunkName: "settings" */ "./pages/Settings.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "account",
        name: "account",
        component: () =>
          import(/* webpackChunkName: "account" */ "./pages/Account.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
