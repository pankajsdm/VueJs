<template>
    <div class="site-section bg-light ">
        <div class="container MinHeight">

            <!-- <ol class="breadcrumb">
            <li class="breadcrumb-item"> <router-link to="/hotels">Hotel</router-link></li>
            <li class="breadcrumb-item"> <router-link :to="'/hotels/'+hotelId">Rooms</router-link></li>
            <li class="breadcrumb-item"> <router-link :to="'/hotel/'+hotelId+'/'+roomTypeId">Cost & Services</router-link></li>
            <li class="breadcrumb-item active">Checkout</li>
             </ol> -->

            <div class="jumbotron text-xs-center">
                <div class="col-md-12">

                    <h1 class="display-4">Booking created successfully!</h1>
                    <p class="lead"><strong>Your order has been received. Booking has been Confirmed.</strong></p>
                    <table id="cart" class="table table-hover table-condensed">
                        <tbody>
                            <tr>
                                <th>Hotel</th>
                                <th>Room</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Adults</th>
                                <th>Cost</th>
                                <th></th>

                            </tr>
                            <tr v-if="bookings">
                                <td data-th="Price">{{bookings.hotelId.name}}</td>
                                <td data-th="Price">{{bookings.selectedRoomType.name}}</td>
                                <td data-th="Price">{{moment(bookings.checkInDate).format('MMMM DD, Y')}}</td>
                                <td data-th="Price">{{moment(bookings.checkOutDate).format('MMMM DD, Y')}}</td>
                                <td data-th="Price">{{bookings.adults}}</td>
                                <td data-th="Price"> {{bookings.currencySymbol}}{{bookings.total}}</td>
                                <td data-th="Price"> {{bookings.currencySymbol}}{{bookings.total}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- <div class="row">
                    <div class="col-md-6">

                        <h1 class="display-4"><br>Order Details </h1>
                        <table id="cart" class="table table-hover table-condensed">
                            <tbody>

                                <tr>
                                    <th>Room Type</th>
                                    <td>{{bookings.roomTypeId.name}}</td>
                                </tr>
                                <tr>
                                    <th>Total Adults</th>
                                    <td>{{bookings.adults}}</td>
                                </tr>

                                <tr v-if="bookings.children.child11>0">
                                    <th>Child(11 Years)</th>
                                    <td>{{bookings.children.child11}}</td>
                                </tr>

                                <tr v-if="bookings.children.child6>0">
                                    <th>Child(6 Years)</th>
                                    <td>{{bookings.children.child6}}</td>
                                </tr>

                                <tr v-if="bookings.children.child3>0">
                                    <th>Child(3 Years)</th>
                                    <td>{{bookings.children.child3}}</td>
                                </tr>




                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-6">

                        <h1 class="display-4"><br>Cost along with Taxes </h1>
                        <table id="cart" class="table table-hover table-condensed">
                            <tbody>

                                <tr v-for="(roomOpt, index) in bookings.options" :key="index">
                                    <th data-th="Price" v-if="roomOpt.total>0"> {{roomOpt.name}}</th>
                                    <td data-th="Price" v-if="roomOpt.total>0">{{roomOpt.total}}</td>
                                </tr>

                                <tr>
                                    <th>Tax</th>
                                    <td>{{bookings.tax}}</td>
                                </tr>
                                <tr>
                                    <th>Service Tax</th>
                                    <td>{{bookings.serviceTax}}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>{{bookings.total}}</td>
                                </tr>



                            </tbody>
                        </table>
                    </div>
                </div> -->
            </div>
        </div>
    </div>


</template>

<script>
    import axios from "axios";
    export default {

        data() {
            return {
                loader: '',
                bookings: {},
            }
        },

        mounted() {
            console.log("booking_id", this.$route.params.booking_id);
            this.getBooking();
        },

        methods: {

            getBooking() {
                this.loader = this.showLoading();

                axios.get(process.env.VUE_APP_BASE_URI + '/getBooking/' + this.$route.params.booking_id).then(res => {
                    this.loader.hide();
                    console.log("responsed", res);
                    if (res.data.success) {
                        this.bookings = res.data.data;
                        localStorage.removeItem('userCostServices');
                        console.log("recent Booking", this.bookings);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            }
        }
    };
</script>
<style></style>

90
53.40
54
90
88