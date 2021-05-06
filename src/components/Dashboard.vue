<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="4">
          {{today}}
      </v-col>
      <v-col cols="4" class="inline-flex">
          Sub-Total: <span class="font-weight-black"> {{min2hour(time_subtotal)}}</span>
          <v-btn @click="addTotal" icon>
            <v-icon color="green">mdi-plus-box-multiple-outline</v-icon>
          </v-btn>

      </v-col>
      <v-col cols="4">
          Total: <span @click="openTotalEditor()">{{min2hour(time_total)}}</span> → <span class="font-weight-black"> {{min2hour(time_total + time_subtotal)}}</span>
      <v-btn @click="dialog=true" icon>
        <v-icon color="purple">mdi-trash-can-outline</v-icon>
      </v-btn>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="pa-6">
      <v-col cols="4">
          <time-slider ref="timeslider"/>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="8">
        <h2 class="font-weight-black mb-1">#DONE</h2>
        <v-textarea
          outlined
          label="done"
          class="textfield-font-size"
          color="cyan"
          v-model="text_done"
        ></v-textarea>
        <h2 class="font-weight-black mb-1">#NEXT</h2>
        <v-textarea
          outlined
          label="next"
          class="textfield-font-size"
          color="cyan"
          v-model="text_next"
        ></v-textarea>
            <h2 class="font-weight-black mb-1">#OUTPUT
              <v-btn icon v-clipboard:copy="'```\n'+text_output+'```'" v-clipboard:success="onCopy">
                  <v-icon color="blue lighten-1">mdi-content-copy</v-icon>
              </v-btn>
            </h2>
        <v-textarea
          outlined
          class="textfield-font-size"
          readonly
          height="45vh"
          color="cyan"
          :value="text_output"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      light
      centered
      :timeout="400"
    >
      Copied to clipboard!

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <TotalEditor ref="tedlg"/>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          ※注意
        </v-card-title>
        <v-card-text>
         本当に累積稼働時間をリセットしますか？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="resetTotal"
          >
            リセットする
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import moment from 'moment'
  moment.locale('ja', {weekdays: ["日","月","火","水","木","金","土"]});
  export default {
    name: 'Dashboard',
    components: {
        TimeSlider: () => import('@/components/base/TimeSlider.vue'),
        TotalEditor: () => import('@/components/base/TotalEditor.vue'),
    },

    data: () => ({
        today: "",
        snackbar: false,
        dialog: false,
    }),
    computed: {
        text_done:{
            get(){
                return this.$store.state.text.done
            },
            set(value){
                this.$store.commit('updateTextDone', value)
            }
        },
        text_next:{
            get(){
                return this.$store.state.text.next
            },
            set(value){
                this.$store.commit('updateTextNext', value)
            }
        },
        time_total:{
            get(){
                return this.$store.state.time.total
            },
            set(value){
                this.$store.commit('updateTimeTotal', value)
            },
        },
        time_subtotal:{
            get(){
                return this.$store.state.time.subtotal
            },
            set(value){
                this.$store.commit('updateTimeSubtotal', value)
            },
        },
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
        time_text(){
            var text = ""
            var time = [...this.selected_am, ...this.selected_pm]
            time = time.filter(function (x, i, self) {
                return self.indexOf(x) === i && i === self.lastIndexOf(x);
            });
            for(let i =0; i < time.length/2; i++){
                let time_tofrom = time.slice(i*2, (i+1)*2)
                text += time_tofrom[0] + "~" + time_tofrom[1]
                if (i != time.length/2-1){
                    text += ",  "
                }
            }
            return text
        },
        text_output(){
            var output = ""
            var today = moment(new Date).format('M月DD日(dddd)');
            output += today + "\n"
            output += this.time_text + "\n"
            output += "# 今日やったこと\n"
            output += this.text_done + "\n\n"
            output += "# 次回やること\n"
            output += this.text_next + "\n\n"
            output += "# 稼働時間合計\n"
            output += "今日:  " +  this.min2hour(this.time_subtotal) + "\n"
            output += "今月累計:  " + this.min2hour(this.time_total) + " → "  + this.min2hour(this.time_total+ this.time_subtotal)  + "\n"
            return output
        },

    },
    mounted: function(){
        setInterval(this.updateTime, 1000);
    },
    methods: {
        onCopy(){
            this.snackbar = true
        },
        updateTime(){
            this.today = moment(new Date).format('YYYY/MM/DD HH:mm:ss');
        },
        addTotal(){
            this.time_total += this.time_subtotal
            this.$store.commit('resetTimeAMPM')
            this.$refs.timeslider.calcSubtotal()
        },
        resetTotal(){
            this.time_total = 0
            this.dialog = false
        },
        min2hour (time) {
            var hour = Math.floor(time / 60);
            var min = time % 60;
            return hour + "h " + min +"m"
        },
        openTotalEditor(){
            this.$refs.tedlg.isDisplay = true
        },
    },
  }
</script>
<style>
.textfield-font-size {
    font-size: 0.8em;
}
</style>
