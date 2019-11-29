<template>
    <div class="block-31" style="position: relative;">
        <div class="owl-carousel loop-block-31 ">
            <div class="block-30 item backUrl"  data-stellar-background-ratio="0.5">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-12">
                            <h6 class="heading">Enjoy a great Experience</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    mounted() {
        console.log("im console", process.env)
    }
};
</script>
<style>
.backUrl{
    background-image: url('./../../../public/img/hms/bg_2.jpg');
    min-height: 100px !important;
}
.align-items-center .heading{text-align: center;}
</style>