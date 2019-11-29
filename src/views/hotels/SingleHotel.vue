<template>
  <keep-alive>
    <div class="site-section bg-light ">
      <div class="container">

        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/hotels">Hotel</router-link>
          </li>
          <li class="breadcrumb-item active">Rooms</li>
        </ol>

        <!--  <pre>{{hotel}}</pre> -->

        <div class="row mb-5 hotelLoading">

          <div class="col-md-12 mb-5">
            <div class="block-3 d-md-flex">
              <!--  <div class="image" style="background-image: url('img/hms/img_1.jpg'); "></div> -->


              <div class="col-md-12 mb-2">

                <div class="block-3 ">
                  <div class="row paddingTop">
                    <div class="col-md-8">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <input class="form-control" type="text" id="datepicker-trigger" required="true" placeholder="Select dates"
                          readonly="true" :value="formatDates(dateOne, dateTwo)">
                        <AirbnbStyleDatepicker :trigger-element-id="'datepicker-trigger'" :mode="'range'"
                          :fullscreen-mobile="true" :date-one="today" :date-two="dayNext" :months-to-show="2"
                          :showActionButtons="true" @date-one-selected="val => { dateOne = val }" @date-two-selected="val => { dateTwo = val }" @apply="setNewDate" />
                      </base-input>
                    </div>
                    <div class="col-md-8">
                      <template v-if="hotel.images.length==0">
                        <img :src="url+'/hotel/dummyHotel.jpg'" width="100%">
                      </template>
                      <template v-else>
                        <agile :infinite="false">
                          <div class="slide slide--1" v-for="img in hotel.images" :key="img">
                            <img :src="img">
                          </div>
                        </agile>
                      </template>

                    </div>

                    <div class="col-md-4">
                      <div class="text">

                        <h2 class="normalHeading"> Hotel</h2>{{hotel.name}}
                        <h2 class="normalHeading">Owner </h2>{{hotel.owner}}
                        <h2 class="normalHeading">Total Room </h2>{{hotel.rooms}}
                        <h2 class="normalHeading">Contact </h2>{{hotel.phone}}

                        <div v-if="hotel.landmarks.street">
                          <h2 class="normalHeading">Address:</h2> {{hotel.landmarks.street}}, {{hotel.landmarks.city}},
                          {{hotel.landmarks.state}}, {{hotel.landmarks.country}}<br>
                          <h2 class="normalHeading"></h2>
                        </div>
                        <!-- <router-link to="/hotel/room" class="btn btn-primary">Select Hotel</router-link> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="block-33">
              <div class="text">
                <blockquote>
                  <p>{{hotel.description}}</p>
                </blockquote>

              </div>
            </div>
          </div>


          <div class="col-md-12 mb-12" v-if="hotel.roomTypes.length>0">

            <tabs :options="{ defaultTabHash: hotel.roomTypes[0].name }">
              <tab v-for="(roomType, index) in hotel.roomTypes" :key="index" :id="roomType.id" :name="roomType.name">
                <div class="block-3">
                  <div class="row paddingTop">
                    <div class="col-3">
                      <ul class="specs mb-8">
                        <li>Adults: {{roomType.maxPeople}}</li>
                        <li>Beds: {{roomType.beds}}</li>
                      </ul>
                    </div>
                    <div class="col-6">
                      <ul class="headingUl">
                        <li><strong></strong></li>
                      </ul>
                      <ul class="specs mb-8">
                        <li v-for="amnts in roomType.amenities" :key="amnts">{{amnts}}</li>
                      </ul>
                    </div>

                  </div>
                </div>

                <div class="col-md-12 text-center p-2" v-if="roomType.isAvailable">
                  <router-link :to="'/hotel/'+$route.params.id+'/'+roomType.id" class="btn btn-primary">Select Room</router-link>
                </div>

                <div class="col-md-12 text-center p-2" v-if="!roomType.isAvailable">
                  Room not available
                </div>
              </tab>
            </tabs>
          </div>

        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
  import format from 'date-fns/format'
  import axios from "axios";
  export default {

    beforeMount() {
      var selected_dates = JSON.parse(localStorage.getItem('selected_date'));
      if (selected_dates) {
        this.dayFrom = selected_dates.check_in;
        this.dayTo = selected_dates.check_out;
        this.today = new Date(this.dayFrom);
        this.dayNext = new Date(this.dayTo);
      }
    },

    mounted() {
      /* console.log("SingleRoomVuewFile", this.$route.params.id)
      console.log("get VUE_APP_BASE_URI", process.env.VUE_APP_BASE_URI); */

      this.getSingleHotel();
      console.log("Single Hotel Page");

    },

    data() {

      var dayFrom = new Date();
      var nextDay = new Date(dayFrom);
      nextDay.setDate(nextDay.getDate() + 1);

      return {
        dates: {
          simple: '',

        },
        dateFormat: 'MMM D, YYYY',
        dateOne: '',
        url: window.location.origin,
        dateTwo: '',
        loader: '',
        hotel: {
          roomTypes: {
            length: 0
          },
          images: {
            length: 0
          },
          landmarks: []
        },

      };
    },
    methods: {

      formatDates(dateOne, dateTwo) {
        let formattedDates = ''
        if (dateOne) {
          formattedDates = format(dateOne, this.dateFormat)
          //this.today = formattedDates;
        }
        if (dateTwo) {
          formattedDates += ' - ' + format(dateTwo, this.dateFormat)
          ///this.dayNext = format(dateTwo, this.dateFormat);
        }
        return formattedDates;
      },

      setNewDate(){
          this.loader = this.showLoading();
          var dateOne = new Date(this.dateOne);
          var dateTwo = new Date(this.dateTwo);

          this.selected_dates ={
            check_in: dateOne,
            check_out: dateTwo,
          }
          localStorage.setItem('selected_date', JSON.stringify(this.selected_dates));

          let prms = {
            hotelId: this.$route.params.id,
            checkInDate: dateOne,
            checkOutDate: dateTwo
          }
          axios.post(process.env.VUE_APP_BASE_URI + '/hotels/' + this.$route.params.id, prms).then(result => {
              this.loader.hide();

              if (result.data.success) {
                this.hotel = result.data.data;
              }
          }, error => {
              console.error(error);
          });

      },

      getSingleHotel() {
        this.loader = this.showLoading();
        var dayFrom, nextDay;
        var selected_dates = JSON.parse(localStorage.getItem('selected_date'));
        if (selected_dates) {
          dayFrom = selected_dates.check_in;
          nextDay = selected_dates.check_out;
        } else {
          dayFrom = new Date();
          nextDay = new Date(dayFrom);
          nextDay.setDate(dayFrom.getDate() + 1);
        }

        let params = {
          hotelId: this.$route.params.id,
          checkInDate: dayFrom,
          checkOutDate: nextDay
        }

        axios.post(process.env.VUE_APP_BASE_URI + '/hotels/' + this.$route.params.id, params).then(result => {
          this.loader.hide();

          if (result.data.success) {
            this.hotel = result.data.data;
          }

        }, error => {
          console.error(error);
        });

      },
    }
  };
</script>
<style>
  .slide img {
    height: 400px;
  }

  .paddingTop {
    padding-top: 15px;
  }

  .headingUl {
    list-style-type: none;
  }

  .block-3 .text {
    width: 100%;
    padding: 9% 0%;
  }

  .col-3 .btn-primary {
    margin-top: 48px;
  }

  .specs.mb-4 ul {
    margin-left: 30px !important;
  }

  .specs.mb-4 ul li {
    list-style-type: disc !important;
  }

  .normalHeading {
    margin-top: 7px;
    width: 213px;
  }

  .normalHeading span {
    margin-top: 3px;
    float: right;
    font-size: 14px;
    color: gray;
  }

  .hotelLoading {
    min-height: 400px !important;
  }

  #datepicker-trigger {
    border-right: 1px solid #ccc;
    border-radius: 0px 5px 5px 0px;
  }
</style>