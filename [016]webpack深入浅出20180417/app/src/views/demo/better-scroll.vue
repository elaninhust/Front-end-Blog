<template>
	<div class="scroll-wrap" ref="scrollWrap">
		<ul>
			<li class="category-tab-items" 
				v-for="item in categoryList" 
				:key="item.categoryId" 
				:class="item.categoryId == currentFirstCateId ? 'category-tab-items-active' : ''"
				@click="click(item.categoryId,$event)">
				{{item.categoryName}}
			</li>
			<i ref="scroll_down"></i>
		</ul>
	</div>
</template>
<script>
	import BScroll from "better-scroll"

	import api from "@/api/index"

	export default {
		props:[],
		data (){
			return {
				categoryList:[],
				currentFirstCateId:279,
			}
		},
		components:{

		},
		mounted(){
			this.getData();
		},
		methods:{
			// 获取类目数据
			getData(){
				let _this = this;
				_this.$fetch(api.getHomeUrl,{
					pageIndex:1,
	        pageSize:20
				}).then(res =>{
					if(res.success == 1){
						_this.categoryList = res.data.categoryList;
						_this.$nextTick(() =>{
							_this.bscrollInit();
						});
					}
				}).catch(err =>{
					console.log(err);
				})
			},
			bscrollInit(){
				if(!this.scroll){
					console.log(1111)
					this.scroll = new BScroll(this.$refs.scrollWrap,{
						click:true,
						scrollX:true,
						scrollY:false,
					});
					console.log(this.$refs.scrollWrap)
				}else{
					this.scroll.refresh();
				}
			},
			click(id,ev){
				console.log("click")
				let offsetLeft = ev.target.offsetLeft;
				let scrollLeft = (offsetLeft + 375/2 > 950) ? (-950 + 375) : ( 375/2 - offsetLeft > 0) ? 0 : -offsetLeft + 375/2;
				this.scroll.scrollTo(scrollLeft,0,300);
				this.currentFirstCateId = id;
				this.$refs.scroll_down.style.left = offsetLeft + "px";
				this.$refs.scroll_down.style.width = ev.target.offsetWidth + "px";
			},
		},
	}
</script>
<style scoped>
	.scroll-wrap ul{
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
  .scroll-wrap ul i{
  	position: absolute;
  	height:2px;
  	background: #7f4395;
  	bottom:0;
  	left:0;
  	width:50px;
  	transition: all ease 300ms;
  }
</style>