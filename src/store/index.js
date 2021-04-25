import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: {"next": "", "done": "", "output": ""},
    time: {"am": [], "pm": [], "total": 0, "subtotal": 0},
  },
  mutations: {
    updateTextDone (state, text) {
        Vue.set(state.text, "done", text)
    },
    updateTextNext (state, text) {
        Vue.set(state.text, "next", text)
    },
    updateTimeAM (state, time) {
        Vue.set(state.time, "am", time)
    },
    updateTimePM (state, time) {
        Vue.set(state.time, "pm", time)
    },
    resetTimeAMPM (state) {
        Vue.set(state.time, "am", [])
        Vue.set(state.time, "pm", [])
    },
    updateTimeTotal (state, time){
        Vue.set(state.time, "total", time)
    },
    updateTimeSubtotal (state, time){
        Vue.set(state.time, "subtotal", time)
    },
  },
  actions: {
    removeSelectedTime(){
        window.LocalStorage.removeItem("time.am")
        window.LocalStorage.removeItem("time.pm")
    },
  },
  modules: {
  },
  plugins: [createPersistedState(
    {
      key: 'report_app',

      paths: [
        'text',
        'time.am',
        'time.pm',
        'time.total',
        'time.subtotal',
      ],
      storage: window.LocalStorage
    }
  )]
})
