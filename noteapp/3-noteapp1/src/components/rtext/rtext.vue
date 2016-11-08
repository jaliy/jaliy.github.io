<template>
	<div>
		<pre class="rtext" contenteditable="true">Textarea</pre>
		<div class="toolbar">
			<ul>
				<li class="tople"><a href="javascript:;">列表</a></li>
				<li class="tople"><a href="javascript:;">颜色</a></li>
			</ul>
		</div>
	</div>
</template>
<style lang="less">
	@import "../../less/_var.less";
	
	@h-toolbar:.8rem;
	.rtext {
		padding: .2rem;
		position: absolute;
		left: 0;
		top: 0;
		padding-top: .8rem;
		padding-bottom: .8rem;
		width: 100%;
		height: 100%;
		-webkit-user-select: auto;
	}
	.toolbar {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: @h-toolbar;
		ul {
			height: @h-toolbar;
			.tople {
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				float: left;
				width: 50%;
				border-left: 1px solid #fff;
				&:first-child {
					border-left: none;
				}
				a{
					height: @h-toolbar;
					line-height: @h-toolbar;
					display: block;
					font-size: .4rem;
					text-align: center;
					color: #fff;
					background-color: @color-base;
				}
			}
			
		}
	}
</style>