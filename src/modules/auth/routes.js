export default [
  {
    path: "/signin",
    component: () => import(/*webpackChunkName: "auth"*/ "./pages"),
    children: [
      {
        path: "",
        component: () =>
          import(/*webpackChunkName: "login"*/ "./pages/SignIn.vue")
      },
      {
        path: "forgot-password",
        component: () =>
          import(
            /*webpackChunkName: "reset-password"*/ "./pages/ResetPassword.vue"
          )
      }
    ]
  }
];
