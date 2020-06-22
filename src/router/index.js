import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import wordbook from '../components/wordbook.vue'
import addword from '../components/addword.vue'
import register from '../components/register.vue'
import update from '../components/update.vue'
Vue.use(VueRouter)


var router = new VueRouter({
	routes:[
		{path:"/",name:'login',component:login},
		{path:"/wordbook",name:'wordbook',component:wordbook},
		{path:"/addword",name:'addword',component:addword},
		{path:"/register",name:"register",component:register},
		{path:"/update",name:"update",component:update},
		{path:"/*",redirect:"/"}
	]
});

router.beforeEach((to,from,next)=>{
	if(to.name=="login"){
		if(sessionStorage.getItem("login_user")!=null){
			next(from.path);
		}else{
			next();
			return;
		}
	}else if(to.name=="register"){
		next();
		return;
	}else{
		if(sessionStorage.getItem("login_user")!=null){
			next();
		}else{
			next("/");
		}
	}
})

export default router