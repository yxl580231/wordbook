<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App'
}
</script>

<style>
*{
	margin:0; 
	padding:0;
}
html,body{height:100%;overflow:hidden;}
#app{
	position: absolute;
	width: 100%;
	min-height: 100%;
	height: auto;
}
</style>
