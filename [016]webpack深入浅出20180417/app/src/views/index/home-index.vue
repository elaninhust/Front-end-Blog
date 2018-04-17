<template>
	<scroll v-if="firstShow" :scroll-y="true" :click="true" :scroll-bar="true" :data="modules" class="container">
		<div>
			<!--轮播图  -->
	    <div v-show="banners.length>0">
	      <swiper :options="bannerOption" class="banner-wrap">
	        <swiper-slide class="banner-item" v-for="item in banners">
	          <img v-lazy="item.newImageUrl" alt="" class="banner-item-img" @click="jumpFn({'type':item.clickType,'ext':item.ext},$event)">
	        </swiper-slide>
	        <div class="banner-swiper-pagination" slot="pagination"></div>
	      </swiper>
	    </div>
	    <!-- 平台保障区 -->
	    <div class="assurance-wrap" v-show="platformAssurance.length>0">
	      <div class="assurance-item" v-for="item in platformAssurance">
	        <i class="assurance-logo"></i>
	        {{item}}
	      </div>
	    </div>
	    <!-- 必要说 -->
	    <div class="article">
	      <img v-lazy="article.iconUrl" alt="">
	      <p>{{article.ext.title}}</p>
	    </div>
	    <!-- 模板 -->
	    <ul>
	      <template v-for="item in modules">
	        <!-- 模板一 -->
	        <li v-if="item.moduleType == 1" class="modules-wrap module1">
	          <p v-if="item.moduleInfo.moduleTitle">{{item.moduleInfo.moduleTitle}}</p>
	          <swiper :options="moduleOption" class="swiper-wrap">
	            <swiper-slide class="swiper-item" v-for="image in item.moduleInfo.moduleItems">
	              <img v-lazy="image.newImageUrl" alt="" class="banner-item-img" @click="jumpFn({'type':image.clickType,'ext':image.ext},$event)">
	            </swiper-slide>
	          </swiper>
	        </li>
	        <!-- 模板二 -->
	        <li v-if="item.moduleType == 2" class="modules-wrap module2">
	          <div class="module2-left">
	            <img v-lazy="item.moduleInfo.moduleItems[0].newImageUrl" alt="" @click="jumpFn({'type':item.moduleInfo.moduleItems[0].clickType,'ext':item.moduleInfo.moduleItems[0].ext},$event)">
	          </div>
	          <div class="module2-right">
	            <img v-lazy="item.moduleInfo.moduleItems[1].newImageUrl" alt="" @click="jumpFn({'type':item.moduleInfo.moduleItems[0].clickType,'ext':item.moduleInfo.moduleItems[1].ext},$event)">
	            <img v-lazy="item.moduleInfo.moduleItems[2].newImageUrl" alt="" @click="jumpFn({'type':item.moduleInfo.moduleItems[0].clickType,'ext':item.moduleInfo.moduleItems[2].ext},$event)">
	          </div>
	        </li>
	        <!-- 模板三 -->
	        <li v-if="item.moduleType == 3" class="modules-wrap module3">
	          <div class="modules-title" @click="jumpFn({'type':item.moduleInfo.clickType,'ext':item.moduleInfo.ext},$event)">
	            <img v-lazy="item.moduleInfo.newImageUrl" alt="">
              <div class="module3-brand">
                <div class="module3-brand-content">
                  <div class="module3-brand-item ellipsis">{{item.moduleInfo.manufacturers}}</div>
                  <div class="module3-brand-item ellipsis">{{item.moduleInfo.moduleBrand}}</div>
                </div>
              </div>
	          </div>
	          <ul class="module3-list">
	            <li class="module3-item" v-for="list in item.moduleInfo.moduleItems" @click="jumpFn({'type':list.clickType,'ext':list.ext},$event)">
	              <img v-lazy="list.image" alt="">
	              <p class="module3-name">{{list.ext.itemName}}</p>
	              <p class="module3-price">￥{{list.ext.itemPrice}}</p>
	            </li>
	          </ul>
	        </li>
	      </template>
	    </ul>
		</div>
	</scroll>
  <div v-else>
    <loading></loading>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'

	import Scroll from "components/scroll/scroll"
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import Loading from 'components/loading/loading'

	import api from "@/api/index"

	export default {
		data(){
			return {
				bannerOption: {
	        pagination: {
	          el: '.banner-swiper-pagination'
	        }
	      },
	      moduleOption:{
	        slidesPerView: 'auto',
	      },
	      categoryList:[],
	      banners:[],
	      platformAssurance:[],
	      article:{
	        iconUrl:"",
	        ext:{
	          title:''
	        }
	      },
	      modules:[],
	      firstShow:false
			}
		},
		components:{
			Scroll,
			swiper,
	    swiperSlide,
	    Loading
		},
		created(){
			this.getHomeData();
		},
		methods:{
			getHomeData:function(){
	      let _this = this;
	      _this.$fetch(api.getHomeUrl,{
	        pageIndex:1,
	        pageSize:20,
	        pvId:new Date().getTime()
	      }).then(res =>{
	      	_this.firstShow = true;
          _this.categoryList = res.data.categoryList;
          _this.banners = res.data.banners;
          _this.platformAssurance = res.data.platformAssurance;
          _this.article = res.data.article;
          _this.modules = res.data.modules;
	      }).catch(err => {
	        console.log("首页数据请求失败：",err);
	      })
	    },
			// 跳转类型
	    jumpFn (options,ev){
	      console.log(options,ev)
	    },
		}
	}
</script>
<style scoped>
	.container{
		background: #fff;
	}
	/* 轮播图 */
  .banner-wrap{
    height:130px;
    position: relative;
  }
  .banner-item img{
    width:100%;
    height:130px;
  }
  .banner-swiper-pagination{
    position: absolute;
    right:0;
    bottom:0;
    z-index: 10;
  }
  /* 平台保障 */
  .assurance-wrap{
    position: relative;
    display: flex;
    height: 36px;
    padding:0 10px;
  }
  .assurance-wrap:after{
    content:"";
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:1px;
    background: #f2f2f2;
  }
  .assurance-item{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height:100%;
    font-size: 12px;
    color:#7f4395;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .assurance-logo{  
    display: inline-block;
    width:12px;
    height:12px;
    margin-right:5px;
    background: url(/src/assets/i-right.png) 0 0 no-repeat;
    background-size: contain;
  }
  /*必要说*/
  .article{
    width:100%;
    height:36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .article img{
    width:111px;
    height:27px;
  }
  .article p{
    width:225px;
    line-height: 1;
    padding:5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color:#808080;
  }
  .modules-wrap{
    margin-top:10px;
  }
  /*模板一*/
  .module1 p{
    height:56px;
    line-height: 56px;
    font-size: 16px;
    color:#333;
    text-align: center;
  }
  .module1 .swiper-wrap{
    padding:6px 0;
  }
  .module1 .swiper-item{
    width:332.5px;
    margin-left:10px;
    font-size: 0;
  }
  .module1 .swiper-wrap img{
    width:332.5px;
    height:181.5px;
  }
  /*模板二*/
  .module2{
    width:100%;
    height:165px;
    display: flex;
  }
  .module2 .module2-left,.module2 .module2-right{
    flex:1;
    height:100%;
    box-sizing: border-box;
  }
  .module2 .module2-left{
    padding-right:2.5px;
  }
  .module2 .module2-left img{
    width:100%;
    height:100%;
  }
  .module2 .module2-right{
    padding-left:2.5px;
    display: flex;
    flex-direction: column;
  }
  .module2 .module2-right img{
    width:100%;
    height:50%;
    box-sizing: border-box;
  }
  .module2 .module2-right img:nth-child(odd){
    padding-bottom:2.5px;
  }
  .module2 .module2-right img:nth-child(even){
    padding-top:2.5px;
  }
  /*模板三*/
  .modules-title{
    width:100%;
    height:130px;
    position: relative;
    margin-bottom:10px;
  }
  .modules-title img{
    width:100%;
    height:100%;
  }
  .module3-brand{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 199px;
    height: 63px;
    margin: -31px 0 0 -99px;
    border: 3.5px solid rgba(255,255,255,.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .module3-brand-content{
    width: 189px;
    height: 53px;
    box-sizing: border-box;
    padding:7.5px 0;
    background: rgba(255,255,255,.8);
  }
  .module3-brand-item{
    height:19px;
    font-size: 14px; 
    line-height: 19px;
    color:#333;
    text-align: center;
  }

  .module3-list{
    padding:5px;
    font-size: 0;
  }
  .module3-item{
    display: inline-block;;
    width:33.33%;
    box-sizing: border-box;
    padding:0 5px;
    text-align: center;
  }
  .module3-item img{
    width:111.5px;
    height:111.5px;
  }
  .module3-item .module3-name,.module3-item .module3-price{
    font-size: 1;
    padding:10px 0 3px 0;
    font-size: 12px;
    color:#333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .module3-item .module3-price{
    padding:3px 0 10px 0;
    color:#f33;
    font-size: 15px;
  }
</style>