<template>
	<div id="wordbook">
		<div class="container-fluid" style="background-color: #E2E6EA;width: 100%; position: absolute; height: 100%;overflow:scroll;">
			<div class="row fixed-top" style="background-color: #00aa7f; height: 6%;">
				<div class="col-2 mt-3 text-center">
					<van-icon name="bars" size="20px" color="white" @click="showPopup"/>
					<van-popup v-model="show" position="left" :style="{ width: '50%',height:'100%'}">
						<h3 class="mt-2">{{username}}</h3>
						<van-button icon="lock" plain hairline type="info" class="mt-2" @click="update">修改密码</van-button>
						<br />
						<van-button icon="clear" plain hairline type="primary" class="mt-2" @click="logout">安全退出</van-button>
					</van-popup>
				</div>
				<div class="col-2"></div>
				<div class="col-4 text-center">
					<h6 class="mt-3" style="color: white;">我的单词本</h6>
				</div>
				<div class="col-4 text-center">
					<h6 class="mt-3" style="color: white;" @click="add">添加单词</h6>
				</div>
			</div>
			<div class="row row-cols-1 mt-5" style="height: 94%;">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div class="rounded mt-2 pl-2" style="width: 100%; background-color: white;" v-for="(item,index) in list" :key="index" >
							<van-swipe-cell>
								<h5 class="mt-1">{{item.wname}} {{item.pronunciation}}</h5>
								<p class="">{{item.translate}}</p>
								<template #right>
									<van-button square text="删除" type="danger" class="mt-2" @click="del(item,index)"/>
								</template>
							</van-swipe-cell>
						</div>
					</van-list>
				</van-pull-refresh>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:"wordbook",
		data() {
			return {
				list: [],
				username:'',
				show:false,
				loading: false,
				finished: false,
				refreshing: false,
			};
		},
		methods: {
			onLoad() {
				var than = this;
				setTimeout(() => {
					axios.post("/api/userword/selectByUserId",{uid:JSON.parse(sessionStorage.getItem('login_user')).uid}).then(function(result){
						if(result.data.stateCode==200){
							if (than.refreshing) {
								than.list = [];
								than.refreshing = false;
							}
							if(result.data.data.length>=10){
								for (let i = 0; i < 10; i++) {
									than.list.push(result.data.data[i]);
								}
							}else{
								for (let i = 0; i < result.data.data.length; i++) {
									than.list.push(result.data.data[i]);
								}
							}
							
							than.loading = false;
							if (than.list.length >= result.data.data.length) {
									than.finished = true;
							}
						}
					})
					}, 1000);
				},
			onRefresh() {
				this.finished = false;
				this.loading = true;
				this.onLoad();
			},
			showPopup() {
				this.show = true;
				this.username = JSON.parse(sessionStorage.getItem('login_user')).username;
			},
			logout(){
				this.$toast.loading({
					duration:1000,
					forbidClick:true,
					message:'正在退出...',
					onClose:()=>{
						sessionStorage.clear("login_user");
						this.$router.push("/");
					}
				});			
			},
			del(item,index){
				var than = this;
				this.$dialog.confirm({
					title: '删除',
					message: '是否删除'+item.wname+'这个单词',
					asyncClose: true
				}).then(()=>{
					setTimeout(() => {
						axios.post("/api/userword/delete",{userId:JSON.parse(sessionStorage.getItem('login_user')).uid,wordId:item.wid}).then(function(result){
							if(result.data.stateCode==200){
								than.list.splice(index,1);
								than.$toast('删除成功');
								than.$dialog.close();
							}else{
								than.$toast('删除失败');
								than.$dialog.close();
							}
						})
						
					},500);
				}).catch(()=>{
					this.$dialog.close()
				})
			},
			add(){
				this.$router.push("/addword");
			},
			update(){
				this.$router.push("/update");
			}
		}
	}
</script>

<style>
</style>
