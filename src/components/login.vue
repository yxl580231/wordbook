<template>
	<div id="login" style="background-color: #E2E6EA; width: 100%; position: absolute; height: 100%;">
			<div class="parent" style="width:100%;height: 300px; background-color: #00aa7f;">
				<div class="child rounded text-center">
					<h2 style="line-height: 175%;" class="font-weight-bold">单 词 本</h2>
					<span class="font-italic" style="display: block; color: white;">English Word Book</span>
				</div>
			</div>
		<div class="container mt-5 pt-1 text-center">
			<van-form @submit="onSubmit">
					<van-cell-group>
						<van-field left-icon="manager" v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
					</van-cell-group>
					<van-cell-group>
						<van-field left-icon="lock" v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
					</van-cell-group>
					<div class="mt-5">
						<van-button round block type="info" native-type="submit" style="background-color:#00aa7f; border: 1px solid #00aa7f;">
							登录
						</van-button>
					</div>
			</van-form>
			<div class="fixed-bottom row mb-3">
				<div class="col-5">
					<a href="javascript:;" @click="error">手机登录</a>
				</div>
				<div class="col-3"></div>
				<div class="col-4">
					<a href="javascript:;" @click="register">注册</a>
				</div>
			</div>
		</div>
		
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
			onSubmit(values) {
				var than = this;
				than.$toast.loading({
					duration:0,
					forbidClick:true,
					message:'登录中...',
				});
				setTimeout(()=>{
					axios.post("/api/wuser/login",{username:values.username,password:values.password}).then(function(result){
						if(result.data.stateCode==200){
							than.$toast.clear();
							sessionStorage.setItem("login_user",JSON.stringify(result.data.data));
							than.$router.push("/wordbook")
						}else if(result.data.stateCode==500){
							this.$toast.fail("用户名或密码错误！");
						}
					})
				},1000);
			},
			register(){
				this.$router.push("/register");
			},
			error(){
				this.$toast.fail("该功能暂未开放");
			}
		}
	}
</script>

<style>

	.parent {
			display:flex;
			justify-content:center;
			align-items:center;
			
		}
	.child {
			font-family: kaiti;
			width:45%;
			height: 20%;
			background-color: white;
		}
</style>
