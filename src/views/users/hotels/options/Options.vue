<template>
    <div class="site-section bg-light">
        <div class="container MinHeight">


            <div class="row mb-12 hotelLoading slightMargin50px">
                   
                <div class="col-md-12 block-3">
                    <!-- <div class="section-heading p-3">
                        <div class="row col-md-12">
                            <div class="col-md-10">
                                <h1 class="display-4">Room Types</h1>
                            </div>
                            
                        </div>
                    </div> -->

                    <div class="Add p-2">
                        <h1 class="display-4">Options</h1>
                        <router-link to="/user/hotels/add-option" class="btn btn-primary checkInOut" style="margin-right: 10px;">Add Option</router-link>   
                    </div>
                    <table id="cart" class="table table-hover table-condensed">
                        <tbody>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="(option, index) in options" :key="index">
                                <td data-th="Price">{{index+1}}</td>
                                <td data-th="Price">{{option.name}}</td>
                                <td data-th="Price">{{option.basicPrice}}</td>
                                <td data-th="Price">
                                    <template v-if="option.available">Available</template>
                                    <template v-else>Unavailable</template>
                                </td>
 
                                
                                <td data-th="Price">
                                     <button type="button" class="btn btn-primary checkInOut">View</button>
                                </td>
                                
               

                            </tr>
                            <tr v-if="options.length==0">
                                <td align="center" colspan="8">No options found...</td>
                            </tr>

                        </tbody>
                    </table>

                   <!--  <div class="col-md-12 text-center p-2 centerDiv" v-if="total_count_page > 1">
                        <v-pagination @change="paginate" v-model="currentPage" :page-count="total_count_page"></v-pagination>
                    </div> -->
                </div>
        


            </div>

        </div>
    </div>
</template>
<script>
    import vPagination from 'vue-plain-pagination'
    import format from 'date-fns/format'
    import axios from "axios";
    import router from '../../../../router';
    export default {

        components: {
            vPagination
        },

        data() {
            return {
                loader: '',
                today: '',
                options: {},
                currentUser:{},
                page: 1,
                count: 8,
                total: 0,
                currentPage: 1,
                total_count_page: 0
            }
        },

        beforeMount(){
            this.checkLogin();
        },

        mounted() {
            var curD = new Date();
            this.today = format(curD, 'MMMM D, YYYY');
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            if(this.currentUser && this.currentUser.user.hotelId){
                this.getOptions();
            }else{
                router.push('/user/hotels/info');
            }
        },

        methods: {

            paginate() {
                console.log("test", this.currentPage);
                this.loader = this.showLoading();
                var params = {
                    hotelId: this.currentUser.user.hotelId,
                    page: this.currentPage,
	                count: this.count
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/getRoomsList', params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        this.rooms = res.data.data;
                    }
                });


            },

           

            getOptions() {
                this.loader = this.showLoading();
                var params = {
                    hotelId: this.currentUser.user.hotelId,
                    page: this.page,
	                count: this.count
                }
                axios.post(process.env.VUE_APP_BASE_URI + '/getOptions', params).then(res => {
                    this.loader.hide();
                    if (res.data.success) {
                        console.log("responsed", res.data);
                        this.options = res.data.data;
                        /* this.total_count_page = Math.ceil(res.data.total / this.count);
                        console.log("responsed", this.total_count_page); */
                    }
                }, (err) => {
                        this.loader.hide();
                        this.errorTosted('Something wrong. Please try later');
                });
            },

           
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