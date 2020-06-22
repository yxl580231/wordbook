<template>
	<div id="addword">
		<div class="container-fluid" style="background-color: #E2E6EA;width: 100%; position: absolute; height: 100%;overflow:scroll;">
			<div class="row fixed-top" style="background-color: #00aa7f; height: 6%;">
				<div class="col-1 mt-3">
					<van-icon name="arrow-left" size="20px" color="white" @click="returnword"/>
				</div>
				<div class="col text-center">
					<h6 class="mt-3 pr-4" style="color: white;">单词库</h6>
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
									<van-button square text="添加" type="info" class="mt-2" @click="insert(item)"/>
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
		name:'addword',
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
			};
		},
		methods:{
			onLoad() {
				var than = this;
				setTimeout(() => {
					axios.post("/api/word/selectAll").then(function(result){
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
			returnword(){
				this.$router.push("/wordbook");
			},
			insert(item){
				var than = this;
				setTimeout(()=>{
					axios.post("/api/userword/selectByUserId",{uid:JSON.parse(sessionStorage.getItem('login_user')).uid}).then(function(result){
						if(result.data.data.length==0){
							axios.post("/api/userword/insert",{userId:JSON.parse(sessionStorage.getItem('login_user')).uid,wordId:item.wid}).then(function(result1){
								if(result1.data.stateCode==200){
									than.$toast('添加成功');
								}else{
									than.$toast('添加失败');
								}
							})
						}else{
							for (var i = 0; i < result.data.data.length; i++) {
								if(result.data.data[i].wid==item.wid){
									than.$toast('该单词已被添加');
									return;
								}else if(i+1==result.data.data.length){
									axios.post("/api/userword/insert",{userId:JSON.parse(sessionStorage.getItem('login_user')).uid,wordId:item.wid}).then(function(result1){
										if(result1.data.stateCode==200){
											than.$toast('添加成功');
										}else{
											than.$toast('添加失败');
										}
									})
								}
							}
						}
					})
				},1000)
			}
		}
	}
</script>

<style>
</style>
