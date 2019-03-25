import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
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
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/event/:id',
      props: true,
      name: 'Event',
      component: () => import('./views/Event.vue')
    },
    {
      path: '/volunteer/calendar',
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
      path: '/new/event/:npoID',
      props: true,
      name: 'NewEvent',
      component: () => import('./views/NewEvent.vue')
    }
  ],
});
