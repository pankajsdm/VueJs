<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">

  
            <div v-if="currentUser.user.role==2">
            <h1 class="display-4">Hotel Information</h1><br>
           <!--  <pre>{{hotel.bookingrates}}</pre> -->
            <form  @submit.prevent="addBooking">
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email">Name</label>
                            <input type="text" v-model="hotel.name"  class="form-control" name="name"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('name') }">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Phone Number</label>
                            <input type="number" v-model="hotel.phone" class="form-control" name="phone"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('phone') }">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Rooms</label>
                            <input type="number" v-model="hotel.rooms" class="form-control" name="rooms"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('rooms') }">
                        </div>

                        <div class="form-group">
                            <label for="pwd">Grown Ups</label>
                            <input type="number" v-model="hotel.grownUps" class="form-control" name="grownUps"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('grownUps') }">
                        </div>
                        <div class="form-group">
                            <label for="pwd">child(Under 11)</label>
                            <input type="number" v-model="hotel.childThree" class="form-control" name="childThree"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('childThree') }">
                        </div>
                        

                        <!-- <div class="form-group">
                            <label for="pwd">Check in Time</label>
                            <input type="text" v-model="hotel.checkInTime" class="form-control" id="pwd">
                        </div> -->
                        <!-- <div class="form-group">
                            <label for="pwd">Check Out Time</label>
                            <input type="text" v-model="hotel.checkOutTime" class="form-control" id="pwd">
                        </div> -->

                        <div class="form-group">
                            <label for="pwd">Service Tax</label>
                             <select class="form-control" v-model="hotel.taxRateId" name="taxRateId"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('taxRateId') }">
                                <option :value="info.id" v-for="(info, index) in hotelInfo.rates" :key="index">
                                    {{info.rate}}%
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Tax</label>
                             <select class="form-control" v-model="hotel.serviceTaxId" name="serviceTaxId" v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('serviceTaxId') }">
                                <option :value="info.id" v-for="(info, index) in hotelInfo.rates" :key="index">
                                    {{info.rate}}%
                                </option>
                            </select>
                        </div>

                         <div class="form-group">
                            <label for="pwd">Description</label>
                            <textarea v-model="hotel.description" class="form-control" name="description"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('description') }"></textarea>
                        </div>


                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email">Company</label>
                            <input type="text" v-model="hotel.company" class="form-control" name="company"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('company') }">
                        </div>
                        <div class="form-group">
                            <label for="email">Owner</label>
                            <input type="text" v-model="hotel.owner" class="form-control" name="owner"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('owner') }">
                        </div>
                        <div class="form-group">
                            <label for="email">Parent Hotel</label>
                            <input type="text" v-model="hotel.parentHotel" class="form-control" name="parentHotel"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('parentHotel') }">
                        </div>
                        <div class="form-group">
                            <label for="email">Floors</label>
                            <input type="number" v-model="hotel.floors" class="form-control" name="floors" v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('floors') }">
                        </div>

                        <div class="form-group">
                            <label for="pwd">Currency</label>
                             <select class="form-control" v-model="hotel.currency" name="currency" v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('currency') }">
                                <option value="USD">US Dollar</option>
                                <option value="JPY">Yen</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Child(Under 6)</label>
                            <input type="number" v-model="hotel.childTwo" class="form-control" name="childTwo"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('childTwo') }">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Child(Under 3)</label>
                            <input type="number" v-model="hotel.childOne" class="form-control" name="childOne"  v-validate="'required'"  :class="{ 'is-invalid': submitted && errors.has('childOne') }">
                        </div>

                       

                         
    
                    </div>
                </div>
                <div class="col-md-12 text-center p-2 centerDiv" v-if="currentUser.isHotelInfo">
                    <button class="btn btn-primary centerDiv">Update</button>
                </div>
                <div class="col-md-12 text-center p-2 centerDiv" v-if="!currentUser.isHotelInfo">
                    <button  class="btn btn-primary centerDiv">Create</button>
                </div>
            </form>
            </div>
            <div class="row hotelLoading unathenticArea" ref="loaderContainer" v-if="currentUser.user.role!=2">
            You can't access this page.
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
                hotel: {
                    name: '',
                    currency: 'JPY'
                },
                hotelInfo: {},
                currentUser: {},
                submitted : false

            }
        },

        beforeMount(){
            this.checkLogin();
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
        },

        mounted() {

            
            if(this.currentUser && this.currentUser.user.role==2){
                this.getHotel();
            }
            if(this.currentUser.user.hotelId){
                this.hotel['hotelId'] = this.currentUser.hotelId;
            }else{
                
            }
           
        },

        methods: {

            addBooking(e){
                /* this.currentUser.user.hotelId = '5c2c5cb0fa36181fb39eb6ac'
                localStorage.setItem('user_data', JSON.stringify(this.currentUser));
                this.$root.$emit('createdHotelInfo', this.currentUser); */
                this.submitted = true;
                 console.log("I am valida", this.submitted);
                this.$validator.validate().then(valid => {
                    if (valid) {

                        this.loader = this.showLoading();
                        if(this.currentUser.user.hotelId){
                            this.hotel['hotelId'] = this.currentUser.user.hotelId;
                        }
                        this.hotel['userId'] = this.currentUser.user.id;
                        this.hotel['type'] = 1;
                        this.hotel['currencyCode'] = 'JPY';
                        this.hotel['defaultImage'] = '';
                        this.hotel['logo'] = '';
                        this.hotel['images'] = '';
                        this.hotel['paymentTypes'] = [1,2,3,4];
                        this.hotel['checkInTime'] = {hours : "10", minutes : "00"};
                        this.hotel['checkOutTime'] = {hours : "12", minutes : "00"};
                        this.hotel['status'] = true;
                            
                        console.log("info", this.hotel);
                        axios.post(process.env.VUE_APP_BASE_URI + '/addHotel', this.hotel).then(res => {
                            this.loader.hide()
                            
                            if(res.data.success){
                                if(!this.currentUser.isHotelInfo){
                                    this.currentUser.isHotelInfo = true;
                                   
                                    this.currentUser.user.hotelId = res.data.data.id;
                                    this.$root.$emit('createdHotelInfo', this.currentUser);
                                    localStorage.setItem('user_data', JSON.stringify(this.currentUser));
                                }
                                this.successTosted('Information added successfully...');
                            }else{
                                this.errorTosted('Something wrong. Please try later')
                            }
                        }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
                    }

                });
            },

            getHotel() {
                this.loader = this.showLoading();
                var params = {
                    hotelId: this.currentUser.user.hotelId
                };
                axios.post(process.env.VUE_APP_BASE_URI + '/getHotel', params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        this.hotelInfo = res.data.data;
                        /* this.hotel.serviceTaxId = this.hotelInfo.rates[0].id;
                        this.hotel.taxRateId = this.hotelInfo.rates[0].id; */
                       
                        if(this.hotelInfo.hotel.length > 0){
                            this.hotel = this.hotelInfo.hotel[0];

                             if(this.hotel.bookingrates){
                                this.hotel.grownUps = this.hotel.bookingrates[0].grownUps;
                                this.hotel.childThree = this.hotel.bookingrates[0].childThree;
                                this.hotel.childTwo = this.hotel.bookingrates[0].childTwo;
                                this.hotel.childOne = this.hotel.bookingrates[0].childOne;
                                this.hotel.currencyCode = this.hotel.bookingrates[0].currencyCode;
                                this.hotel.currency = this.hotel.bookingrates[0].currency;
                            }

                        }
                        console.log("responsed", this.hotelInfo);
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

    .form-group label:after {
        content:"*";
        color:red;
    }
</style>