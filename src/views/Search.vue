<template>

    <div class="container slightMargin50px">
        <div class="row">

            <div class="col-md-12 mb-4">
                <div class="block-3 d-md-flex">
                    <router-link to="/hotels/5c2c5cb0fa36181fb39eb6ac" class="image" style="background-image: url('http://54.71.18.74:4503/images/hotel/hotel1.jpg'); "></router-link>
                    <div class="text">
                        <h2 class="heading">
                            <router-link to="/hotels/5c2c5cb0fa36181fb39eb6ac">HOTEL Fukushio</router-link>
                        </h2>

                        <p>Warmly furnished rooms with tiled floors feature cable TV and free Wi-Fi. Upgraded quarters
                            add minifridges and city views. Suites offer separate living areas, and tea and
                            coffeemaking facilities. Room service is available. Parking is complimentary. There's a
                            casual restaurant, a cosy bar and a lobby lounge. Additional amenities include a business
                            centre, meeting rooms and event space. Breakfast is extra..</p>
                    </div>
                </div>
            </div>

            <div class="col-md-12 mb-4">
                <div class="block-3 d-md-flex">
                    <router-link to="/hotels/5c2c5ccc522e211fcd7836b3" class="image" style="background-image: url('http://54.71.18.74:4503/images/hotel/hotel2.jpeg'); "></router-link>
                    <div class="text">
                        <h2 class="heading">
                            <router-link to="/hotels/5c2c5ccc522e211fcd7836b3">HOTEL Fukushio 2</router-link>
                        </h2>
                        <p>Warmly furnished rooms with tiled floors feature cable TV and free Wi-Fi. Upgraded quarters
                            add minifridges and city views. Suites offer separate living areas, and tea and
                            coffeemaking facilities. Room service is available. Parking is complimentary. There's a
                            casual restaurant, a cosy bar and a lobby lounge. Additional amenities include a business
                            centre, meeting rooms and event space. Breakfast is extra..</p>

                    </div>
                </div>
            </div>

            <div class="col-md-12 mb-4">
                <div class="block-3 d-md-flex">
                    <router-link to="/hotels/5c2dd162895f962f3e5f8aaa" class="image" style="background-image: url('http://54.71.18.74:4503/images/hotel/hotel3.jpg'); "></router-link>
                    <div class="text">

                        <h2 class="heading">
                            <router-link to="/hotels/5c2dd162895f962f3e5f8aaa">HOTEL Fukushio 3</router-link>
                        </h2>
                        <p>Warmly furnished rooms with tiled floors feature cable TV and free Wi-Fi. Upgraded quarters
                            add minifridges and city views. Suites offer separate living areas, and tea and
                            coffeemaking facilities. Room service is available. Parking is complimentary. There's a
                            casual restaurant, a cosy bar and a lobby lounge. Additional amenities include a business
                            centre, meeting rooms and event space. Breakfast is extra..</p>
                    </div>
                </div>
            </div>

            

            


        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VeeValidate from "vee-validate";

    Vue.use(VeeValidate);

    export default {};
</script>
<style>
    .block-3 .text {
        padding: 9% 3% !important;
    }
</style>