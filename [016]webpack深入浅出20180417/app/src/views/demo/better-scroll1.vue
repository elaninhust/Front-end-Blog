<template>
	<div>
		<!-- 一级类目区域 -->
		<scroll :scroll-x = "true" :data="categoryList" :click="true">
			<ul class="category-tab">
				<li class="category-tab-items" 
					v-for="item in categoryList" 
					:key="item.categoryId" 
					:class="item.categoryId == currentFirstCateId ? 'category-tab-items-active' : ''"
					@click="click(item.categoryId,$event)">
					{{item.categoryName}}
				</li>
				<i ref="scroll_down"></i>
			</ul>
		</scroll>
		<!-- 内容区域 -->
		<scroll class="content" ref="scroll" :scroll-y="true" :click="true" :scroll-bar="true" :pull-up-load="true" :pull-down="true" @pullingUp="pullingUp" @pullingDown="pullingDown">
			<ul>
				<li v-for="item in 100">{{item}}</li>
			</ul>
		</scroll>
		<!-- 最底部tab区域 -->
		<tab :currentIndex="0"></tab>
	</div>
</template>
<script>
	import Scroll from "components/scroll/scroll"
	import Tab from "components/tab/tab"
	import { mapState,mapGetters,mapMutations,mapActions } from "vuex"

	import api from "@/api/index"

	export default {
		data (){
			return {
				categoryList:[],
				currentFirstCateId:279,
				isActivePullUp:false,
			}
		},
		computed:{
			...mapState({
				username:"userName",
			}),
			...mapGetters([
				"userLastName"
			])
		},
		components:{
			Scroll,
			Tab
		},
		mounted(){
			this.getData();
			window.demo = this;
		},
		methods:{
			...mapMutations({
				setName:"SET_USERNAME"
			}),
			...mapActions({
				setName2:"setUserName"
			}),
			// 获取类目数据
			getData(){
				let _this = this;
				_this.$fetch(api.getHomeUrl,{
					pageIndex:1,
	        pageSize:20,
	        pvId:new Date().getTime()
				}).then(res =>{
					if(res.success == 1){
						_this.categoryList = [{
							categoryName:"推荐",
							categoryId:"0",
							subCategoryList:[]
						}].concat(res.data.categoryList);
					}
				}).catch(err =>{
					console.log(err);
				})
			},
			click(){
				console.log("click");
				this.setName2("Ivan Tran").then(res => {
					console.log(res)
				});
			},
			pullingUp(){
				this.isActivePullUp = true;
				this.afterPullingUp()
				console.log("上滑加载。。。")
			},
			afterPullingUp(){
				setTimeout(() =>{
					this.isActivePullUp = false;
				},10000);
			},
			pullingDown(){
				console.log("pullDown")
				this.finishPullingDown()
			},
			finishPullingDown(){
				setTimeout(() => {
					console.log(this.$refs.scroll);
					this.$refs.scroll.scroll.finishPullDown();
				},5000);
			},
		},
	}
</script>
<style scoped>
	.category-tab{
		display: inline-block;
		white-space: nowrap;
		position: relative;
	}
	.category-tab-items{
  	display: inline-block;
    width:unset;
    height:44px;
    padding:0 10px;
    color:#808080;
    font-size: 15px;
    line-height: 44px;
    position: relative;
  }
  .category-tab-items-active{
  	color:#7f4395;
  }
  .category-tab i{
  	position: absolute;
  	height:2px;
  	background: #7f4395;
  	bottom:0;
  	left:0;
  	width:50px;
  	transition: all ease 300ms;
  }
  .content{
  	position: fixed;
  	top:44px;
  	bottom:49px;
  	width:100%;
  }
</style>