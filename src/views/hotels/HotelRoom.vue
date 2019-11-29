<template>
  <div class="site-section bg-light">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 mb-5">
          <div class="block-3 d-md-flex">
            <!--  <div class="image" style="background-image: url('img/hms/img_1.jpg'); "></div> -->

            <div class="col-md-12 mb-2">
              <div class="block-3">
                <div class="row paddingTop">
                  
                  <div class="col-md-4">
                    <div class="text">
                      <h2 class="heading">Single Room</h2>
                      <p>Our single rooms are ideal for one person. Our single rooms overlook the street, and all have double glazing. Single rooms have a single bed (120cm), en-suite bathroom with bath and toilet. For children under the age of 2, cots are available and can be requested at the time of booking.</p>

                      <p>
                          <router-link to="/hotel/checkout" class="btn btn-primary py-3 px-5"> Book Now</router-link>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <agile :infinite="false">
                      <div class="slide slide--1"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/rock.jpg"></div>
                      <div class="slide slide--2"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/grooves.jpg"></div>
                      <div class="slide slide--3"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/arch.jpg"></div>
                      <div class="slide slide--4"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/5689/sunset.jpg"></div>
                    </agile>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>


        <div class="col-md-12 section-heading">
            <span class="subheading-sm">
                <h2 class="heading">Room Facility</h2>
            </span>
        </div>    
        <div class="col-md-6 mb-2">
          <div class="block-3">

            <div class="row paddingTop">
                
              <div class="col-12">
                <div class="col-lg-12 pl-md-12">
  			
                    <div class="media block-6">
                        <div class="icon"><span class="ion-ios-checkmark"></span></div>
                        <div class="media-body">
                        <h3 class="heading">Luxury Rooms</h3>
                        <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                        </div>
                        
                    </div>     

                    <div class="media block-6">
                    <div class="icon"><span class="ion-ios-checkmark"></span></div>
                    <div class="media-body">
                    <h3 class="heading">Fast &amp; Free Wifi</h3>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                    </div>
                    </div>   

                    <div class="media block-6">
                    <div class="icon"><span class="ion-ios-checkmark"></span></div>
                    <div class="media-body">
                    <h3 class="heading">Travel Accomodation</h3>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                    </div>
                    </div>   
                    </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-2">
          <div class="block-3">

            <div class="row paddingTop">
                
                <div class="col-12">
                    <div class="col-lg-12 pl-md-12">
  			
                    <div class="media block-6">
                        <div class="icon"><span class="ion-ios-checkmark"></span></div>
                        <div class="media-body">
                        <h3 class="heading">Breakfast Included</h3>
                        <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                        </div>
                        
                    </div>     

                    <div class="media block-6">
                    <div class="icon"><span class="ion-ios-checkmark"></span></div>
                    <div class="media-body">
                    <h3 class="heading">Fast &amp; Mountain view</h3>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                    </div>
                    </div>   

                    <div class="media block-6">
                    <div class="icon"><span class="ion-ios-checkmark"></span></div>
                    <div class="media-body">
                    <h3 class="heading">120 sq mt.</h3>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                    </div>
                    </div>   
                    </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueAgile from 'vue-agile'

  Vue.use(VueAgile);

  /* import Vue from "vue";
  import App from "./../../App.vue";

  import VueCarousel from '@chenfengyuan/vue-carousel';
  Vue.component(VueCarousel.name, VueCarousel);

  Vue.component('img-slider', {
    template: '#img-slider-template',
    replace: true
  })

  new Vue({
    el: '#demo',
    data () {
        return {}
      }
  }) */

  export default {

    name: "components",
    components: {},


    mounted() {
      console.log("SingleRoomVuewFile")
    },

    data() {

      return {
        dates: {
          simple: ""
        },



      };
    },
    methods: {

    }
  };
</script>
<style>
  .paddingTop {
    padding-top: 15px;
  }
  .headingUl {
    list-style-type: none;
  }
  .block-3 .text{width: 100%; padding: 9% 0%;}
</style>