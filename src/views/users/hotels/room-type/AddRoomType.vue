<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">
            <h1 class="display-4">Add Room Type</h1><br>

            <form @submit.prevent="addRoomType">
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email">Name</label>
                            <input type="text" v-model="roomType.name" class="form-control" v-validate="'required'"
                                name="name" :class="{ 'is-invalid': submitted && errors.has('name') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Min People</label>
                            <input type="number" v-model="roomType.minPeople" class="form-control" v-validate="'required'"
                                name="minPeople" :class="{ 'is-invalid': submitted && errors.has('minPeople') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>


                        <div class="form-group">
                            <label for="pwd">Bathroom</label>
                            <select class="form-control" v-model="roomType.bathroom" v-validate="'required'" name="bathroom"
                                :class="{ 'is-invalid': submitted && errors.has('bathroom') }">
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                        <div class="form-group">
                            <label for="pwd">Status</label>
                            <select class="form-control" v-model="roomType.status" v-validate="'required'" name="status"
                                :class="{ 'is-invalid': submitted && errors.has('status') }">
                                <option value="">Select</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>



                    </div>

                    <div class="col-12 col-sm-6 col-lg-6">

                        <div class="form-group">
                            <label for="email"> Basic Price</label>
                            <input type="text" v-model="roomType.basicPrice" class="form-control" v-validate="'required'"
                                name="basicPrice" :class="{ 'is-invalid': submitted && errors.has('basicPrice') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>
                        <div class="form-group">
                            <label for="email">Max People</label>
                            <input type="number" v-model="roomType.maxPeople" class="form-control" v-validate="'required'"
                                name="maxPeople" :class="{ 'is-invalid': submitted && errors.has('maxPeople') }">
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                        <div class="form-group">
                            <label for="pwd"> Smoking</label>
                            <select class="form-control" v-model="roomType.Smoking" v-validate="'required'" name="Smoking"
                                :class="{ 'is-invalid': submitted && errors.has('Smoking') }">
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">The field is required.</div>
                        </div>

                    </div>
                    <div class="col-12 col-sm-6 col-lg-6">
                        <br>
                        
                        <div class="control-group" id="fields">
                            <label class="control-label" for="field1"><h1 class="display-4">Add Amenities</h1></label>
                            <div class="controls">
                                <form role="form" class="amnts" autocomplete="off">

                                    <div class="entry input-group col-xs-3">
                                        <input class="form-control" v-model="roomType.amnts[0]" name="firstamnts" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('firstamnts') }">
                                    </div>

                                    <div class="entry input-group col-xs-3" v-for="(setAmnt, index) in allAmnts" :key="index">
                                        <input class="form-control" v-model="roomType.amnts[index+1]" :name="'lastamnts'+index" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('lastamnts'+index) }">
                                        <span class="input-group-btn">
                                            <button v-on:click="Remove(index)" class="btn btn-danger btn-add" type="button">-</button>
                                        </span>
                                    </div>
                                    
                                    <span class="input-group-btn addMoreButton">
                                        <button v-on:click="Add()" class="btn btn-success btn-add" type="button">+</button>
                                    </span>

                                </form>
                                <br>

                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-12 text-center p-2 centerDiv" v-if="currentUser.isHotelInfo">
                    <button class="btn btn-primary centerDiv">Add</button>
                </div>
                <div class="col-md-12 text-center p-2 centerDiv" v-if="!currentUser.isHotelInfo">
                    <button class="btn btn-primary centerDiv">Add</button>
                </div>
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
                allAmnts: [],
                roomType: {
                    amnts: [],
                    name: '',
                    Smoking: '',
                    bathroom: '',
                    status: '',
                },
                amntsIndex:1,
                hotelInfo: {},
                currentUser: {},
                submitted: false

            }
        },

        beforeMount() {
            this.checkLogin();

            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            if (this.currentUser.user.role == 2) {} else {
                this.errorTosted('You are not authorized to access this page');
            }

        },

        methods: {

            Add(){
                this.allAmnts.push({
                    name: 'test',
                    value: 'test'
                });
                console.log('amnt', this.allAmnts);
            },

            Remove(index){
                console.log("index", index);
                console.log("amnts", this.allAmnts.amnts);
                this.allAmnts.splice(index,1);
                var setIndex = index + 1;
                this.roomType.amnts.splice(setIndex, 1);
            },

            addRoomType(e) {
                this.submitted = true;
               
                this.$validator.validate().then(valid => {
                    if (valid) {
                        console.log("I am valida", this.roomType);
                        this.loader = this.showLoading();
                        if (this.currentUser.user.hotelId) {
                            this.roomType['hotelId'] = this.currentUser.user.hotelId;
                        }
                        this.roomType['amenities'] = this.roomType.amnts;
                        this.roomType['images'] = [];
                        console.log("info", this.hotel);
                        delete this.roomType.amnts;
                        axios.post(process.env.VUE_APP_BASE_URI + '/addRoomType', this.roomType).then(res => {
                            this.loader.hide()
                            console.log(res);
                            if (res.data.success) {
                                this.successTosted('Room type added successfully...');
                                setTimeout(() => {
                                    router.push('/user/hotels/room-type');
                                }, 1000);
                            } else {
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
                        this.hotel = this.hotelInfo.hotel[0];
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
    .amnts .input-group{margin-top: 3px;}
    .addMoreButton{margin-top: 5px;float: left;}
</style>