import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import moment from 'moment'

Vue.prototype.moment = moment; 

import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';
Vue.use(AirbnbStyleDatepicker)



import Tabs from 'vue-tabs-component';
Vue.use(Tabs);

/* importing Agile slider */
import VueAgile from 'vue-agile'
Vue.use(VueAgile);
/* end importing Slider */

/* importing Loader */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);
/* end importing Loader */

/* importing Bootstrap */
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
/* end importing Bootstrap */



/* importing Toast */
import Toasted from 'vue-toasted';
Vue.use(Toasted)
/* end importing Toast */

Vue.mixin({
  
  methods: {

    showLoading: function () {
        return this.$loading.show({
            container: this.$refs.loaderContainer,
            width: 40,
            height: 40,
        });
    },

    checkLogin: function(){
      if(!localStorage.getItem('user_data')){
        router.replace('/login');
      }
    },

    successTosted: function(err, position='top-center'){
      let toast = this.$toasted.show('Success! '+err, { 
          theme: "bubble",
          position: position, 
          className: 'successTosted',
          duration : 5000
      });
    },

    errorTosted: function(err, position='top-center'){
      let toast = this.$toasted.show('Error! '+err, { 
          theme: "bubble",
          position: position, 
          className: 'errorTosted',
          duration : 5000
      });
    }
  }
});


/* importing Validate */
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
/* end importing Validate */



console.log("get VUE_APP_BASE_URI", process.env)
Vue.config.productionTip = false;


/* router.beforeEach((to, from, next) => {
  const requiresAuth = true;
  if(requiresAuth) {
    next({ path: '/', query: { redirect: to.fullPath }});
  } else {
    next();
  }
}); */

Vue.use(Argon);
new Vue({
  router, 
  render: h => h(App)
}).$mount("#app");




  