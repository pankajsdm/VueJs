<template>
    <div>
        <Banner></Banner>
        <Inputs></Inputs>
        <Rooms></Rooms>
        <Facility></Facility>
    </div>
</template>
<script>
import Banner from "./components/Banner";
import Inputs from "./components/Inputs";
import Rooms from "./components/Rooms";
import Facility from "./components/Facility";

export default {
  name: "components",
  components: {
    Banner,
    Inputs,
    Rooms,
    Facility
  }
};
</script>
