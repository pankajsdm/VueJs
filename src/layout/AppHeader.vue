<template>
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      

      <template v-if="role==1 || !role">
          <router-link to="/" class="navbar-brand">
            <div class="col-md-12 section-heading logo"><h2 class="heading">Cloud Booking </h2></div>
          </router-link>
      </template>
      <template v-else>
        <a  class="navbar-brand" href="javascript:void(0)" style="cursor: default;">
          <div class="col-md-12 section-heading logo"><h2 class="heading">Cloud Booking </h2></div>
        </a>
      </template>


      

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="oi oi-menu"></span> Menu
      </button>

      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">


            <li class="nav-item" v-if="role==1 || role==''"><router-link to="/hotels" class="dropdown-item nav-link">Hotels</router-link></li>

            <!-- <li class="nav-item"><router-link to="/profile" class="nav-link">Profile</router-link></li> -->
            <li class="nav-item" v-if="username==''"><router-link to="/login" class="dropdown-item nav-link">Login</router-link></li>
           
            <li class="nav-item" v-if="role==2"><router-link to="/user/hotels/info" class="dropdown-item nav-link">Info</router-link></li>

            <li class="nav-item" v-if="role==2">

                 <template v-if="getUser.user.hotelId">
                     <router-link to="/user/hotels/rooms" class="dropdown-item nav-link">Room</router-link>
                  </template>
                  <template v-else>Rooms</template>

            </li>

            <li class="nav-item" v-if="role==2">

                 <template v-if="getUser.user.hotelId">
                     <router-link to="/user/hotels/room-type" class="dropdown-item nav-link">Room Type</router-link>
                  </template>
                  <template v-else>
                      Room Type
                  </template>

            </li>

            <li class="nav-item" v-if="role==2">
                 <template v-if="getUser.user.hotelId">
                     <router-link to="/user/hotels/options" class="dropdown-item nav-link">Options</router-link>
                  </template>
                  <template v-else>
                      Options
                  </template>
            </li>

            <li class="nav-item" v-if="role==1 || role==2">

                  <template v-if="role==2">
                     <template v-if="getUser.user.hotelId">
                      <router-link to="/user/bookings" class="dropdown-item nav-link">{{bookingsLebel}}</router-link>
                    </template>
                    <template v-else>
                        {{bookingsLebel}}
                    </template>
                  </template>

                  <template v-if="role==1">
                    <router-link to="/user/bookings" class="dropdown-item nav-link">{{bookingsLebel}}</router-link>
                  </template>
              
                 
            </li>
          
            <li class="nav-item userName" v-if="username!=''">Welcome! {{username}}</li>

            <li class="nav-item userName" v-if="username!=''" v-on:click="signOut()">
              <i title="Sign out" class="fa fa-sign-out" style="font-size:18px;color:red"></i>
            </li>
        </ul>
      </div>
    </div>
  </nav>



</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import router from './../router';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data () {
    return {
        loader: '',
        username: '',
        getUser: {},
        bookingsLebel: 'Bookings',
        isBookingDesable: false,
        role: '',
    }
  },
  mounted: function () { 
    
    this.loginEvent();

    this.createdHotelInfoEvent();

    if(localStorage.getItem('user_data')){
      var users = JSON.parse(localStorage.getItem('user_data'));
      this.getUser = users;
      this.username = users.user.firstName;
      this.role = users.user.role;

      if(this.role==2){
        this.bookingsLebel = 'Bookings';
      }else{
         this.bookingsLebel = 'My Bookings';
      }
    }
  },

  methods: {
    signOut(){
      this.showLoader();
      localStorage.clear();
      setTimeout( () => {
        this.loader.hide();
        this.username = '';
        this.role = '';
        router.replace('/');
      }, 1000);
    },

    loginEvent(){
      this.$root.$on('loginEvent', (data) => {
      this.username = data.user.firstName;
      this.role = data.user.role;
      if(this.role==2){
        this.bookingsLebel = 'Bookings';
      }else{
         this.bookingsLebel = 'My Bookings';
      }
      console.log(this.role);
      });
    },

     createdHotelInfoEvent(){
      this.$root.$on('createdHotelInfo', (data) => {
        this.getUser = data;
        console.log('hotel_info', this.getUser);
      });
    },

    showLoader() {
            this.loader = this.$loading.show({
                container: this.$refs.loaderContainer,
                width: 40,
                height: 40,
            });
        },
  }
};
</script>
<style>
.logo .heading{color:#fff !important;}
li.nav-item.userName {color: #fff;text-transform: capitalize; font-size: 12px; margin-top: 4px;}
</style>
