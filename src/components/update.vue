<template>
	<div id="update">
		<div class="container-fluid" style="background-color: #E2E6EA;width: 100%; position: absolute; height: 100%;overflow:scroll;">
			<div class="row fixed-top" style="background-color: #00aa7f; height: 6%;">
				<div class="col-1 mt-3">
					<van-icon name="arrow-left" size="20px" color="white" @click="returnword"/>
				</div>
				<div class="col text-center">
					<h6 class="mt-3 pr-4" style="color: white;">修改密码</h6>
				</div>
			</div>
			<div class="container mt-5 pt-5 text-center">
				<van-form @submit="onSubmit">
					<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"/>
					<van-field v-model="password1" type="password" name="password1" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请确认密码' }]"/>
				<div class="mt-5">
					<van-button round block type="info" native-type="submit" style="background-color:#00aa7f; border: 1px solid #00aa7f;">
						修改
					</van-button>
				</div>
				</van-form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:"update",
		data() {
			return {
				password: '',
				password1: '',
			};
		},
		methods:{
			returnword(){
				this.$router.push("/wordbook");
			},
			onSubmit(values) {
				var than = this;
				if(values.password==values.password1){
					setTimeout(() => {
						axios.post("/api/wuser/update",{uid:JSON.parse(sessionStorage.getItem('login_user')).uid,password:values.password}).then(function(result){
							if(result.data.stateCode==200){
								than.$dialog.alert({
									message: '修改成功，请返回登录'
								}).then(()=>{
									sessionStorage.clear("login_user");
									than.$router.push("/");
								})
							}else{
								than.$toast.fail('修改失败');
							}
						})
					},0);
				}else{
					this.$toast.fail('两次密码不一致')
				}
			}
		}
	}
</script>

<style>
</style>
