<template>
	<div>
		<div class="container" v-if="data.length > 0">
			<!-- 左侧一级类目区域 -->
			<scroll class="first-cate-container" :scroll-y="true" :click="true" :data="data" ref="cateScroll">
				<ul class="first-cate-wrap">
					<li class="first-cate-item" v-for="(item,index) in data" :key="item.categoryID" :class="{'first-cate-item-active':currentFirstCateIndex == index}" @click="switchCate(index,$event)">{{item.categoryName}}</li>
					<span class="first-cate-down" ref="scrollTabDown"></span>
				</ul>
			</scroll>
			<!-- 右侧商品区 -->
			<scroll class="content-container" ref="contentScroll" :scroll-y="true" :click="true" :scroll-bar="false" :data="goodsData.subCategoryList">
				<div class="content-wrap">
					<div class="content-title-image">
						<img v-lazy="goodsData.categoryImage.imageUrl" alt="">
					</div>
					<div class="sub-wrap">
						<div class="second-wrap" v-for="item in goodsData.subCategoryList" :key="item.categoryId">
							<p class="second-wrap-title escp">
								<span>{{item.categoryName}}</span>
							</p>
							<ul class="third-item clear">
								<li class="third-list clear" v-for="goods in item.subCategoryList" :key="goods.categoryId">
									<img v-lazy="goods.imageUrl" alt="">
									<p>{{goods.categoryName}}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</scroll>
		</div>
		<loading v-else />
		<tab />
	</div>
</template>
<script>
	import Tab from "components/tab/tab"
	import Scroll from "components/scroll/scroll"
	import Loading from "components/loading/loading"

	import api from "@/api/index"

	export default {
		data() {
			return {
				data:[],
				currentFirstCateIndex:0
			}
		},
		computed:{
			goodsData() {
				return this.data[this.currentFirstCateIndex] || {categoryImage:'',subCategoryList:[]}
			},
		},
		components:{
			Tab,
			Scroll,
			Loading
		},
		created() {
			this.getCategoryTree();
		},
		methods:{
			getCategoryTree() {
				this.$fetch(api.getCategoryTreeUrl)
				.then((res) => {
					this.data = res.data;
				})
			},
			switchCate(index,ev) {
				this.currentFirstCateIndex = index;
				this.setScrollTabDown(ev.target);
				this.$nextTick(() => {
					this.$refs.contentScroll.scroll.scrollTo(0,0,300);
				});
			},
			setScrollTabDown(el) {
				let offsetTop , scrollTop;
				if(!this.screenHeight){
					this.screenHeight = this.$refs.cateScroll.$el.clientHeight;
				}
				if(!this.tabHeight){
					this.tabHeight = this.$refs.cateScroll.$el.children[0].clientHeight;
				}
				offsetTop = el.offsetTop;
				scrollTop = (offsetTop + this.screenHeight/2 + el.clientHeight/2) > this.tabHeight ? -this.tabHeight + this.screenHeight : offsetTop + el.clientHeight/2 < this.screenHeight/2 ? 0 : -offsetTop + this.screenHeight/2
				this.$refs.cateScroll.scroll.scrollTo(0,scrollTop,300);
				this.$refs.scrollTabDown.style.transform ="translateY(" + offsetTop + "px)";
				this.$refs.scrollTabDown.style.height = el.clientHeight + "px";
			},
		},
	}
</script>
<style scoped lang="stylus">
	.container
		position fixed
		width 100%
		top 0
		bottom 49px
		background-color #fff
		.first-cate-container
			position absolute
			top 0
			left 0
			bottom 0
			width	80px
			.first-cate-wrap
				position relative
				.first-cate-item
					height:45px
					line-height 45px
					font-size 15px
					color #333
					text-align center
					transition all ease .3s
				.first-cate-item-active
					color #7f4395
					font-size 16px
				.first-cate-down
					position absolute
					width 2px
					height 45px
					background #7f4395
					top 0
					left 0
					transition all ease .3s
		.content-container
			position:absolute
			top:0
			left:80px
			right:0
			bottom:0
			.content-wrap
				.content-title-image
					padding 10px
					text-align center
					img
						width 275px
						height 112px
				.sub-wrap
					margin 0  15px
					.second-wrap
						.second-wrap-title
							height 46px
							text-align center
							line-height 46px
							color #333
							font-size 15px
							span
								position relative
								&::before
									content ''
									position absolute
									width 24px
									height 1px
									background-color #ccc
									margin-top -0.5px
									top 50%
									left -36px
								&::after
									content ''
									position absolute
									width 24px
									height 1px
									background-color #ccc
									margin-top -0.5px
									top 50%
									right -36px
						.third-item
							.third-list
								float left
								width 33.3333%
								text-align center	
								margin-bottom 24px
								img
									width 64px
									height 64px
								p
									margin-top 10px
									font-size 12px
									line-height 1.5
									text-align center
									color #333
									
</style>