<template>
    <div class="container">
        <div class="row mb-12">
            <div class="col-md-12 section-heading">
              <span class="subheading-sm"><h2 class="heading">Rooms &amp; Suites</h2></span>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, iusto, omnis! Quidem, sint, impedit? Dicta eaque delectus tempora hic, corporis velit doloremque quod quam laborum, nobis iusto autem culpa quaerat!</p>
            </div>
          </div>


        <div class="row">
          <div class="col-lg-4 mb-5">
            <div class="block-34">
              <div class="image">
                <!-- <router-link to="/hotels/5c2c5cb0fa36181fb39eb6ac" class="dropdown-item nav-link"> -->
                <img :src="url+'/images/hotel/hotel1.jpg'" alt="Image placeholder">
                <!-- </router-link> -->
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-5">
            <div class="block-34">
              <div class="image"> 
              <!-- <router-link to="/hotels/5c2c5ccc522e211fcd7836b3" class="dropdown-item nav-link"> -->
                <img :src="url+'/images/hotel/hotel2.jpeg'" alt="Image placeholder">
              <!-- </router-link> -->
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-5">
            <div class="block-34">
              <div class="image">
               <!-- <router-link to="/hotels/5c2dd162895f962f3e5f8aaa" class="dropdown-item nav-link"> -->
                <img :src="url+'/images/hotel/hotel3.jpg'" alt="Image placeholder">
               <!-- </router-link> -->
              </div>
            </div>
          </div>
        </div>
    </div>

    
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";

export default {
  
  data(){
    return {
      url: process.env.VUE_APP_BASE_URI
    }
  }
}
</script>
<style>
</style>
