<template>
	<div v-if="goodsList.length > 0">
		<!-- 二级类目区域 -->
		<scroll class="sec-cate-container" :scroll-x="true" :click="true" :data="secondCateData" v-show="secondCateData.length > 0">
			<ul class="second-cate-wrap">
				<li class="second-cate-item"
					v-for="(item,index) in secondCateData"
					:class="{'second-cate-item-active':currentSecCateIndex == index}"
					@click="switchSecondCate(index)"
				>{{item.categoryName}}</li>
			</ul>
		</scroll>
		<!-- 商品内容区域 -->
		<scroll ref="goodsScroll" class="content-container" :class="{'content-container-top':secondCateData.length > 0}" :scroll-y="true" :click="true" :scroll-bar="true" :data="goodsList">
			<ul>
				<li class="category-wrap" v-for="item in goodsList">
					<p class="category-title">{{item.categoryName}}</p>
					<ul class="clear">
						<li class="goods-wrap clear" v-for="goods in item.item" :key="goods.productId" :su-id="goods.productId">
							<div class="goods-image">
								<img v-lazy="goods.imageUrl" alt="">
							</div>
							<p class="goods-name escp">{{goods.title}}</p>
							<p class="goods-supplier escp" v-show="goods.supplierBackground">{{goods.supplierBackground}}</p>
							<p class="goods-price escp">￥{{goods.price}}</p>
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
	</div>
	<div v-else>
		<loading />
	</div>
</template>
<script>
	import Scroll from "components/scroll/scroll"
	import Loading from 'components/loading/loading'

	import api from "@/api/index"
	export	default {
		data(){
			return {
				//当前一级类目id
				firstCateId:this.$route.params.id,
				//类目数据
				categoryList:[],
				//所有三级类目以及商品数据
				goodsList:[],
				currentSecCateIndex:0,
				secondCateData:[]
			}
		},
		watch:{
			"$route":function(){
				if(this.$route.params.id){
					this.currentSecCateIndex = 0;
					this.firstCateId = this.$route.params.id;
					this.goodsList = [];
					this._updateSecoudCateData();
					this.getGoodsData();
				}
			}
		},
		computed:{
			
		},
		created(){
			this.getData().then(() => {
				this._updateSecoudCateData();
				this.getGoodsData();
			});
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			// 获取类目数据
			getData(){
				let _this = this;
				return new Promise(function(resolve,reject){
					_this.$fetch(api.getHomeUrl,{
						pageIndex:1,
		        pageSize:20,
		        pvId:new Date().getTime()
					}).then(res =>{
						if(res.success == 1){
							_this.categoryList = res.data.categoryList;
							resolve();
						}else{
							reject()
						}
					}).catch(err =>{
						console.log(err);
						reject();
					})
				})
			},
			// 获取商品数据
			getGoodsData(){
				let _this = this;
				return new Promise((resolve,reject) => {
					_this.$fetch(api.getCateDataUrl,{
						pageIndex:1,
						pageSize:20,
						categoryID:_this.secondCateData.length > 0 ? _this.secondCateData[_this.currentSecCateIndex].categoryId : _this.firstCateId
					}).then(res => {
						if(res.success == 1){
							_this.goodsList = res.data.productList;
							resolve();
						}else{
							reject();
						}
					}).catch(err =>{
						console.log(err)
						reject();
					})
				});
			},
			_updateSecoudCateData(){
				for(let i in this.categoryList){
					if(this.categoryList[i].categoryId == this.firstCateId){
						this.secondCateData = [].concat(this.categoryList[i].subCategoryList);
						break;
					}
				}
			},
			// 切换二级类目
			switchSecondCate(index){
				this.currentSecCateIndex = index;
				this._updateSecoudCateData();
				this.getGoodsData().then(() => {
					this.$refs.goodsScroll.scroll.scrollTo(0,0,300);
				});
			},
		}
	}
</script>
<style scoped>
	/**/
	.sec-cate-container{
		position: relative;
		z-index:9;
		background: #f7f7f7;
	}
	.second-cate-wrap{
  	background: #f7f7f7;
  	display: inline-block;
  	white-space: nowrap;
  }
  .second-cate-item{
  	display: inline-block;
  	box-sizing: border-box;
  	margin:10px 0 10px 10px;
  	height:24px;
  	min-width:56px;
  	padding:0 10px;
  	border:1px solid #7f4395;
  	border-radius: 12px;
  	line-height: 24px;
  	font-size: 12px;
  	color:#7f4395;
  	text-align: center;
  }
  .second-cate-wrap .second-cate-item:last-child{
  	margin-right:10px;
  }
  .second-cate-item-active{
  	color:#fff;
  	background: #7f4395;
  }
  /**/
  .content-container{
  	position: absolute;
  	top:0;
  	bottom:0;
  	width:100%;
  	z-index:8;
  }
  .content-container-top{
  	top:46px;
  }
	.category-wrap{
		background: #fff;
	}
	.category-title{
		height: 43.5px;
	    line-height: 43.5px;
	    box-sizing: border-box;
	    color: gray;
	    font-size: 15px;
	    text-align: center;
	    padding: 0 10px;
	    background: #f5f5f5;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.goods-wrap{
		float:left;
		width:50%;
		display: flex;
		flex-direction: column;
		justify-content: center;;
		align-items: center;
	}
	.goods-image{
		width:160px;
		height:160px;
	}
	.goods-image img{
		width:100%;
		height:100%;
	}
	.goods-name{
		padding:5px 10px;
		font-size: 12px;
		line-height: 12px;
		color:#333;
		box-sizing: border-box;
		text-align: center;
		width:100%;
	}
	.goods-supplier{
		padding:5px 10px;
		font-size: 10px;
		line-height: 10px;
		color:#808080;
		width:100%;
		box-sizing: border-box;
		text-align: center;
	}
	.goods-price{
		padding:5px 10px 10px 10px;
		font-size: 18px;
		line-height: 18px;
		color:#ff3333;
	}
</style>