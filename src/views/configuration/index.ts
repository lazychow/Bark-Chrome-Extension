import Vue from 'vue'
import Option from './Option.vue'
import VueUi from '@vue/ui'
import '@vue/ui/dist/vue-ui.css'
Vue.use(VueUi)
// Vue.config.productionTip = false

new Vue({
  render: (h) => h(Option),
}).$mount('#app')
