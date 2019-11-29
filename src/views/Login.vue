<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">

                        <template>
                            <div class="text-center text-muted mb-4">
                                <strong>Login</strong>
                            </div>
                            <form role="form" @submit.prevent="loginPanel"> 

                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="formAttr.email" v-validate="'required|email'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" /> 
                                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                                </div>

                                <div class="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" v-model="formAttr.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                                </div>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <!--  <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import axios from "axios";
    import router from './../router';
    export default {

        data() {
            return {
                loader: '',
                formAttr: {
                    email: '',
                    password: ''
                },
                user: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                },
                submitted: false
            }
        },


        methods: {

            loginPanel() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {

                        this.loader = this.showLoading();
                        var api_type = 'login';
                        /*  if(this.formAttr.name){
                             this.formAttr['signUpMethod'] = 4
                             var api_type = 'amazonLogin';
                         } */
                        console.log(this.formAttr);
                        axios.post(process.env.VUE_APP_BASE_URI + '/' + api_type, this.formAttr).then(res => {
                            this.loader.hide();
                            console.log("responsed", res);
                            if (res.data.success) {
                                this.$root.$emit('loginEvent', res.data.data);
                                if (res.data.data.user.role == 2 && !res.data.data.user.hotelId) {
                                    res.data.data['isHotelInfo'] = false;
                                } else {
                                    res.data.data['isHotelInfo'] = true;
                                }

                                localStorage.setItem('user_data', JSON.stringify(res.data.data));
                                if (res.data.data.user.role == 1) {
                                    router.replace('/user/bookings');
                                } else {
                                    router.replace('/user/hotels/info');
                                }
                            }else{
                                this.errorTosted(res.data.message);
                            }
                        }, (err) => {
                             this.loader.hide();
                             this.errorTosted('Something wrong. Please try later');
                        });
                    }
                });
            }
        }
    };
</script>
<style>
    /* #ftco-navbar{display: none;}
.footer{display: none;} */
</style>