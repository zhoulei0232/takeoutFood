<template>
  <div class="seller">
     <div class="seller-header-wrapper">
         <div class="header-top border-1px">
            <h1 class="header-top-title">{{seller.name}}</h1>
            <p class="header-top-rating"><span><star :score= "seller.score" :size= "36"></star></span><span>({{seller.ratingCount}})</span><span>月销{{seller.sellCount}}单</span></p>
            <div class="header-top-right"><span class="icon-favorite"></span><span>已收藏</span></div>
         </div>
         <div class="header-bottom">
           <div class="border border-1px-right"><p>起送价</p><p>{{seller.minPrice}}<span>元</span></p></div>
           <div class="border border-1px-right"><p>商家配送</p><p>{{seller.deliveryPrice}}<span>元</span></p></div>
           <div><p>平均配送时间</p><p>{{seller.deliveryTime}}<span>分钟</span></p></div>
         </div>
     
     </div>

     <div class="seller-broder-wrapper"></div>

     <div class="seller-notice-wrapper">
         <h1 class="notice-title">公告与活动</h1>
         <div class="notice-content">
           <p >{{seller.bulletin}}</p>
         </div>
       <ul >
         <li class="activity" v-for="(item,index) in seller.supports" :key="index"><span class="activity-icon "  :class="classMap[item.type]"></span><span>{{item.description}}</span></li>
       </ul>
     </div>

     <div class="seller-broder-wrapper"></div>

     <div class="seller-pics-wrapper">
        <h1 class="pics-title">商家实景</h1>
        <div class="pics-wrapper" ref="picwrapper">
          <ul class="pics-length" ref="piclist">
            <li class="pics" v-for="(item,index) in seller.pics" :key="index"><img :src="item" alt=""></li>
          </ul>
        </div>
     </div>

     <div class="seller-broder-wrapper"></div>

    <div class="seller-info-wrapper">
      <h1 class="seller-title">商家信息</h1>
      <li class="info" v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
    </div>
  </div>
</template>

<script>
import star from './star'
import BScroll from 'better-scroll'
import Vue from 'vue'

export default {
  data () {
    return {

      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
  components:{
  star
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee']
    Vue.nextTick(() => {
        this._initPicscroll() 
      })
  },
    watch: {
    seller: function () {
      Vue.nextTick(() => {
        this._initPicscroll() 
      })
    }
  },
  methods:{
    _initPicscroll() {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.piclist.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picwrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
 .seller
   width 100%
   h1 
    font-size 16px
    font-weight 400
    color rgb(7,17,27)
    line-height 16px
   .seller-header-wrapper
    padding 18px
    .header-top
     padding-bottom  18px
     border-1px (rgba(7,17,27,0.1))  
     position relative
     .header-top-rating
       height 18px
       line-height 18px
       font-size 10px
       color rgb(77,85,93) 
       margin-top 8px
       span:nth-of-type(1)
        margin-left -2px 
       span:nth-of-type(2)
        margin-left 8px 
       span:nth-of-type(3)
        margin-left 12px 
     .header-top-right
       position absolute
       top 0 
       right 0
       display flex
       flex-direction column
       text-align center
       span:nth-of-type(1)
        font-size 24px
        color rgb(240,20,20)
        line-height 24px
       span:nth-of-type(2)
        margin-top 4px 
        font-size 10px
        color rgb(77,85,93)
        line-height 10px
    .header-bottom
      padding-top 18px
      display flex
      flex-direction row
      text-align center
      div
       display inline-block
       width 40%
       &.border
        border-1px-right (rgba(7,17,27,0.1))
       p:nth-of-type(1)
        font-size 10px 
        color rgb(147,153,159)
        line-height 10px
       p:nth-of-type(2)
        margin-top  4px
        font-size 24px 
        font-weight 200
        color rgb(7,17,27)
        line-height 24px
        span 
         font-size 10px 
         color rgb(147,153,159)
         line-height 10px
 .seller-broder-wrapper
      width 100%
      height 16px
      background-color #f3f5f7
      border-top 1px solid (rgba(7,17,27,0.1))
      border-bottom 1px solid (rgba(7,17,27,0.1))
 .seller-notice-wrapper
   padding  0 18px   
   .notice-title
     margin-top 18px
   .notice-content
     padding 0 12px
     margin-bottom 16px
     p 
      margin-top 8px
      font-size 12px
      font-weight 200
      color rgb(240,20,20)
      line-height 24px
   .activity
    font-size 12px
    font-weight 200
    color rgb(7,17,27)
    line-height 16px
    padding 16px 12px
    border-top 1px solid (rgba(7,17,27,0.1))
    .activity-icon
      width 16px
      height 16px
      background-size 16px 16px
      display inline-block
      vertical-align top
      margin-right 6px
      bg-image('decrease_3')
      &.decrease
       bg-image('decrease_3')
      &.discount
       bg-image('discount_3')
      &.guarantee
       bg-image('guarantee_3')
      &.invoice
       bg-image('invoice_3')
      &.special
       bg-image('special_3')
 .seller-pics-wrapper
  padding 18px 0 18px 18px
  .pics-wrapper
   margin-top 12px
   width 100%
   height 90px
   overflow hidden
   .pics-length
     display flex
     flex-direction row
     .pics
      margin-right 6px
      img 
       width 120px
       height 90px
       display inline-block
 .seller-info-wrapper
   padding 18px 18px 48px 18px
   
   .seller-title
    margin-bottom 12px
   .info
    list-style none
    font-size 12px
    font-weight 200
    color rgb(7,17,27)
    line-height 16px
    padding 16px 12px
    border-top 1px solid (rgba(7,17,27,0.1))
</style>
