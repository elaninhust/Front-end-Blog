<template>
	<div class="scroll-wrap" ref="scrollWrap">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from "better-scroll"

	export default {
		props:{
			// 是否允许点击
			click:{
				type:Boolean,
				default:false
			},
			// 水平滚动
			scrollX:{
				type:Boolean,
				default:false
			},
			// 垂直方向滚动
			scrollY:{
				type:Boolean,
				default:false
			},
			// 是否开始滚动条
			scrollBar:{
				type:Boolean,
				default:false
			},
			// 上滑加载更多
			pullUpLoad:{
				type:Boolean,
				default:false
			},
			// 下拉刷新
			pullDown:{
				type:Boolean,
				default:false
			},
			// 数据
			data:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {

			}
		},
		watch:{
			"data":function(){
				setTimeout(() => {
	        this._initScroll();
	      }, 20)
			},
		},
		mounted(){
			setTimeout(() => {
				this._initScroll();
			},20);
		},
		methods:{
			_initScroll(){
				if(!this.$refs.scrollWrap)return;
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.scrollWrap,{
						click:this.click,
						scrollX:this.scrollX,
						scrollY:this.scrollY,
						pullUpLoad:this.pullUpLoad,
						pullDownRefresh:this.pullDown,
						scrollbar:this.scrollBar,
					});
					this._initPullUpLoad();
					this._initPullDown();
				}else{
					this.scroll.refresh();
				}
			},
			_initPullUpLoad(){
				if(this.pullUpLoad){
					this.scroll.on("pullingUp",() => {
						this.$emit("pullingUp");
					});
				}
			},
			_initPullDown(){
				if(this.pullDown){
					this.scroll.on('pullingDown',() => {
						this.$emit("pullingDown");
					});
				}
			},
		}
	}
</script>
<style scoped>
	
</style>