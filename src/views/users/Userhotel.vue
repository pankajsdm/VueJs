<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">




            <div class="row mb-8 hotelLoading slightMargin50px">

                <div class="col-md-4">
                    <div class="block-3">
                        <div class="nav-side-menu">
                            <div class="menu-list">

                                <ul id="menu-content" class="menu-content">
                                    <li>
                                       

                                        <router-link to="/user/bookings">
                                            <i class="fa fa-dashboard fa-lg fa-fw sidebar-icon"></i> Bookings
                                        </router-link>

                                    </li>

                                    <li>
    

                                        <router-link to="/user/hotels">
                                            <i class="fa fa-calendar fa-lg fa-fw sidebar-icon"></i>Hotels
                                        </router-link>

                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-md-8">
                    <!-- <pre>{{bookings}}</pre> -->
                    <h1 class="display-4">All Hotels</h1><br>
                    <table id="cart" class="table table-hover table-condensed">
                        <tbody>
                            <tr>
                                <th>No.</th>
                                <th>Hotel</th>
                                <th>Room</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Room Type</th>
                                <th>Cost</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="(booking, index) in bookings" :key="index">
                                <td data-th="Price">{{index+1}}</td>
                                <!-- <td data-th="Price">{{booking.id}}</td> -->
                                <td data-th="Price" v-if="booking.hotelId">
                                    {{booking.hotelId.name}}
                                </td>
                                <td data-th="Price" v-if="booking.selectedRoomType">{{booking.selectedRoomType.name}}</td>
                                <td data-th="Price">{{moment(booking.checkInDate).format('MMMM DD, Y')}}</td>
                                <td data-th="Price"> {{moment(booking.checkOutDate).format('MMMM DD, Y')}}</td>


                                <td data-th="Price">


                                    <template v-if="booking.selectedRoomType">
                                        {{booking.selectedRoomType.name}}
                                    </template>
                                    <template v-else>
                                        NA
                                    </template>

                                </td>
                                <td data-th="Price">
                                    <template v-if="booking.total==''">
                                        NA
                                    </template>
                                    <template v-else>

                                        {{booking.currencySymbol}}{{booking.total}}
                                    </template>


                                </td>

                                <td data-th="Price">

                                    <div v-if="booking.isCheckedIn && !booking.isCheckedOut">
                                        <div class="alert alert-success checkInOut"><strong>User Checked In!</strong></div>
                                    </div>
                                    <div v-if="booking.isCheckedIn && booking.isCheckedOut">
                                        <div class="alert alert-success checkInOut"><strong>Finished</strong></div>
                                    </div>

                                    <div :id="'checkInOut_'+booking.id" v-if="moment(booking.checkInDate).format('MMMM DD, Y')==today && !booking.isCheckedIn">
                                        <button type="button" v-on:click="checkInOut(booking.id, 'check_in')" class="btn btn-primary checkInOut">Check
                                            In</button>
                                    </div>

                                    <div :id="'checkInOut_'+booking.id" v-if="moment(booking.checkOutDate).format('MMMM DD, Y')==today && booking.isCheckedOut && !booking.isCheckedOut">
                                        <button type="button" v-on:click="checkInOut(booking.id, 'check_out')" class="btn btn-primary checkInOut">Check
                                            Out</button>
                                    </div>

                                </td>

                            </tr>
                            <tr v-if="bookings.length==0">
                                <td align="center" colspan="8">No booking found</td>
                            </tr>

                        </tbody>
                    </table>

                    <div class="col-md-12 text-center p-2 centerDiv" v-if="total_count_page > 8">
                        <v-pagination @change="paginate" v-model="currentPage" :page-count="total_count_page"></v-pagination>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
    import vPagination from 'vue-plain-pagination'
    import format from 'date-fns/format'
    import axios from "axios";
    export default {

        components: {
            vPagination
        },

        data() {
            return {
                loader: '',
                today: '',
                bookings: {},
                currentPage: 1,
                currentPage: 1,
                page_count: 1,
                page: 1,
                count: 8,
                total: 0,
                from_date: '',
                to_date: '',
                api_type: '',
                id: '',
                isNextAvailable: true,
                isPrevAvailable: false,
                total_count_page: 0
            }
        },

        mounted() {

            var curD = new Date();
            this.today = format(curD, 'MMMM D, YYYY');
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            this.getBooking();
        },

        methods: {

            paginate() {
                console.log("test", this.currentPage);
                this.loader = this.showLoading();
                var params = {
                    userId: this.id,
                    page: this.currentPage,
                    count: this.count
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/' + this.api_type, params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        console.log("responsed", res.data);
                        this.bookings = res.data.data;
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });


            },

            checkInOut(booking_id, type) {
                console.log("test", booking_id)
                this.loader = this.showLoading();
                /* var element = document.getElementById('checkInOut_'+booking_id);
                element.innerHTML = '<div class="alert alert-success checkInOut"><strong>User Checked In!</strong></div>';
                */
                var apis_type;
                if (type == 'check_in') {
                    apis_type = 'checkInGuest';
                } else {
                    apis_type = 'checkOutGuest';
                }

                var params = {
                    bookingId: booking_id,
                    userId: this.currentUser.user.id,
                }
                axios.post(process.env.VUE_APP_BASE_URI + '/' + apis_type, params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        var element = document.getElementById('checkInOut_' + booking_id);
                        if (type == 'check_in') {
                            element.innerHTML =
                                '<div class="alert alert-success checkInOut"><strong>User Checked In!</strong></div>'
                        } else {
                            element.innerHTML =
                                '<div class="alert alert-success checkInOut"><strong>Finished</strong></div>'
                        }
                    } else {
                        alert(res.data.message);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
                console.log("booking_id", booking_id);
            },

            getBooking() {
                this.loader = this.showLoading();
                var api_type;
                var id;
                if (this.currentUser.user.role == 1) {
                    this.api_type = 'customerBookings';
                    this.id = this.currentUser.user.id;
                } else {
                    this.api_type = 'hotelBookings';
                    this.id = this.currentUser.user.hotelId;
                }
                var params = {
                    userId: this.id,
                    page: this.page,
                    count: this.count
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/' + this.api_type, params).then(res => {
                    this.loader.hide();

                    if (res.data.success) {
                        console.log("responsed", res.data);
                        this.bookings = res.data.data;
                        this.total = res.data.total;
                        this.page = parseInt(this.page) + 1;
                        this.total_count_page = Math.ceil(this.total / this.count);
                        console.log("recent Booking", this.page);
                        console.log("total_count_page", this.total_count_page);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            },

            next() {
                this.loader = this.showLoading();
                var params = {
                    userId: this.id,
                    page: this.page,
                    count: this.count
                }


                axios.post(process.env.VUE_APP_BASE_URI + '/' + this.api_type, params).then(res => {
                    this.loader.hide();
                    console.log("responsed", res);
                    if (res.data.success) {
                        this.bookings = res.data.data;
                        this.isPrevAvailable = true;
                        if (this.page === this.total_count_page) {
                            this.isNextAvailable = false;
                            this.page = parseInt(this.page) - 1;
                        } else {
                            this.page = parseInt(this.page) + 1;
                        }
                        console.log("page Next", this.page);
                        console.log("page Next", this.total_count_page);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            },

            previous() {
                this.loader = this.showLoading();
                var params = {
                    userId: this.id,
                    page: this.page,
                    count: this.count
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/' + this.api_type, params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {

                        if (this.page == 1) {
                            this.isPrevAvailable = false;
                            this.page = parseInt(this.page) + 1;
                        } else {
                            this.page = parseInt(this.page) - 1;
                        }
                        this.bookings = res.data.data;
                        this.isNextAvailable = true;

                        console.log("page prev", this.page);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            }
        }
    };
</script>
<style>
.checkInOut {
    padding: 2px !important;
    text-align: center;
}

.prevNext {
    padding: 6px !important;
}

.nav-side-menu {
  overflow: auto;
  background-color: #2e353d;
  color: #e1ffff;
}
.nav-side-menu .brand {
  background-color: #23282e;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 14px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 4rem;
  cursor: pointer;
  visibility: visible !important;
}

.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.nav-side-menu li i.sidebar-icon {
    margin-right: 0.6rem;
    font-size: 1.5em;
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #e1ffff;
  background-color: #4f5b69;
}
.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
}
.nav-side-menu li a {
  display: block;
  text-decoration: none;
  color: #e1ffff;
}
.nav-side-menu li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 20px;
}
.nav-side-menu li:hover {
  border-left: 3px solid #e1ffff;
  background-color: #4f5b69;
  -webkit-transition: all .6s ease;
  -moz-transition: all .6s ease;
  -o-transition: all .6s ease;
  -ms-transition: all .6s ease;
  transition: all .6s ease;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  background-color: #000;
}

@media (max-width: 767px) {
    .main {
        margin-left: 0 !important;
        padding: 0 15px 15px 15px;
    }
  .nav-side-menu {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }


}

</style>