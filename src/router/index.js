import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../components/main.vue'
import login from '../components/login.vue'
Vue.use(VueRouter)

var router = new VueRouter({
	routes:[
		{path:"/main",component:main},
		{path:"/",component:login}
	]
});
export default router