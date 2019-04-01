import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './vuex/store'

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/event/:id',
      props: true,
      name: 'Event',
      beforeRouteEnter(to, from, next) {
        store.dispatch("getEvent", Number(to.params.id));
        next();
      },
      component: () => import('./views/Event.vue')
    },
    {
      path: '/volunteer/calendar/:volID',
      props: true,
      name: "VolCalendar",
      component: () => import('./views/VolCalendar.vue')
    },
    {
      path: '/npo/:id',
      props: true,
      name: 'NPO',
      component: () => import('./views/NPO.vue')
    },
    {
      path: '/calendar/npo/:npoID',
      props: true,
      name: 'NPOCalendar',
      beforeRouteEnter(to, from, next) {
        store.dispatch("getOneNPO", Number(to.params.npoID));
        next();
      },
      component: () => import('./views/NPOCalendar.vue')
    },
    {
      path: '/new/event/:npoID',
      props: true,
      name: 'NewEvent',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/NewEvent.vue')
    },
    {
      path: '/event/edit/:eventID/:npoID',
      props: true,
      name: "EditEvent",
      meta: {
        requiresAuth: true
      },
      beforeRouteEnter(to, from, next) {
        store.dispatch("getEvent", Number(to.params.eventID));
        next();
      },
      component: () => import('./views/EditEvent.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.loggedInUserID) {
      next()
      return
    }
    next('/login')
  } else {
    const isLoginRoute = to.fullPath === "/login"
    if (store.state.loggedInUserID && isLoginRoute) {
      next('/')
    } else {
      next()
    }
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresNPOAuth)) {
//     if (store.state.loggedInUserID && store.state.loggedInUserRole === "NPO" && record.npoID === store.state.loggedInUserID) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     const isLoginRoute = to.fullPath === "/login"
//     if (store.state.loggedInUserID && isLoginRoute) {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })