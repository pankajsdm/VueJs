<template>
    <div class="site-section">
        <div class="container MinHeight">

            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/hotels">Hotel</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="'/hotels/'+hotelId">Rooms</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="'/hotel/'+hotelId+'/'+roomTypeId">Cost & Services</router-link>
                </li>
                <li class="breadcrumb-item active">Checkout</li>
            </ol>

            <div class="row slightMargin50px">



                <div class="col-md-8">
                    <div class="section-heading">
                        <h5>Booking Details</h5>
                    </div>
                    <div class="tableBorder">
                        <table id="cart" class="table table-hover table-condensed">
                            <tbody v-if="userCostServices">
                                <tr>
                                    <th>Room Type</th>
                                    <td data-th="Price">{{roomType}}</td>
                                </tr>
                                <tr>
                                    <th>Check In</th>
                                    <td data-th="Price">{{from_date}}</td>
                                </tr>
                                <tr>
                                    <th>Check Out</th>
                                    <td data-th="Price">{{to_date}}</td>
                                </tr>
                                <tr v-if="userCostServices.grownUps>0">
                                    <th>Adult</th>
                                    <td data-th="Price">{{userCostServices.grownUps}}</td>
                                </tr>
                                <tr v-if="userCostServices.child11>0">
                                    <th>Children(11 Years)</th>
                                    <td data-th="Price">{{userCostServices.child11}}</td>
                                </tr>
                                <tr v-if="userCostServices.child6>0">
                                    <th>Children(6 Years)</th>
                                    <td data-th="Price">{{userCostServices.child6}}</td>
                                </tr>
                                <tr v-if="userCostServices.child3>0">
                                    <th>Children(3 Years)</th>
                                    <td data-th="Price">{{userCostServices.child3}}</td>
                                </tr>
                                <tr v-for="(roomOpt, index) in userCostServices.options" :key="index">
                                    <th data-th="Price" v-if="roomOpt.total>0"> {{roomOpt.name}}</th>
                                    <td data-th="Price" v-if="roomOpt.total>0">{{userCostServices.currencySymbol}}
                                        {{roomOpt.total}}</td>
                                </tr>
                                <tr>
                                    <th>Service Tax</th>
                                    <td data-th="Price">{{userCostServices.currencySymbol}}{{userCostServices.serviceTax}}</td>
                                </tr>
                                <tr>
                                    <th data-th="Price">Total</th>
                                    <td data-th="Price">{{userCostServices.currencySymbol}}{{userCostServices.total}}</td>
                                </tr>
                            </tbody>

                            <!-- <tfoot>
                        <tr class="visible-xs">
                            <td class="text-center"><strong>Total 1.99</strong></td>
                        </tr>
                        <tr>
                            <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                            <td colspan="2" class="hidden-xs"></td>
                            <td class="hidden-xs text-center"><strong>Total $1.99</strong></td>
                            <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
                        </tr>
                    </tfoot> -->
                        </table>
                    </div>
                </div>

                <div class="col-md-4">

                    <div v-if="!isUserLogggedIn">
                        <div class="section-heading">
                            <h5>Sign In</h5>
                        </div>

                        <form class="logReg" role="form" @submit.prevent="processForm">

                            <div class="form-group mb-3 input-group input-group-alternative" :class="{ 'is-invalid': submitted && errors.has('email') }">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                </div>
                                <input v-model="formAttr.email" name="email" v-validate="'required|email'" placeholder="Email"
                                    class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }">
                                <!-- <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div> -->
                            </div>

                            <div class="form-group input-group input-group-alternative" :class="{ 'is-invalid': submitted && errors.has('password') }">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                </div>
                                <input v-model="formAttr.password" v-validate="{ required: true, min: 6 }" type="password"
                                    placeholder="Password" name="password" class="form-control">
                                <!-- <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div> -->
                            </div>

                            <div v-if="!isLoginScreen">
                                <div class="form-group input-group input-group-alternative" :class="{ 'is-invalid': submitted && errors.has('c_password') }">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                    </div>
                                    <input v-model="formAttr.c_password" name="c_password" v-validate="!isLoginScreen ? { required: true, min: 6 } : '' " type="password" placeholder="Confirm password" class="form-control">
                                </div>

                                <div class="form-group input-group input-group-alternative" :class="{ 'is-invalid': submitted && errors.has('name') }">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input v-model="formAttr.name" name="name" v-validate="!isLoginScreen ? 'required' : '' "
                                        placeholder="Name" class="form-control">
                                </div>

                                <div class="form-group input-group input-group-alternative" :class="{ 'is-invalid': submitted && errors.has('phone') }">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-phone"></i></span>
                                    </div>
                                    <input v-model="formAttr.phone" name="phone" v-validate="!isLoginScreen ? 'required' : '' "
                                        placeholder="Phone number" class="form-control">
                                </div>
                            </div>


                            <div v-if="isLoginScreen">
                                <div class="text-left left-button">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                                <div class="text-right" v-on:click="signupScreen()">
                                    Not have an account? <a href="javascript:void(0)" class="text-right">Sign Up</a>
                                </div>
                            </div>

                            <div v-if="!isLoginScreen">
                                <div class="text-left left-button">
                                    <button type="submit" class="btn btn-primary">Sign Up</button>
                                </div>
                                <div class="text-right" v-on:click="loginScreen()">
                                    Already have an account <a href="javascript:void(0)" class="text-right"> Login</a>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div v-if="isUserLogggedIn">
                        <div class="section-heading">
                            <h5>Payment Method</h5>
                        </div>
                        <div class="tableBorder">
                            <div class="col-lg-12 p-3">

                                <!-- <div class="custom-control custom-radio mb-3"><input name="test1" id="c6a37d27b9a06" type="radio"
                                    class="custom-control-input" value="radio0"><label for="c6a37d27b9a06" class="custom-control-label">
                                    <strong>Google Pay </strong>
                                </label>
                            </div>
                            <div class="custom-control custom-radio mb-3"><input name="test1" id="1bce88bc6f38c" type="radio"
                                    class="custom-control-input" value="radio1"><label for="1bce88bc6f38c" class="custom-control-label">
                                    <strong>Amazon Pay</strong>
                                </label>
                            </div>
                            <div class="custom-control custom-radio mb-3 "><input name="test1" id="97d14c9579af7"
                                    type="radio" class="custom-control-input" value="radio2"><label for="97d14c9579af7"
                                    class="custom-control-label">
                                    <strong>Credit Card</strong>
                                </label>
                            </div> -->
                                <form>
                                    <!--  <div class="custom-control custom-radio mb-3"><input name="test1" id="1bce88bc6f38c" type="radio"
                                        class="custom-control-input" value="radio1"><label for="1bce88bc6f38c" class="custom-control-label">
                                        <strong>Stripe Pay</strong>
                                    </label>
                                </div>
                                <div class="custom-control custom-radio mb-3 "><input name="test1" id="97d14c9579af7"
                                        type="radio" class="custom-control-input" value="radio2"><label for="97d14c9579af7"
                                        class="custom-control-label">
                                        <strong>Cash on Hotel</strong>
                                    </label>
                                </div> -->

                                    <div class="custom-control custom-radio mb-3">
                                        <b-form-group>
                                            <b-form-radio-group class="p-3" id="radios2" v-model="paymentType" name="radioSubComponent">
                                                <b-form-radio value="stripe"><strong>Stripe Pay</strong></b-form-radio>
                                                <b-form-radio value="cash"><strong>Cash on Hotel</strong></b-form-radio>
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </div>
                                </form>

                            </div>
                        </div>

                        <!--  <div class="section-heading marginTop">
                        <button id="buttonCheckout" v-on:click="stripePayment()" class="btn btn-success btn-block">Stripe Payment</button>
                    </div> -->

                        <div class="section-heading marginTop">
                            <a href="javascript:void(0)" v-on:click="doPayment()" class="btn btn-success btn-block">Payment<i
                                    class="fa fa-angle-right"></i></a>
                        </div>

                    </div>


                    <div id="AmazonPayButton"></div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import router from './../router';
    export default {

        mounted() {

            this.user_data = JSON.parse(localStorage.getItem('user_data'));
            if (this.user_data) {
                this.isUserLogggedIn = true;
            }

            this.userCostServices = JSON.parse(localStorage.getItem('userCostServices'));
            this.hotelId = this.userCostServices.hotelId;
            this.roomType = this.userCostServices.selectedRoomType.name;
            this.roomTypeId = this.userCostServices.roomTypeId;
            var strDate = new Date(this.userCostServices.checkInDate);
            var endDate = new Date(this.userCostServices.checkOutDate);
            this.from_date = strDate.toLocaleDateString('en-us', {
                month: 'long',
                year: 'numeric',
                day: 'numeric'
            });
            this.to_date = endDate.toLocaleDateString('en-us', {
                month: 'long',
                year: 'numeric',
                day: 'numeric'
            });
        },

        data() {
            return {
                loader: '',
                user_data: {},
                formAttr: {
                    email: '',
                    password: ''
                },
                paymentType: '',
                hotelId: '',
                roomTypeId: '',
                roomType: '',
                isLoginScreen: true,
                isUserLogggedIn: false,
                userCostServices: {},
                from_date: '',
                to_date: '',
                submitted: false
            }
        },

        methods: {

            stripePayment() {
                var checkoutHandler = StripeCheckout.configure({
                    key: "pk_test_b2MJRyb7Urc3VURSDE3FSz8d",
                    locale: "auto"
                });

                checkoutHandler.open({
                    name: "Sample Store",
                    description: "Example Purchase",
                    token: this.handleToken
                });

            },

            handleToken(token) {
                /* var params = {
                    amount: this.userCostServices.total
                } */
                token['amount'] = parseInt(this.userCostServices.total);
                console.log("amount", token)
                this.loader = this.showLoading();
                axios.post(process.env.VUE_APP_BASE_URI + '/stripeCharge', token).then(res => {
                    this.loader.hide();
                    console.log("responsed", res);
                    if (res) {
                        this.createPayment(3, res);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            },

            signupScreen() {
                this.formAttr = {
                    email: '',
                    password: '',
                    c_password: '',
                    name: '',
                    phone: ''
                };
                this.isLoginScreen = false;
            },

            loginScreen() {
                this.formAttr = {
                    email: '',
                    password: ''
                };
                this.isLoginScreen = true;
            },

            processForm() {

                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {

                        this.loader = this.showLoading();
                        var api_type = 'login';
                        if (this.formAttr.name) {
                            this.formAttr['signUpMethod'] = 4
                            var api_type = 'amazonLogin';
                        }
                        this.formAttr['checkout'] = true;
                        axios.post(process.env.VUE_APP_BASE_URI + '/' + api_type, this.formAttr).then(res => {
                            this.loader.hide();
                            console.log("responsed", res);
                            if (res.data.success) {
                                this.isUserLogggedIn = true;
                                this.$root.$emit('loginEvent', res.data.data);
                                localStorage.setItem('user_data', JSON.stringify(res.data.data));
                            }else{
                                this.errorTosted(res.data.message);
                            }
                        }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
                    }
                });



            },

            doPayment() {

                console.log("payment...", this.paymentType);
                if (this.paymentType == 'stripe') {
                    this.stripePayment();
                } else {
                    this.createPayment(4, {})
                }
                //amazon.Login.setClientId("amzn1.application-oa2-client.e7d77a2d3e8d4e00be30d2513040eeef");
                //this.cashOnHotelBooking();
                //this.showLoginButton();

            },

            createPayment(payment_methods, details) {
                this.loader = this.showLoading();
                /* this.userCostServices['paymentMethod'] = '4';
                this.userCostServices['paymentDetails'] = {}; */

                this.userCostServices['paymentMethod'] = payment_methods;
                this.userCostServices['paymentDetails'] = details;

                var user_data = JSON.parse(localStorage.getItem('user_data'));

                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user_data.token
                    }
                }
                this.userCostServices['userId'] = user_data.user.id;
                console.log("headers", axiosConfig);
                console.log("headers", this.userCostServices);

                axios.post(process.env.VUE_APP_BASE_URI + '/addBooking', this.userCostServices).then(res => {
                    this.loader.hide();
                    console.log("responsed", res);
                    if (res.data.success) {
                        /* var msg = "Booking created successfully. You can now modify or cancle your booking untill check-in. "
                        this.$toasted.show( msg, { position: 'top-center', type: 'success', duration: '3000',  }); */
                        router.push('/booking/success/' + res.data.data.id);
                    }
                }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
            },





            showLoginButton() {
                console.log('showLoginButtonCalled');
                var authRequest;
                OffAmazonPayments.Button("AmazonPayButton", "AV45B9WFG7JIK", {
                    type: "Pay",
                    color: "Gold",
                    size: "medium",
                    popup: true,

                    authorization: function () {
                        var loginOptions = {
                            scope: "profile payments:widget ",
                            popup: true
                        };
                        authRequest = amazon.Login.authorize(loginOptions, function (t) {
                            amazon.Login.retrieveProfile(function (response) {
                                console.log('user profile info ')
                                console.log(response)

                                console.dir('CustomerId= ' + response.profile.CustomerId);
                                console.dir('Name= ' + response.profile.Name);
                                console.dir('PostalCode= ' + response.profile.PostalCode);
                                console.dir('PrimaryEmail= ' + response.profile.PrimaryEmail);
                            });
                        });
                    }
                });
            }
        }
    };
</script>
<style>
    .left-button {
        width: 50%;
        float: left;
    }

    .left-button .btn-primary {
        padding: 3px;
    }

    .marginTop {
        margin-top: 10px;
    }

    .MinHeight {
        min-height: 600px;
    }

    .paddingTop {
        padding-top: 15px;
    }

    .headingUl {
        list-style-type: none;
    }

    .tableBorder {
        border: 1px solid #ddd;
    }

    #cart {
        margin-bottom: 0rem;
    }

    .logReg {
        border: 1px solid #ddd;
        padding: 7px;
    }

    .logReg .is-invalid {
        border: 1px solid red;
    }

   .custom-control label:after {
        color:#fff !important;
        content: "" !important;
    }
</style>