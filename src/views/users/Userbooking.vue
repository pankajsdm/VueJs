<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">


            <div class="row mb-12 hotelLoading slightMargin50px">

                <div class="col-md-12 block-3">
                    <!-- <pre>{{bookings}}</pre> -->


                    <div class="section-heading p-3">
                        <div class="col-md-5">
                            <h1 class="display-4">All Bookings</h1>
                        </div>
                    </div>

                    <table id="cart" class="table table-hover table-condensed">
                        <tbody>
                            <tr>
                                <!-- <th>No.</th> -->
                                <th>Hotel</th>
                                <th>Room Type</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Payment Type</th>
                                <th>Cost</th>
                                <th style="width:20%">Status</th>
                                <!-- <th v-if="currentUser.user.role==2">Action</th> -->
                            </tr>
                            <tr v-for="(booking, index) in bookings" :key="index">
                               <!--  <td data-th="Price">{{index+1}}</td> -->
                                <!-- <td data-th="Price">{{booking.id}}</td> -->
                                <td data-th="Price" v-if="booking.hotelId">
                                    {{booking.hotelId.name}}
                                </td>
                                <td data-th="Price" v-if="booking.selectedRoomType">{{booking.selectedRoomType.name}}</td>
                                <td data-th="Price">{{moment(booking.checkInDate).format('MMMM DD, Y')}}</td>
                                <td data-th="Price"> {{moment(booking.checkOutDate).format('MMMM DD, Y')}}</td>


                                <td data-th="Price">
                                    <template v-if="booking.paymentMethod==3">
                                       Stripe
                                    </template>
                                    <template v-else>
                                        
                                        Cash at Hotel
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

                                 

                                <td data-th="Price" v-if="currentUser.user.role==2">
                                    
                                    <template>
                                        <div v-if="booking.isCheckedIn && !booking.isCheckedOut" class="alert alert-success checkInOut stsIn"><strong>Checked In!</strong></div>

                                        <div v-if="booking.isCheckedIn && booking.isCheckedOut" class="alert alert-success checkInOut stsIn"><strong>Finished</strong></div>


                                        <div class="checkitIn" :id="'checkInOut_'+booking.id" v-if="moment(booking.checkInDate).format('MMMM DD, Y')==today && !booking.isCheckedIn">
                                            <button type="button" v-on:click="checkInOut(booking.id, 'check_in')" class="btn btn-primary checkInOut">Check In</button>
                                        </div>

                                        <div class="stsOut" :id="'checkInOut_'+booking.id" v-if="moment(booking.checkOutDate).format('MMMM DD, Y')==today && booking.isCheckedIn && !booking.isCheckedOut">
                                            <button type="button" v-on:click="checkInOut(booking.id, 'check_out')" class="btn alert alert-danger checkInOut">Check Out</button>
                                        </div>
                                    </template>
                                   <!--  <button type="button" class="btn btn-primary checkInOut">View</button> -->
                                   

                                </td>
                               <!--  <td>View</td> -->
                                

                            </tr>
                            <tr v-if="bookings.length==0">
                                <td align="center" colspan="8">No booking found</td>
                            </tr>

                        </tbody>
                    </table>

                    <div class="col-md-12 text-center p-2 centerDiv" v-if="total_count_page > count">
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
    import router from '../../router';
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
                page_count: 1,
                page: 1,
                count: 10,
                total: 0,
                from_date: '',
                to_date: '',
                api_type: '',
                id: '',
                currentUser: {
                },
                isNextAvailable: true,
                isPrevAvailable: false,
                total_count_page: 0
            }
        },

        beforeMount() {
            this.checkLogin();
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
        },

        mounted() {

            var curD = new Date();
            this.today = format(curD, 'MMMM D, YYYY');
           
            if (this.currentUser) {

                if (this.currentUser.user.role == 2) {
                    if (this.currentUser.user.hotelId) {
                        this.getBooking();
                    } else {
                        router.push('/user/hotels/info');
                    }
                }

                if (this.currentUser.user.role == 1) {
                    this.getBooking();
                }
            }
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
                element.innerHTML = '<div class="alert alert-success checkInOut"><strong>Checked In!</strong></div>';
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
                                '<div class="alert alert-success checkInOut"><strong>Checked In!</strong></div>'
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
    .stsIn{float: left;width: 50%;margin-right: 3px;}
    .stsOut{float:left; width:46%;}
    .stsOut .checkInOut{text-transform: capitalize;}
</style>