<template>
	<div>
		<nv-head :is-sub-nav="false" title="首页"></nv-head>
		<div class="nav">
			<router-link to="r1">Go to r1</router-link> | 
			<router-link to="r2">Go to r2</router-link>
		</div>
		<div class="page-home">This is from <span>Home</span>!</div>
		<menu-button></menu-button>
	</div>
</template>
<script type="text/javascript">
	require("../less/iconfont/iconfont.css");
	require("../less/_reset.less");
	require("../less/home.less");
	
	import HTML5Storage from '../lib/Storage/html5';
	
	let sto = new HTML5Storage();
	
	export default {
		components : {
			nvHead : require("../components/header.vue"),
			menuButton: require("../components/menubutton.vue")
		},
		mounted() {
			sto.insertOne();
		}
	}
</script>