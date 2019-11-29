<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            
            <!-- <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/> 
            </fade-transition> -->

                 <!-- <router-view/>  -->
               <!-- <keep-alive>
                     <router-view/> 
                </keep-alive> -->

                <router-view/> 
    

                <!-- <keep-alive>
                    <router-view v-if="$route.params.id === '1'"></router-view>
                </keep-alive>
                <router-view v-if="$route.params.id !== '1'"></router-view> -->


            
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import Router from "vue-router";

export default {
    components: {
        FadeTransition,
        
    },
    created(){
        console.log("Path", this.$route);
    },

    data(){
        return{
            type: 'this is me'
        }
    }  
  
};
</script>
