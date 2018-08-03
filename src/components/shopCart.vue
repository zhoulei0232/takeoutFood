<template>
  <div class="shopCart">
       <div class="shopCart-wrapper">
           <div class="shart-icon-wrapper" @click="goList">
              <div class="char-icon icon-shopping_cart" :class="{noChart :totalCount != 0 }"></div>
              <div class="total-count" v-show="totalCount!= 0">{{totalCount}}</div>
           </div>
           <div class="deliver-fee">
             <div class="price border-1px-right" :class="{noPrice :totalCount != 0 }" >￥{{totalPrice}}</div>
             <div class="deliveryPrice">另需配送费￥{{deliveryPrice}} 元</div>
           </div>
           <div class="deliver-base" :class="{ok :totalPrice >=minPrice }">
             {{inform}}
           </div>
           <div class="cart-list-wrapper"  ref="cartScroll" v-show="flag"  >
             <div class="cart-list-bg" @click="goList" v-show="totalCount !=0"></div>
             <ul class="cart-list">
                <div class="cart-title" v-show="totalCount !=0">
                    <span class="cart-title-left">购物车</span>
                    <span class="cart-title-right" @click="clearAll">清空</span>
                </div>
               <!-- <li v-for= "food in selectFoods" :key="food.id"></li> -->
                <li class="cart-list-item" v-for= "food in selectFoods" :key="food.id">
                 <span class="cart-foodName">{{food.name}}</span>
                 <span class="cart-foodPrice">￥<strong>{{food.price}}</strong></span>
                 <span class="cart-add"><cartControl  :food = food></cartControl></span>
               </li>
               
             </ul>
           </div>
       </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartControl from './cartControl'
export default {
  name: 'HelloWorld',
  props: {
    deliveryPrice :{
      type: Number
    },
    minPrice :{
      type: Number
    },
    selectFoods :{
      type: Array ,
      default(){
        return []
      }
    }
  },
  components:{
    cartControl
  },
  computed:{
    totalCount(){
      let totalCount = 0
      this.selectFoods.forEach(ele=>{
        totalCount += ele.count
      })
      return totalCount
    },
    totalPrice(){
      let totalPrice = 0
      this.selectFoods.forEach(ele=>{
        totalPrice += ele.count*ele.price
      })
      return totalPrice
    },
    inform(){
      if (this.totalPrice === 0){
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice >0 && this.totalPrice<this.minPrice){
        return `还差￥${this.minPrice-this.totalPrice}起送`
      } else {
        return `去结算`
      }
      }
  },
  data () {
    return {
      flag:false,
      msg: 'Welcome to Your Vue.js App'             
    }
  },
   created () {
    Vue.nextTick(()=>{
      this._initScroll()
    })
  },
  methods:{
    clearAll(){
      this.selectFoods.forEach(food =>{
        food.count = 0
      })
    },
    goList(event){ 
      // event.cancelBubble = true
      this.flag = !this.flag
      console.log(this.flag)
    },
     _initScroll(){
      this.scroll = new BScroll(this.$refs.cartScroll,{
        click: true
      })
      // this.scroll.on('scroll',(pos) => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.shopCart 
    position fixed
    bottom 0
    left 0
    height 48px
    width 100%
    background-color #141d27
    z-index 10
  .shopCart-wrapper
    width 100%
    display flex
    .shart-icon-wrapper
      flex 0 0 80px
      position relative
      .char-icon
       position relative
       width 44px
       height 44px
       border-radius 44px
       border 6px solid #141d27
       background-color #2b333b
       margin-left 12px
       margin-top -10px
       font-size 24px
       color rgba(255,255,255,0.4)
       line-height 44px
       text-align center
       &.noChart
        background-color  #00a9dc
        color #ffffff
      .total-count
       position absolute
       right 0
       top -6px
       text-align center
       background-color  red
       color #ffffff
       width 24px
       height 16px
       font-size 12px
       line-height 16px
       font-weight 700
       border-radius  16px
       box-shadow  0 4px 8px 0 rgba(0,0,0,0.4)
    .deliver-fee   
        flex 1
        padding 12px 0 12px 0
        height 24px
      .price
        display inline-block
        line-height 24px
        color rgba(255,255,255,0.2)
        border-1px-right (rgba(255,255,255,0.2))
        padding-right 12px
        &.noPrice
            color  #ffffff
      .deliveryPrice
          display inline-block
          padding-left  12px
          font-size 12px
          color rgba(255,255,255,0.4)
          line-height 20px
          font-weight 700
    .deliver-base
        flex 0 0 105px 
        padding  0 8px
        line-height 48px
        font-size 12px
        text-align center
        color rgba(255,255,255,0.2)
        font-weight 700
        background-color #2b333b
        &.ok
          background-color green 
          color #ffffff
    .cart-list-wrapper
      position  fixed
      top 0
      width 100%
      z-index -1
      .cart-list-bg
        position  fixed
        top 0
        width 100%
        height 100%
        background-color rgba(7,17,27,0.6)
      .cart-list
        width 100%
        position fixed
        bottom 48px
        .cart-title
          width 100%
          height 40px
          background-color #f3f5f7
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
          line-height 40px
          .cart-title-left
            float  left 
            margin-left 18px
            &.select
              color rgb(0,160,220)
          .cart-title-right
            float  right
            margin-right 18px
            &.select
              color rgb(0,160,220)
        .cart-list-item
         height 48px
         width 100%
         background-color #ffffff
         line-height 48px
         position relative
         .cart-foodName
          position absolute
          left 18px
         .cart-foodPrice
          position absolute
          right 104px
          font-size 10px
          color rgb(240,20,20)
          strong
           font-size 14px
           font-weight 700

         .cart-add
          position absolute
          right 18px
          top 9px

</style>
