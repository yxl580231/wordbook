<template>
	<div id="login">
		<img alt="Vue logo" src="../assets/logo.png">
		<p>用户名：<input v-model="username" /></p>
		<p>密码：<input v-model="password" /></p>
		<p><button @click="login">登陆</button></p>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'login',
		data:function(){
			return{
				username:'',
				password:''
			}
		},
		methods:{
			login:function(){
				axios.post("/api/ruser/login",{username:this.username,pwd:this.password}).then(function(result){
									console.log(result);
								});
				/*if(this.username=='admin'&&this.password=='123'){
					alert('登陆成功')
					this.$router.push("/main")
				}else{
					alert('登录失败')
				}*/
			}
		}
	}
</script>

<style>
	#login{
		width:300px;
		height: 100px;
		margin: 0px auto;
	}
</style>
