<template>
	<ul class="by-tab">
		<!-- <router-link tag="li" :to="{name:'index'}" class="by-tab-list" active-class="active"> -->
		<router-link tag="li" to="/index" class="by-tab-list" active-class="active">
			<i></i>
			<span>首页</span>
		</router-link>
		<router-link tag="li" to="/category" class="by-tab-list" active-class="active">
			<i></i>
			<span>分类</span>
		</router-link>
		<router-link tag="li" to="/shopCar" class="by-tab-list" active-class="active">
			<i></i>
			<span>购物车</span>
		</router-link>
		<router-link tag="li" to="/mine" class="by-tab-list" active-class="active">
			<i></i>
			<span>我的</span>
		</router-link>
	</ul>
</template>
<script>
	export default {
		name:"tab",
		data(){
			return {

			}
		}
	}
</script>
<style scoped>
	.by-tab{
		width:100%;
		height:49px;
		position: fixed;
		bottom:0;
		left:0;
		background: #fff;
		display: flex;
		justify-content: center;
		z-index:100;
	}
	.by-tab-list{
		flex:1;
		height:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.by-tab-list i{
		display: inline-block;
		width:23px;
		height:23px;
		margin-bottom:5px;
	}
	.by-tab-list:nth-child(1) i{
		background: url(/src/assets/i-home.png) 0 0 no-repeat;
		background-size: contain;
	}
	.by-tab-list:nth-child(2) i{
		background: url(/src/assets/i-category.png) 0 0 no-repeat;
		background-size: contain;
	}
	.by-tab-list:nth-child(3) i{
		background: url(/src/assets/i-shopCar.png) 0 0 no-repeat;
		background-size: contain;
	}
	.by-tab-list:nth-child(4) i{
		background: url(/src/assets/i-personal.png) 0 0 no-repeat;
		background-size: contain;
	}
	.by-tab-list span{
		font-size: 12px;
		line-height: 1;
		color:#808080;
	}
	.by-tab-list.active:nth-child(1) i{
		background-image: url(/src/assets/i-home-active.png);
	}
	.by-tab-list.active:nth-child(2) i{
		background-image: url(/src/assets/i-category-active.png);
	}
	.by-tab-list.active:nth-child(3) i{
		background-image: url(/src/assets/i-shopCar-active.png);
	}
	.by-tab-list.active:nth-child(4) i{
		background-image: url(/src/assets/i-personal-active.png);
	}
	.by-tab-list.active span{
		color:#7f4395;
	}
</style>