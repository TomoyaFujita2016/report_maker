<template>
    <v-app>
      <div class="text-end pr-8" style="display: inline-block;" >
        <v-icon @click="inc" class="ma-0 pa-0" small>
            mdi-plus
        </v-icon>
        <v-icon @click="dec" class="ma-0 pa-0" small>
            mdi-minus
        </v-icon>
      </div>
      <Scroll-Div height="700px" class="ma-3 pa-3 ">
        <vue-slider
          v-model="value"
          v-bind="options"
          direction="ttb"
          :height="1200"
          :tooltip="'always'"
          :data="data"
          :marks="marks"
          :process-style="{
            backgroundColor: '#81ecec',
          }"
          @change="consolelog"
        >
            <template v-slot:dot="{ value, focus }">
                <div :class="['custom-dot', { focus }]"></div>
            </template>
            <template v-slot:tooltip="{ value }">
               <div class="custom-tooltip">{{ value }}</div>
            </template>
        </vue-slider>
      </Scroll-Div>
    </v-app>
</template>

<script>
import VueSlider from 'vue-slider-component'
//import moment from 'moment'
import 'vue-slider-component/theme/antd.css'

export default {
  name: "TimeSlider",
  components: {
    VueSlider
  },
  data () {
    return {
      value: [],
      options: {
          process: pos => this.split(pos, 2),
        enableCross: true
      },
      data: [],
      marks: [],
    }
  },
  created(){
   this.setDateList()
   this.setMarks()
  },
  computed:{
  },
  methods:{
    setDateList(){
      for (let i = 0; i < 24; i++) {
          for (let n =0; n < 60; n++){
            this.data.push(this.zeroPadding(i, 2)+":"+this.zeroPadding(n, 2))
          }
      }
    },
    setMarks(){
        for (let i = 0; i < 24; i++) {
            for (let n =0; n < 60; n++){
                if ((n % 30) == 0){
                    var mark = this.zeroPadding(i, 2)+":"+this.zeroPadding(n, 2)
                    this.marks.push(mark)
                }
            }
        }
    },
    zeroPadding(num, length){
        return ('000000000000' + num).slice(-length);
    },
    consolelog(){
        console.log(this.value)
    },
    inc(){
        let current = new Date()
        let d = 3  //hour
        let time_a = this.zeroPadding(current.getHours(), 2) + ':' + this.zeroPadding(current.getMinutes(), 2)
        let time_b = this.zeroPadding(current.getHours()+d, 2) + ':' + this.zeroPadding(current.getMinutes(), 2)
        this.value.push(time_a)
        this.value.push(time_b)
    },
    dec(){
        this.value = this.value.slice(0, this.value.length-2)
    },
    split: (array, n) => array.reduce((a, c, i) => i % n == 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])

  }
}
</script>
<style>
  .custom-dot {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #dfe6e9;
    transition: all .3s;
  }
  .custom-tooltip{
      z-index: 10000;
  }
</style>
