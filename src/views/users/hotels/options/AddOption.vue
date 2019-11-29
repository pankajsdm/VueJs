<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">
            <h1 class="display-4">Add Option</h1><br>

            <form  @submit.prevent="addOptions"> 
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email">Name </label>
                            <input  v-model="options.name" class="form-control" v-validate="'required'" name="name" :class="{ 'is-invalid': submitted && errors.has('name') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="pwd">Basic Price</label>
                            <input type="number" v-model="options.basicPrice"  class="form-control" v-validate="'required'" name="basicPrice" :class="{ 'is-invalid': submitted && errors.has('basicPrice') }">
                             <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Status</label>
                            <select class="form-control" v-model="options.available" v-validate="'required'" name="available" :class="{ 'is-invalid': submitted && errors.has('available') }"> 
                                <option value="">Select</option>
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>
                        

                        <!-- <div class="form-group">
                            <label for="pwd">Status</label>
                            <select class="form-control" v-model="room.status" v-validate="'required'" name="status" :class="{ 'is-invalid': submitted && errors.has('status') }"> 
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">{{ errors.first('status') }}</div>
                        </div> -->

                    </div>

                    
                </div>
                <div class="col-md-12 text-center p-2">
                    <button class="btn btn-primary centerDiv">Add</button>
                </div>

                <!-- <div class="col-md-12 text-center p-2" v-if="currentUser.isHotelInfo">
                    <button class="btn btn-primary centerDiv">Update</button>
                </div>
                <div class="col-md-12 text-center p-2" v-if="!currentUser.isHotelInfo">
                    <button  class="btn btn-primary centerDiv">Create</button>
                </div>-->
            </form>

        </div>
    </div>
</template>
<script>
import axios from "axios";
import router from '../../../../router';
    export default {

        data() {
            return {
                loader: '',
                options: {
                    available: ''
                },
                currentUser: {},
                submitted : false

            }
        },

        beforeMount(){
            this.checkLogin();
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            if(this.currentUser.user.role==2){
                //this.getOption();
            }else{
                 this.errorTosted('You are not authorized to access this page');
            }
        },


        methods: {

            addOptions(e){
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {

                        this.loader = this.showLoading();
                        this.options['hotelId'] = this.currentUser.user.hotelId;
                        axios.post(process.env.VUE_APP_BASE_URI + '/addOption', this.options).then(res => {
                            this.loader.hide()
                            console.log(res.data);
                            if(res.data.success){
                                this.successTosted('Option added successfully...');
                                setTimeout( () => {
                                     router.push('/user/hotels/options');
                                }, 1000);
                               
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

            getOption() {
                this.loader = this.showLoading();
                var params = {
                     hotelId: this.currentUser.user.hotelId,
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/getOptions', params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        console.log("responsed", res.data);
                        this.options = res.data.data;
                        
                    }
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
</style>