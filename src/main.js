import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import { router } from './router';
import store from './vuex/store';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors'
import moment from 'moment'
import VueLocalStorage from 'vue-localstorage'

import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})

Vue.prototype.moment = moment

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: "AIzaSyAX4ZaIGciNYixBC52vwyjw0uNGAlmX1fg",
});

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.darken3,
    secondary: colors.teal.lighten3,
    accent: "#FF8A80",
    error: colors.red.accent3
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
