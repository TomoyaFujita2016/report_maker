<template>
    <v-app>
      <div class="pr-1" style="text-center" >
        <h2 class="font-weight-black">#ActiveTime</h2>
      </div>
      <div class="d-inline-flex ml-5 text-center">
        <div class="text-caption">AM:</div>
        <v-icon @click="inc(true)" class="ma-0 pa-0" small>
            mdi-plus
        </v-icon>
        <v-icon @click="dec(true)" class="ma-0 pa-0" small>
            mdi-minus
        </v-icon>
        <div class="text-caption ml-10">PM:</div>
        <v-icon @click="inc(false)" class="ma-0 pa-0" small>
            mdi-plus
        </v-icon>
        <v-icon @click="dec(false)" class="ma-0 pa-0" small>
            mdi-minus
        </v-icon>
      </div>
      <div class="d-inline-flex">
      <vue-slider
        v-model="selected_am"
        v-bind="options"
        direction="ttb"
        class="mx-6 pa-3"
        :height="slider_height"
        :tooltip="'always'"
        :data="data.am"
        :marks="marks.am"
        @change="calcSubtotal"
        :process-style="{
        }"
      >
          <template v-slot:tooltip="{ value }">
             <div class="custom-tooltip">{{ value }}</div>
          </template>
      </vue-slider>
      <vue-slider
        v-model="selected_pm"
        v-bind="options"
        direction="ttb"
        class="ml-16 pa-3"
        :height="slider_height"
        :tooltip="'always'"
        :data="data.pm"
        @change="calcSubtotal"
        :marks="marks.pm"
      >
          <template v-slot:tooltip="{ value }">
             <div class="custom-tooltip">{{ value }}</div>
          </template>
      </vue-slider>
      </div>
    </v-app>
</template>

<script>
import VueSlider from 'vue-slider-component'
import moment from 'moment'
import 'vue-slider-component/theme/antd.css'

export default {
  name: "TimeSlider",
  components: {
    VueSlider
  },
  data () {
    return {
      options: {
          process: pos => this.split(pos, 2),
        enableCross: true
      },
      data: {"am": [], "pm": []},
      marks: {"am": [], "pm": []},
      slider_height: "800px",
    }
  },
  created(){
   this.setTimeSliderParam()
  },
  computed:{
    selected_am:{
        get(){
            return this.$store.state.time.am
        },
        set(value){
            this.$store.commit('updateTimeAM', value)
        },
    },
    selected_pm:{
        get(){
            return this.$store.state.time.pm
        },
        set(value){
            this.$store.commit('updateTimePM', value)
        },
    },
    subtotal:{
        get(){
            return this.$store.state.time.subtotal
        },
        set(value){
            this.$store.commit('updateTimeSubtotal', value)
        },
    },
  },
  methods:{
    calcSubtotal(){
        let today = moment(new Date).format('YYYY-MM-DD ');
        let total = 0
        if (this.selected_am.length != 0){
            for(let i =0; i < this.selected_am.length/2; i++){
                let selected = this.selected_am.slice(i*2, (i+1)*2)
                let time_from = moment(today + selected[0])
                let time_to = moment(today + selected[1])
                total += Math.round(Math.abs(time_from.diff(time_to, "minutes", true)))
            }
        }
        if (this.selected_pm.length != 0){
            for(let i =0; i < this.selected_pm.length/2; i++){
                let selected = this.selected_pm.slice(i*2, (i+1)*2)
                let time_from = moment(today + selected[0])
                let time_to = moment(today + selected[1])
                total += Math.round(Math.abs(time_from.diff(time_to, "minutes", true)))
            }
        }
        this.subtotal = total
    },
    setTimeSliderParam(){
      var txt = ""
      for (let i = 0; i < 12; i++) {
          for (let n =0; n < 60; n++){
            txt = this.zeroPadding(i, 2)+":"+this.zeroPadding(n, 2)
            this.data.am.push(txt)
            if(n % 30 == 0){
              this.marks.am.push(txt)
            }
          }
      }
      for (let i = 12; i < 24; i++) {
          for (let n =0; n < 60; n++){
            txt = this.zeroPadding(i, 2)+":"+this.zeroPadding(n, 2)
            this.data.pm.push(txt)
            if(n % 30 == 0){
              this.marks.pm.push(txt)
            }
          }
      }
      this.data.am.push("12:00")
      this.marks.am.push("12:00")
      this.marks.pm.push("23:59")
    },
    zeroPadding(num, length){
        return ('000000000000' + num).slice(-length);
    },
    inc(isAM){
        //let current = new Date()
        //let d = 3  //hour
        //let time_a = this.zeroPadding(current.getHours(), 2) + ':' + this.zeroPadding(current.getMinutes(), 2)
        //let time_b = this.zeroPadding(current.getHours()+d, 2) + ':' + this.zeroPadding(current.getMinutes(), 2)
        if (isAM){
            this.selected_am.push("08:00")
            this.selected_am.push("09:00")
        }else{
            this.selected_pm.push("20:00")
            this.selected_pm.push("21:00")
        }
        this.calcSubtotal()
    },
    dec(isAM){
        if (isAM){
            this.selected_am = this.selected_am.slice(0, this.selected_am.length -2)
        }else{
            this.selected_pm = this.selected_pm.slice(0, this.selected_pm.length -2)
        }
        this.calcSubtotal()
    },
    split: (array, n) => array.reduce((a, c, i) => i % n == 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])

  }
}
</script>
<style>
  .custom-tooltip{
      z-index: 10000;
  }
</style>
