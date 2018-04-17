<template>
	<div>
		<!-- 头部一级类目tab区域 -->
		<scroll class="tab-container" :scroll-x="true" :data="categoryList" :click="true" ref="scrollTab" v-show="categoryList.length>0">
			<ul class="category-tab">
				<li class="category-tab-items" 
					v-for="item in categoryList" 
					:key="item.categoryId" 
					:class="{'category-tab-items-active':item.categoryId == currentFirstCateId}"
					@click="switchFirstCate(item.categoryId,$event)">
					{{item.categoryName}}
				</li>
				<i ref="scrollTabDown"></i>
			</ul>
		</scroll>
		<!-- 内容区域 -->
		<keep-alive>
			<router-view class="index-content-container"></router-view>
		</keep-alive>
		<!-- 底部tab区域 -->
		<tab />
	</div>
</template>
<script>
	import Scroll from "components/scroll/scroll"
	import Tab from "components/tab/tab"

	import { hasClass } from "@/util/dom"
	import api from "@/api/index"

	export default {
		data(){
			return {
				categoryList:[],
				currentFirstCateId:this.$route.params.id || 0,
			}
		},
		components:{
			Scroll,
			Tab
		},
		mounted(){
			this.getData();
		},
		watch:{
			"$route":function(){
				console.log("route changed");
				this.currentFirstCateId = this.$route.params.id || 0;
				setTimeout(() => {
					let children = this.$refs.scrollTab.$el.children[0].children;
					for(let i in children){
						if(hasClass(children[i],"category-tab-items-active")){
							this.setScrollTabDown(children[i]);
							break;
						}
					}
				},20);
			},
		},
		methods:{
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
						_this.$nextTick(() => {
							let children = _this.$refs.scrollTab.$el.children[0].children;
							for(let i in children){
								if(hasClass(children[i],"category-tab-items-active")){
									_this.setScrollTabDown(children[i]);
									break;
								}
							}
						});
					}
				}).catch(err =>{
					console.log(err);
				})
			},
			// 切换一级类目
			switchFirstCate(categoryId,ev){
				this.currentFirstCateId = categoryId;
				if(categoryId == 0){
					this.$router.push({name:"index"});
				}else{
					this.$router.push({name:"index-classify",params:{id:categoryId}});
				}
				this.setScrollTabDown(ev.target);
			},
			// 设置以及类目tab栏下划线位置
			setScrollTabDown(el){
				let offsetLeft,scrollLeft;
				if(!this.screenWidth){
					this.screenWidth = this.$refs.scrollTab.$el.clientWidth;
				}
				if(!this.tabWidth){
					this.tabWidth = this.$refs.scrollTab.$el.children[0].clientWidth;
				}
				offsetLeft = el.offsetLeft;
				scrollLeft = (offsetLeft + this.screenWidth/2 + el.clientWidth/2 > this.tabWidth) ? (-this.tabWidth + this.screenWidth) : ( this.screenWidth/2 - offsetLeft - el.clientWidth/2 > 0) ? 0 : -offsetLeft + this.screenWidth/2 - el.clientWidth/2;
				this.$refs.scrollTab.scroll.scrollTo(scrollLeft,0,300);
				this.$refs.scrollTabDown.style.transform ="translateX(" + offsetLeft + "px)";
				this.$refs.scrollTabDown.style.width = el.clientWidth + "px";
			},
		}
	}
</script>
<style scoped>
	/*头部一级类目tab区域*/
	/*z-index为10-19*/
	.tab-container{
		position: relative;
		background: #fff;
		z-index: 10;
	}
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
  /*内容区域*/
  /*z-index为1-9*/
  .index-content-container{
  	position: fixed;
  	top:44px;
  	bottom:49px;
  	width:100%;
  	z-index: 1;
  }
  /*底部tab区域*/
</style>