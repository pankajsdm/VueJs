<template>
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12">

          <div class="block-32">
            <form @submit.prevent="handleSubmit" class="searchFormHome" autocomplete="off">
              <div class="row">

                <div class="col-md-3 mb-5 mb-lg-0 col-lg-2">
                    
                  
                  <!--  <label for="checkin">Search Hotel</label>
                    <div class="field-icon-wrap">
                      <input type="text" name="checkInOut" class="form-control" placeholder="Search hotel">
                    </div> -->
                    <div class="field-icon-wrap">
                      <div class="form-group">
                          <label for="email">Search Hotel</label>
                          <input placeholder="Search hotel" name="searchTerm" class="form-control" /> 
                          <!-- <div v-if="submitted && errors.has('searchTerm')" class="invalid-feedback">Field is required</div> -->
                      </div>
                    </div>



                </div>
                <div class="col-md-3 mb-5 mb-lg-0 col-lg-3">
                  <label for="checkin">Choose Date</label>
                  <div class="field-icon-wrap">

                   <!--  <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}" @on-change="changeFrom()" @on-open="focus"
                            @on-close="blur" :config="configs.start" v-model="booking.from" id="calFrom" name="name"
                            class="form-control">
                        </flat-picker>
                    </base-input> -->

                    <!-- <HotelDatePicker id="input-id" :checkOutChanged="doSomething" format="DD/MM/YYYY"></HotelDatePicker> -->

                    <div>
                      <div class="datepicker-trigger">
                          <input
                            name="checkInOut"
                            class="form-control"
                            type="text"
                            id="datepicker-trigger"
                            required="true"
                            placeholder="Select dates"
                            readonly="true"
                            :value="formatDates(dateOne, dateTwo)"
                          >
                          <AirbnbStyleDatepicker
                            :trigger-element-id="'datepicker-trigger'"
                            :mode="'range'"
                            :fullscreen-mobile="true"
                            :date-one="today"
                            :date-two="dayNext"
                            :minDate="prevDate"
                            @date-one-selected="val => { dateOne = val }"
                            @date-two-selected="val => { dateTwo = val }"
                            :showActionButtons="false"
                            :closeAfterSelect="true"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              
                <div class="col-md-12 mb-3 mb-md-0 col-lg-5">
                  <div class="row">
                    <div class="col-md-3 mb-3 mb-md-2">
                      <label for="checkin">Adults</label>
                      <div class="field-icon-wrap">
                        <select class="form-control" v-model="grownUps">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3 mb-3 mb-md-3">
                      <label for="checkin">Child(11)</label>
                      <div class="field-icon-wrap">
                        <select class="form-control" v-model="child11">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3 mb-3 mb-md-3">
                      <label for="checkin">Child(6)</label>
                      <div class="field-icon-wrap">
                        <!-- <div class="icon"><span class="ion-ios-arrow-down"></span></div> -->
                        <select class="form-control" v-model="child6">
                          <option value="0" selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>


                    <div class="col-md-3 mb-3 mb-md-3">
                      <label for="checkin">Child(3)</label>
                      <div class="field-icon-wrap">
                        <select class="form-control" v-model="child3">
                          <option value="0" selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-2 availability_checked">
                  <button class="btn btn-primary">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      
    </div>
</template>
<script>
import format from 'date-fns/format'
import router from './../../router';
export default {
  components: {
  },


  data() {
    var today = new Date();
    var dayNext = new Date(today);
    var dayNextToNext = new Date(today);
    var prevDate = new Date(today);
    dayNext.setDate(dayNext.getDate() + 1);
    dayNextToNext.setDate(dayNextToNext.getDate() + 2);
    prevDate.setDate(prevDate.getDate() - 1);

    return {
        dateFormat: 'MMM D, YYYY',
        dateOne: dayNext,
        dateTwo: dayNextToNext,
        search: {},
        dayFrom: '',
        url: process.env.VUE_APP_BASE_URI,
        dayTo: '',
        prevDate: prevDate,
        today: today,
        dayNext: dayNext,
        selected_dates:{check_in: dayNext, dayNextToNext},
        booking: {
            from: '',
            to: '',
            adults: 1,
            children: 0,
        },

        grownUps: 1,
        child11: 0,
        child6: 0,
        child3: 0,

        submitted: false,
      };
  },


  
  methods: {

     formatDates(dateOne, dateTwo) {
        let formattedDates = ''
        if (dateOne) {
          formattedDates = format(dateOne, this.dateFormat)
          this.today = dateOne;
        }
        if (dateTwo) {
          formattedDates += ' - ' + format(dateTwo, this.dateFormat)
          this.dayNext = dateTwo;
        }
        return formattedDates;
    },
  
    searchHotel(){
      console.log("I am searched");
    },

    handleSubmit(e) {
      console.log("grown", this.grownUps);
      if(!this.dayFrom){
        var today = new Date();
        var dayNext = new Date(today);
        dayNext.setDate(dayNext.getDate() + 1);
        this.dayFrom = today;
        this.dayTo = dayNext;
      }

      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
            this.selected_dates ={
              check_in: new Date(this.dateOne),
              check_out: new Date(this.dateTwo),
            }
            var setParams = {
              grownUps: parseInt(this.grownUps),
              child11: parseInt(this.child11),
              child6: parseInt(this.child6),
              child3: parseInt(this.child3),
            }
            var userCostServices = localStorage.setItem('userCostServices', JSON.stringify(setParams));
            localStorage.setItem('selected_date', JSON.stringify(this.selected_dates));
            router.push('/hotels');
          }
      });
    }
  }
};
</script>
<style>
.availability_checked{margin-top: 31px;}
.asd__keyboard-shortcuts-trigger{display: none;}
.searchFormHome input{padding-right: 0 !important;}
</style>
