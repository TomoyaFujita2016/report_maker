<template>
  <vue-slider v-model="value" :enable-cross="false"/>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: "TimeSlider",
  components: {
    VueSlider
  },
  data () {
    return {
      value: [0, 30]
    }
  }
}
</script>
