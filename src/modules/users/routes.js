export default [
  {
    path: "/users",
    component: () => import(/*webpackChunkName: "users"*/ "./pages"),
    children: [
      {
        path: "",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "UserList" */ "./pages/UserList.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/user",
    component: () => import(/*webpackChunkName: "users"*/ "./pages"),
    children: [
      {
        path: ":id",
        name: "User",
        props: true,
        component: () =>
          import(/* webpackChunkName: "UserEdit" */ "./pages/UserEdit.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
