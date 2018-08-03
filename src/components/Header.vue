<template>
  <div id="header">
        <div class="content-wrapper">
            <div class="avatar">
              <img :src="seller.avatar" alt="" class="set-img">
            </div>
            <div class="content">
                <div class="title">
                  <span class="brand bg-image"></span>
                  <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="supports">
                  <span class="icon bg-image" :class="classMap[seller.supports[0].type]"></span>
                  <span class="supports-description">{{seller.supports[0].description}} </span>
                </div>
                <div class="num-wrapper" v-if="seller.supports">
                   <span class="num">{{seller.supports.length}}个</span>
                   <span class="icon-keyboard_arrow_right more"></span>
                </div>
            </div>  
        </div>
        <div class="bulletin-wrapper">
          <span class="bulletin-icon bg-image"></span>
          <div class="bulletin-hidden"><span class="bulletin-info">{{seller.bulletin}}</span></div>
           <span class="icon-keyboard_arrow_right bulletin-info-right"></span>
        </div>
        <div class="background">
          <img :src="seller.avatar" alt="">
        </div>
  </div>
</template>

<script>
export default {
  props:{
    seller:{
      type : Object
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{
    seller : function(){
      console.log(this.seller)
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  }
 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'; 
#header 
  width 100%
  .content-wrapper
    background-color rgba(7,17,27,0.5)
    position relative
    padding 24px 24px 18px 24px
    .avatar
      float left
     img 
      border-radius 2px
      set-img(64px) 
    .content
      margin-left 64px
      padding-left 16px
      padding-top 2px 
      .title
       .brand
         display inline-block
         bg-image('brand')
         width 30px
         height 18px
         background-size 30px 18px
         vertical-align top
       .name
        font-size 16px
        color rgb(255,255,255)
        font-weight bold
        line-height 18px
     .description
       margin-top 8px
       font-size 12px
       color rgb(255,255,255)
       font-weight 200
       line-height 12px
     .supports
        margin-top 10px
        font-size 12px
        line-height 12px
        color rgb(255,255,255)
       span 
          display inline-block
       .icon
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          bg-image('decrease_2')
          &.decrease
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .supports-description
          margin-left 4px
          padding-top 2px
       .num-wrapper
         padding 7px 8px
         color rgb(255,255,255)
         font-size 10px
         font-weight 200
         line-height 12px
         border-radius 7px 8px
         background-color rgba(0,0,0,0.2)
         position absolute
         bottom 14px
         right 12px
         .more
            width 8px
            vertical-align middle  
  .bulletin-wrapper
     position relative
     color rgb(255,255,255)
     height 28px  
     background-color rgba(7,17,27,0.2)
     font-size 10px
     font-weight 200
     line-height 28px
     
    .bulletin-icon
        position absolute
        left 12px
        top 8px
        display inline-block
        bg-image('bulletin')
        width 22px 
        height 12px
        background-size 22px 12px
       
    .bulletin-hidden
      position absolute
      left 38px
      display inline-block
      width 303px
      height 28px
      white-space nowrap
      text-overflow ellipsis 
      overflow hidden
    .bulletin-info
      line-height 28px
      margin-left 4px
      margin-right 12px
     .bulletin-info-right
       position  absolute
       width 2px
       right 18px
       bottom 8px
    .background
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      height 106px
      filter blur(10px)
      overflow hidden
      img 
        background-size cover
        width 100%
</style>
