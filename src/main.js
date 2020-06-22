import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import {Form,Field,Button,Icon,Cell,CellGroup,List,PullRefresh,Popup,SwipeCell,Toast,Dialog} from 'vant';

Vue.use(Form).use(Field).use(Button).use(Icon).use(Cell).use(CellGroup).use(List).use(PullRefresh).use(Popup).use(SwipeCell).use(Toast).use(Dialog);
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
