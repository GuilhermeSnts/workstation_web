export default [
  {
    path: "/work-orders",
    component: () => import(/*webpackChunkName: "WorkOrders"*/ "./pages"),
    children: [
      {
        path: "",
        name: "WorkOrderList",
        component: () =>
          import(
            /* webpackChunkName: "WorkOrderList" */ "./pages/WorkOrderList.vue"
          ),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/work-order",
    component: () => import(/*webpackChunkName: "WorkOrder"*/ "./pages"),
    children: [
      {
        path: ":internal_code",
        name: "WorkOrderView",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "WorkOrderView" */ "./pages/WorkOrderView.vue"
          ),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];
