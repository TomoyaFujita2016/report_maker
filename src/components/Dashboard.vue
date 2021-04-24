<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="6">
          4/25
      </v-col>
      <v-col cols="3">
          Sub-Total: 5.3h
      </v-col>
      <v-col cols="3">
          Total: 123h
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="pa-6">
      <v-col cols="3" >
          <h3> ActiveTime</h3>
          <time-slider align="center" justify="end"/>
      </v-col>
      <v-col cols="6">
          <h3> aae</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Dashboard',
    components: {
        TimeSlider: () => import('@/components/base/TimeSlider.vue'),
    },

    data: () => ({
    }),
  }
</script>
