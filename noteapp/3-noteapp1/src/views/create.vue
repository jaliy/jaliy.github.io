<template>
	<div>
		<nv-head :is-sub-nav="true" title="新建笔记"></nv-head>
		<r-text></r-text>
	</div>
</template>
<script type="text/javascript">
	export default {
		components : {
			nvHead : require("../components/header.vue"),
			rText: require("../components/rtext/rtext.vue")
		}
	}
</script>