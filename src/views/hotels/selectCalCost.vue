<template>
    <div class="site-section bg-light ">
        <div class="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/hotels">Hotel</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="'/hotels/'+$route.params.hotel_id">Rooms</router-link>
                </li>
                <li class="breadcrumb-item"> Cost & Services</li>
            </ol>




            <!-- <pre>{{roomOption.grownUps}}</pre> -->

            <div class="row mb-5 hotelLoading slightMargin50px">
                
               

                <div class="col-md-8">
                    
                     <div class="section-heading ">
                        <h5>Choose the Adults & Extra Services</h5>
                    </div>

                     <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <input
                          class="form-control"
                          type="text"
                          id="datepicker-trigger"
                          required="true"
                          placeholder="Select dates"
                          readonly="true"
                          :value="formatDates(dateOne, dateTwo)"
                        >
                        <AirbnbStyleDatepicker
                          :trigger-element-id="'datepicker-trigger'"
                          :mode="'range'"
                          :fullscreen-mobile="true"
                          :date-one="today"
                          :date-two="dayNext"
                          :months-to-show="2"
                          :minDate="prevDate"
                          :showActionButtons="true"
                          @date-one-selected="val => { dateOne = val }"
                          @date-two-selected="val => { dateTwo = val }"
                          @apply="setNewDate"
                          
                          
                        />
                        </base-input>

                   
                    <div class="col-12 block-3 bottomMarginPadding">
                        <!-- <h6>2 Guest maximum. Infants don't count toward the number of guest.</h6> -->
                        <table id="cart" class="table table-condensed">
                            <tbody>
                                <tr>
                                    <td data-th="Price">
                                        <h6>Adults</h6>
                                        <b-form-select v-model="grownUps" class="mb-3" @change="selectedAdults($event)">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </b-form-select>

                                    </td>

                                    <td data-th="Price">
                                        <h6>Children(11 years)</h6>
                                        <b-form-select v-model="child11" class="mb-3" @change="selectedChild11($event)">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="4">5</option>
                                        </b-form-select>
                                    </td>

                                    <td data-th="Price">
                                        <h6>Children(6 years)</h6>
                                        <b-form-select v-model="child6" class="mb-3" @change="selectedChild6($event)">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </b-form-select>

                                    </td>

                                    <td data-th="Price">
                                        <h6>Children(3 years)</h6>
                                        <b-form-select placeholder="Select" v-model="child3" class="mb-3" @change="selectedChild3($event)">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </b-form-select>
                                    </td>

                                </tr>


                            </tbody>
                        </table>
                    </div>




                    <div class="block-3">

                        <div class="col-12 p-2">

                            <div class="section-heading">
                                <h5>Select Extra Services</h5>
                            </div>

                            <table id="cart" class="table table-hover table-condensed">

                                <tbody v-if="servicesExtra">
                                    <tr v-for="(roomOpt, index) in roomOption.options" :key="index">

                                        <td data-th="Price">
                                            <strong>{{roomOpt.name}}</strong>

                                        </td>
                                        <td data-th="Price">¥‎{{roomOpt.basicPrice}}/person</td>
                                        <td data-th="Price">
                                            <div class="quantity">
                                                <b-input-group>
                                                    <b-form-input @change="manageQty($event, roomOpt.basicPrice, index)"
                                                        type="number" min="0" :value="roomOpt.quantity"></b-form-input>
                                                </b-input-group>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">

                    <div class="section-heading ">
                        <h5>Services & Cost</h5>
                    </div>
                    <div class="block-3">

                        <div class="col-12">
                            <!-- <div class="col-md-12 p-2"> 
                                    <h6>Room Type: </h6>Twin Room
                                </div> -->
                            <table id="cart" class="table table-hover table-condensed">

                                <tbody>

                                    <tr v-if="roomOption.selectedRoomType">
                                        <td data-th="Price">
                                            <h6>Room Type</h6>
                                        </td>
                                        <td data-th="Price">{{roomOption.selectedRoomType.name}}</td>
                                    </tr>

                                    <!-- <tr>
                                        <td data-th="Price">
                                            <h6>Adult x {{grownUps}}</h6>
                                        </td>
                                        <td data-th="Price">¥‎40.000</td>
                                    </tr> -->

                                    <!-- <tr>
                                        <td data-th="Price">
                                            <h6>Breakfast</h6>
                                        </td>
                                        <td data-th="Price">¥‎{{optionLength}}</td>
                                    </tr> -->

                                    <tr v-for="(roomOpt, index) in roomOption.options" :key="index">
                                        <td data-th="Price" v-if="roomOpt.total>0">
                                            <h6>{{roomOpt.name}}</h6>
                                        </td>
                                        <td data-th="Price" v-if="roomOpt.total>0">¥‎ {{roomOpt.total}}</td>
                                    </tr>

                                    <tr>
                                        <td data-th="Price">
                                            <h6>Service Fee</h6>
                                        </td>
                                        <td data-th="Price">¥‎{{roomOption.serviceTax}}</td>
                                    </tr>

                                    <tr>
                                        <td data-th="Price">
                                            <h6>Tax Fee</h6>
                                        </td>
                                        <td data-th="Price">¥‎{{roomOption.taxOnly}}</td>
                                    </tr>

                                    <tr>
                                        <td data-th="Price"><strong>Total</strong></td>
                                        <td data-th="Price">¥‎{{roomOption.total}}</td>
                                    </tr>
                                    <tr>
                                        <td data-th="Price" align="center" colspan="2" v-if="roomOption.isAvailable">
                                            <button v-on:click="checkout()" class="btn btn-primary">Checkout</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import format from 'date-fns/format'
    /* import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css"; */

    import axios from "axios";
    import router from './../../router';

    export default {
        components: {

        },
        mounted() {

            console.log("selectCalCostPage");
            this.dayFrom = new Date();
            var nextDay = new Date(this.dayFrom);
            nextDay.setDate(this.dayFrom.getDate() + 1);
            this.dayTo = nextDay;

            var selected_dates = JSON.parse(localStorage.getItem('selected_date'));

            if (selected_dates) {
                this.dayFrom = selected_dates.check_in;
                this.dayTo = selected_dates.check_out;
                this.today = new Date(this.dayFrom);
                this.dayNext = new Date(this.dayTo);

            }

           

            var options = [];
            var userCostServices = JSON.parse(localStorage.getItem('userCostServices'));
            if (userCostServices) {
                this.grownUps = userCostServices.grownUps;
                this.child11 = userCostServices.child11;
                this.child6 = userCostServices.child6;
                this.child3 = userCostServices.child3;
                options = (userCostServices.options)?userCostServices.options:[];
            }
            this.getRoomOptions(this.grownUps, this.child11, this.child6, this.child3, this.dayFrom, this.dayTo,
                options);

        },


        methods: {
            
            setNewDate(){
                var dateOne = new Date(this.dateOne);
                var dateTwo = new Date(this.dateTwo);
                this.getRoomOptions(this.grownUps, this.child11, this.child6, this.child3, dateOne, dateTwo, this.roomOption.options);
                this.today = dateOne;
                this.dayNext = dateTwo;
            },

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

            tabChanged(selectedTab) {
                this.selectedRoom = selectedTab.tab.name;
            },

            manageQty(qty, price, index) {
                console.log("qty", qty);
                console.log("price", price);
                console.log("index", index);
                this.roomOption.options[index].quantity = qty;
                this.roomOption.options[index].total = this.roomOption.options[index].basicPrice * qty;
                this.roomOption.options[index] = {
                    id: this.roomOption.options[index].id,
                    name: this.roomOption.options[index].name,
                    basicPrice: this.roomOption.options[index].basicPrice,
                    available: this.roomOption.options[index].available,
                    rate: this.roomOption.options[index].rate,
                    hotelId: this.roomOption.options[index].hotelId,
                    quantity: this.roomOption.options[index].quantity,
                    total: this.roomOption.options[index].total
                }

                this.getRoomOptions(this.grownUps, this.child11, this.child6, this.child3, this.dayFrom, this.dayTo,
                    this.roomOption.options);
                console.log("services", this.roomOption.options);
            },

            getRoomOptions(grownUps, child11, child6, child3, checkin, checkout, options, loader = true) {
                if (loader) {
                    this.loader = this.showLoading();
                }
                let params = {
                    hotelId: this.$route.params.hotel_id,
                    roomTypeId: this.$route.params.room_id,
                    grownUps: grownUps,
                    child11: child11,
                    child6: child6,
                    child3: child3,
                    checkInDate: checkin,
                    checkOutDate: checkout,
                    options: options
                }
                axios.post(process.env.VUE_APP_BASE_URI + '/roomSettings', params).then(res => {
                    if (loader) {
                        this.loader.hide();
                    }
                    if (res.data.success) {
                        this.roomOption = res.data.data;
                        this.optionLength = this.roomOption.options.length;
                        if (this.selectedRoom == '') {
                            this.selectedRoom = this.roomOption.roomTypes[0].name;
                        }

                    }
                }, error => {
                    console.error(error);
                });
            },

            selectedAdults(val) {
                this.grownUps = val;
                this.getRoomOptions(val, this.child11, this.child6, this.child3, this.dayFrom, this.dayTo, this.roomOption
                    .options);

            },
            selectedChild11(val) {
                this.child11 = val;
                this.getRoomOptions(this.grownUps, val, this.child6, this.child3, this.dayFrom, this.dayTo, this.roomOption
                    .options);
            },
            selectedChild6(val) {
                this.child6 = val;
                this.getRoomOptions(this.grownUps, this.child11, val, this.child3, this.dayFrom, this.dayTo, this.roomOption
                    .options);
            },
            selectedChild3(val) {
                this.child3 = val;
                this.getRoomOptions(this.grownUps, this.child11, this.child6, val, this.dayFrom, this.dayTo, this.roomOption
                    .options);
            },

            changeFrom() {
                const myInput = document.querySelector("#calFrom")._flatpickr;
                if (myInput.selectedDates[0] && myInput.selectedDates[1]) {
                    this.dayFrom = myInput.selectedDates[0];
                    this.dayTo = myInput.selectedDates[1];
                    this.getRoomOptions(this.grownUps, this.child11, this.child6, this.child3, this.dayFrom, this.dayTo,
                        this.roomOption.options, true);
                    this.isDateSelected = true;
                }
            },

            checkout() {
                this.loader = this.showLoading();
                delete this.roomOption.roomTypes;
                setTimeout(() => {
                    localStorage.setItem('userCostServices', JSON.stringify(this.roomOption));
                    this.loader.hide();
                    router.push('/hotel/checkout');
                }, 1000);

            }
        },

        data() {
            var dayFrom = new Date();
            var nextDay = new Date(dayFrom);
            var prevDate = new Date(dayFrom);
            nextDay.setDate(nextDay.getDate() + 1);
            prevDate.setDate(prevDate.getDate() - 1);

            var selected_dates = JSON.parse(localStorage.getItem('selected_date'));
            if (selected_dates) {
                /* dayFrom = new Date(selected_dates.check_in);
                nextDay = new Date(selected_dates.check_out); */
            }

            return {
                loader: '',
                roomType: {},
                roomOption: {},
                optionLength: 0,
                isDateSelected: false,
                selectedRoom: '',
                servicesExtra: [],
                qtInput: [],
                booking: {
                    from: '',
                    to: '',
                    adults: 3,
                    children: '',
                },
                grownUps: 1,
                child11: 0,
                child6: 0,
                child3: 0,
                quantity: 0,
                dateFormat: 'MMM D, YYYY',
                dateOne: '',
                dateTwo: '',
                prevDate: prevDate,
                today: dayFrom,
                dayNext: nextDay,
            };
        },
    };
</script>
<style>
    .tabs-component-panels {
        padding: 2em 0em !important;
    }

    .calculationArea {
        margin-top: 7px;
        border-radius: 5px;
    }

    .table th,
    .table td {
        padding: 0.7rem !important;
    }

    .quantity {
        max-width: 55px;
        width: 100%;
    }

    .quantity input {
        text-align: center;
    }

    .dayContainer span.flatpickr-day.today.disabled {
        border: none !important;
    }

    .bottomMarginPadding {
        padding: 0px;
        margin-bottom: 17px;
    }
</style>