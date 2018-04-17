<template>
	<div class="slide-wrap" ref="slideWrap">
		<ul class="banner-wrap">
			<li class="banner-item" v-for="item in banners">
				<img :src="item.newImageUrl" alt="" class="banner-item-img">
			</li>
		</ul>
	</div>
</template>
<script>
	import BScroll from "better-scroll"
	import api from "@/api/index"

	export default {
		data(){
			return {
				banners:[]
			}
		},
		created(){
			this.getData();
		},
		components:{
			BScroll
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
						_this.banners = res.data.banners;
						_this.$nextTick(() =>{
							_this.bscrollInit();
						});
					}
				}).catch(err =>{
					console.log(err);
				})
			},
			bscrollInit(){
				if(!this.$refs.slideWrap)return;
				if(!this.scroll){
					window.scroll = this.scroll = new BScroll(this.$refs.slideWrap,{
						click:true,
						scrollX:true,
						momentum:false,
						snap: {
							loop: true,
							// stepX:320,
							threshold: 0.3,
		          speed: 400,
						}
					});
				}else{
					this.scroll.refresh();
				}
			},
		}
	}
</script>
<style scoped>
	/* 轮播图 */
  .banner-wrap{
  	display: inline-block;
  	white-space: nowrap;
  	font-size: 0;
  }
  .banner-item{
  	display: inline-block;
  	font-size: 0;
  }
  .banner-item img{
  	width:375px;
    /*width:300px;*/
    /*padding-right:20px;*/
  }
  .banner-swiper-pagination{
    position: absolute;
    right:0;
    bottom:0;
    z-index: 10;
  }
</style>