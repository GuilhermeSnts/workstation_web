export default [
  {
    path: "/",
    name: "Dashboard",
    component: () => import(/*webpackChunkName: "login"*/ "./pages"),
    meta: {
      requiresAuth: true
    }
  }
];
