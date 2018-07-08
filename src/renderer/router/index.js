import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/pages/Page').default,
      children: [
        {
          path: "form",
          name: "form-page",
          component: require("@/pages/children/OrderForm").default
        },
        {
          path: "order",
          name: "order-page",
          component: require("@/pages/children/Order").default
        },
        {
          path: "cash",
          name: "cash-page",
          component: require("@/pages/children/Cash").default
        },
        {
          path: "member",
          name: "member-page",
          component: require("@/pages/children/Member").default
        },
        {
          path: "reservation",
          name: "reservation-page",
          component: require("@/pages/children/Reservation").default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
