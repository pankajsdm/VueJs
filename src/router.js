import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Hotel from "./views/hotels/Hotel.vue";
import UserBooking from "./views/users/Userbooking.vue";
import HotelInfo from "./views/users/hotels/HotelInfo.vue";

import Rooms from "./views/users/hotels/room/Rooms.vue";
import AddRoom from "./views/users/hotels/room/AddRoom.vue";
import RoomType from "./views/users/hotels/room-type/RoomType.vue";
import AddRoomType from "./views/users/hotels/room-type/AddRoomType.vue";

import Options from "./views/users/hotels/options/Options.vue";
import AddOption from "./views/users/hotels/options/AddOption.vue";



import Search from "./views/Search.vue";
import SingleHotel from "./views/hotels/SingleHotel.vue";
import selectCalCost from "./views/hotels/selectCalCost.vue";
import Checkout from "./views/Checkout.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Thanks from "./views/Thanks.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  hash: false,
  /* mode: 'history', */
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },

    {
      path: "/user/bookings",
      name: "userBooking",
      components: {
        header: AppHeader,
        default: UserBooking,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/info",
      name: "hotelInfo",
      components: {
        header: AppHeader,
        default: HotelInfo,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/rooms",
      name: "hotelRooms",
      components: {
        header: AppHeader,
        default: Rooms,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/add-room",
      name: "AddRoom",
      components: {
        header: AppHeader,
        default: AddRoom,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/room-type",
      name: "hotelRoomType",
      components: {
        header: AppHeader,
        default: RoomType,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/add-room-type",
      name: "addRoomType",
      components: {
        header: AppHeader,
        default: AddRoomType,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/options",
      name: "hotelOptions",
      components: {
        header: AppHeader,
        default: Options,
        footer: AppFooter
      }
    },

    {
      path: "/user/hotels/add-option",
      name: "AddHotelOption",
      components: {
        header: AppHeader,
        default: AddOption,
        footer: AppFooter
      }
    },



    {
      path: "/hotels",
      name: "hotels",
      components: {
        header: AppHeader,
        default: Hotel,
        footer: AppFooter
      }
    },

    {
      path: "/hotels/:id",
      name: "hotels",
      components: {
        header: AppHeader,
        default: SingleHotel,
        footer: AppFooter
      }
    },

    {
      path: "/hotel/:hotel_id/:room_id/",
      name: "room",
      components: {
        header: AppHeader,
        default: selectCalCost,
        footer: AppFooter
      }
    },

    {
      path: "/hotel/checkout",
      name: "checkout",
      components: {
        header: AppHeader,
        default: Checkout,
        footer: AppFooter
      }
    },

    {
      path: "/booking/success/:booking_id",
      name: "thanks",
      components: {
        header: AppHeader,
        default: Thanks,
        footer: AppFooter
      }
    },

    {
      path: "/hotel/search",
      name: "search",
      components: {
        header: AppHeader,
        default: Search,
        footer: AppFooter
      }
    },

    {
      path: "/login",
      name: "login",
      components: {
        default: Login
      },
      meta: {
        requiresAuth: true
       }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
