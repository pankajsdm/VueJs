<template>


    <div class="container slightMargin50px">

        <div v-if="isAuthentic">
            <div class="row mb-12" v-if="isHeading">
                <div class="col-md-12 section-heading">
                    <span class="subheading-sm">
                        <h2 class="heading">Hotels &amp; Suites </h2>
                    </span>
                </div>
            </div>

            <div class="row hotelLoading" ref="loaderContainer">
                <div class="col-lg-4 mb-5" v-for="item in items" :key="item.id">
                    <div class="block-34">
                        <div class="image">
                            <router-link :to="'hotels/'+item.id" class="dropdown-item nav-link">


                                <template v-if="item.defaultImage">
                                    <img :src="item.defaultImage" alt="pic">
                                </template>
                                <template v-else>
                                    <img :src="url+'/hotel/dummyHotel.jpg'" alt="pic">
                                </template>

                            </router-link>
                        </div>
                        <div class="text">
                            <h2 class="heading">{{item.name}}</h2>
                            
                            <!-- <div class="price"><span class="number">{{item.address.street}} {{item.address.city}} {{item.address.state}} {{item.address.country}}</span></div> -->
                        </div>
                    </div>
                </div>

                <!-- <div v-if="total_count_page>1" class="col-md-12 text-center p-2" v-on:click="loadMore()">
                    <button id="singlebutton" name="singlebutton" class="btn btn-primary">Load More Hotels</button>
                </div> -->

                <div class="col-md-12 text-center p-2 centerDiv" v-if="total_count_page > count">
                    <v-pagination @change="paginate" v-model="currentPage" :page-count="total_count_page"></v-pagination>
                </div>

            </div>
        </div>
        <div class="row hotelLoading unathenticArea" ref="loaderContainer" v-if="!isAuthentic">
            You can't access this page.
        </div>


    </div>
</template>

<script>
    import axios from "axios";
    import vPagination from 'vue-plain-pagination'  
    export default {

        components: {
            vPagination
        },

        data() {
            return {
                items: [],
                loadingButton: false,
                isHeading: false,
                currentUser: {},
                url: window.location.origin,
                isAuthentic: true,
                loader: '',
                page: 1,
                count: 15,
                currentPage: 1,
                page_count: 1,
                total_count_page: 0
            }
        },

        beforeMount() {

            var today = new Date();
            var dayNext = new Date(today);
            var dayNextToNext = new Date(today);
            dayNext.setDate(dayNext.getDate() + 1);
            dayNextToNext.setDate(dayNextToNext.getDate() + 2);
            this.currentUser = JSON.parse(localStorage.getItem('user_data'));
            if(this.currentUser){
                this.isPageAccessed();
            }
            var selected_date = JSON.parse(localStorage.getItem('selected_date'));
            if (!selected_date) {
                var selected_dates = {
                    check_in: dayNext,
                    check_out: dayNextToNext
                };
                localStorage.setItem('selected_date', JSON.stringify(selected_dates));
            }

            console.log("before mount page", this.$route);
            this.loader = this.showLoading();
            let param = {
                page: this.page,
                count: this.count,
                searchTerm: ''
            };
            axios.post(process.env.VUE_APP_BASE_URI + '/hotels', param)
                .then(response => {
                    this.loader.hide();
                    if (response.data.success) {
                        if (response.data.data.length > 0) {
                            this.loadingButton = true;
                            this.isHeading = true;
                        }
                        this.items = response.data.data;
                        this.total_count_page = Math.ceil(response.data.total / this.count);
                    }
                });
        },



        methods: {

            paginate() {
                console.log("test", this.currentPage);
                this.loader = this.showLoading();
                var params = {
                    page: this.currentPage,
                    count: this.count,
                    searchTerm: ''
                }

                axios.post(process.env.VUE_APP_BASE_URI + '/hotels', params).then(response => {
                    this.loader.hide();
                    
                    
                     if (response.data.success) {
                        if (response.data.data.length > 0) {
                            this.loadingButton = true;
                            this.isHeading = true;
                        }
                        this.items = response.data.data;
                    }


                }, (err) => {
                    this.loader.hide();
                    this.errorTosted('Something wrong. Please try later');
                });


            },

            isPageAccessed(){
                if(this.currentUser.user.role==1){}else{
                    this.isAuthentic = false;
                    this.errorTosted('You are not authorized to access this page');
                }
            },
            
            /* loadMore() {
                console.log("loadMore", this.page);
                this.loader = this.showLoading();
                let param = {
                    page: this.page,
                    count: this.count,
                    searchTerm: ''
                };
                axios.post(process.env.VUE_APP_BASE_URI + '/hotels', param)
                    .then(response => {
                        this.loader.hide();
                        if (response.data.success) {
                            this.page = this.page + 1;
                            if (response.data.data.length == 0) {
                                this.loadingButton = false;
                            }
                            for (var i = 0; i < response.data.data.length; i++) {
                                this.items.push({
                                    "id": response.data.data[i].id,
                                    "name": response.data.data[i].name,
                                    "address": {
                                        "street": response.data.data[i].address.street,
                                        "city": response.data.data[i].address.city,
                                        "state": response.data.data[i].address.state,
                                        "country": response.data.data[i].address.country
                                    },
                                    "defaultImage": response.data.data[i].defaultImage,
                                    "images": []
                                })
                            }
                        }
                    });
            }, */

            sendData() {
                console.log("This is testing.");
            }
        }
    }
</script>
<style>
    .hotelLoading {
        min-height: 400px;
    }
</style>