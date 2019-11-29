<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">
            <h1 class="display-4">Add Room</h1><br>

            <form  @submit.prevent="addRoom">
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email">Room Number</label>
                            <input type="number"  v-model="room.room_number" class="form-control" v-validate="'required'" name="room_number" :class="{ 'is-invalid': submitted && errors.has('room_number') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="pwd">Floor</label>
                            <input type="number" v-model="room.floor"  class="form-control" v-validate="'required'" name="floor" :class="{ 'is-invalid': submitted && errors.has('floor') }">
                             <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Room Type</label>
                            <select class="form-control" v-model="room.roomTypeId" v-validate="'required'" name="roomTypeId" :class="{ 'is-invalid': submitted && errors.has('roomTypeId') }"> 
                                <option value="">Select</option>
                                <option :value="roomType.id" v-for="(roomType, index) in roomTypes" :key="index">{{roomType.name}}</option>
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
                room: {
                    roomTypeId: ''
                },
                hotelInfo: {},
                currentUser: {},
                roomTypes: {},
                submitted : false

            }
        },

        beforeMount(){
            this.checkLogin();
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            if(this.currentUser.user.role==2){
                this.getRoomType();
            }else{
                 this.errorTosted('You are not authorized to access this page');
            }
        },


        methods: {

            addRoom(e){
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {

                        this.loader = this.showLoading();
                        this.room['hotelId'] = this.currentUser.user.hotelId;
                        this.room['floor'] = parseInt(this.room.floor);
                        this.room['room_number'] = parseInt(this.room.room_number);
                        axios.post(process.env.VUE_APP_BASE_URI + '/addRoom', this.room).then(res => {
                            this.loader.hide()
                            console.log(res.data);
                            if(res.data.succcess){
                                this.successTosted('Room added successfully...');
                                setTimeout( () => {
                                     router.push('/user/hotels/rooms');
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

            getRoomType() {
                this.loader = this.showLoading();
                var params = {
                     hotelId: this.currentUser.user.hotelId,
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/roomTypesList', params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        console.log("responsed", res.data);
                        this.roomTypes = res.data.data;
                        
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
</style>