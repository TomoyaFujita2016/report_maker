<template>
  <v-row justify="center">
    <v-dialog
      v-model="isDisplay"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">合計稼働時間</span>
        </v-card-title>
        <v-form v-model="isValid">
        <v-card-text>
          <v-text-field
            label="Total 00:00(h:m)"
            :rules="[valid_total]"
            v-model="total"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="isDisplay = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!isValid"
            @click="save_total(); isDisplay = false"
          >
            Save
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: "TotalEditor",
  components: {
  },
  data () {
    return {
        isDisplay: false,
        total: null,
        isValid: false,
        required: value => !!value || "必ず入力してください",
    }
  },
  created(){
      this.total = this.min2hour(this.time_total)
  },
  computed:{
    time_total(){
        return this.$store.state.time.total
    },
  },
  methods:{
    save_total(){
        var val = this.hour2min(this.total)
        console.log(val)
        this.$store.commit('updateTimeTotal', val)
    },
    valid_total(data){
        if (data === null || data === undefined) return "必須項目です";
        const re = /^[0-9]+:[0-9]{2}$/;
        console.log(re.test(data))
        if (!re.test(data)) return "00:00(h:m)の形式で入力してください";
        return true
    },
    min2hour (time) {
        var hour = Math.floor(time / 60);
        var min = time % 60;
        return hour + ":" + min
    },
    hour2min(time){
        var sp_time = time.split(":")
        return parseInt(sp_time[0])*60 + parseInt(sp_time[1])
    },
  },
}
</script>
