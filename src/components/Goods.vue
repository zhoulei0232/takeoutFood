<template>
  <div id="goods">
    <div class="goods-wrapper" >
           <div class="left-menu" ref="menuWrapper">
            <ul >
              <li class="menu" v-for="(items , index) in goods" :key="index" :class="{current : currentIndex === index}"  @click="selectIndex(index,$event)" >
                <div class="menu-alone border-1px" >
                  <span class="icon" v-show="items.type > 0"  :class="classMap[items.type]"></span>
                  <span class="menu-text">{{items.name}}</span>
                </div>
              </li>
            </ul>
           </div>
           <div class="right-foodtype" ref="rightFoodtype" >
               <ul >
                 <li v-for="(items , index) in goods" :key="index" class="food-List-Hook">
                    <div class="food-name">{{items.name}}</div>
                    <ul class="food-type">
                      <li class="food-li border-1px" v-for="(item2 , index) in items.foods" :key="index" >
                            <div class="food-img">
                              <img :src="item2.icon" alt="" :style="{width:'57px' , height:'57px'}">
                            </div>
                            <div class="food-title">
                                <p class="food-title-name">{{item2.name}}</p>
                                <p class="food-title-show" v-show="item2.description">{{item2.description}}</p>
                                <p class="food-title-rating">
                                  <span>月售{{item2.sellCount}}份</span>
                                  <span>好评率{{item2.rating}}%</span>
                                </p>
                                <div class="food-title-price">
                                  <span class="food-title-price-red"><strong>￥</strong>{{item2.price}}</span>
                                  <span class="food-title-price-black" v-show="item2.oldPrice"><strong>￥</strong>{{item2.oldPrice}}</span>
                                  <div class="cartShow">
                                     <cartControl :food = item2></cartControl>
                                  </div>
                                </div> 
                            </div>
                      </li>
                    </ul>
                   </li> 
               </ul>
           </div>
     </div>
     <!-- 购物车 -->
      <shopCart  :deliveryPrice = "seller.deliveryPrice"  :minPrice = "seller.minPrice" :selectFoods = selectFoods></shopCart>
            
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import shopCart from './shopCart'
import cartControl from './cartControl'

export default {
  name: 'goods',
   props:{
    seller:{
      type : Object
    }
  },
  data () {
    return {
      goods:[],
      msg: 'Welcome to Your Vue.js App',
      heightList:[],
      scrollY:0
    }
  },
  components:{
    shopCart,
    cartControl
  },
  created (){
     this.classMap = ['decrease','discount','special','invoice','guarantee']
    axios.get('/good/goods').then(
      res => {
        if (res.data.code === 0){
          this.goods = res.data.data
          Vue.nextTick(()=>{
            this._initscroll()
            this._caculateHeight()
          })  
        }
      }
    )
  },
  computed:{
    currentIndex(){
      for (let i = 0 ;i<this.heightList.length ;i++){
        let height1 =this.heightList[i]
        let height2 =this.heightList[i+1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY <height2)){
          return i
        }
      }
      return 0
    },
    selectFoods(){
     let foods = []
     if (this.goods.length !== 0){
       this.goods.forEach(good=>{
         good.foods.forEach(food=>{
           if (food.count){
             foods.push(food)
           }
         })
       })
     }
     return foods
    }
  },
  methods:{
    selectIndex($index,$event){
      if (!$event._constructed){
        return 
      }
       let foodLi = this.$refs.rightFoodtype.getElementsByClassName('food-List-Hook')
       this.foodScroll.scrollToElement(foodLi[$index],300)
    },
    _initscroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper , {
          click : true
        })
        this.foodScroll = new BScroll(this.$refs.rightFoodtype , {
          probeType :3,
          click:true
        })
        this.foodScroll.on('scroll',(pos) =>{
          this.scrollY = Math.abs(Math.round(pos.y))
        })
    },
    _caculateHeight(){
      let foodLi = this.$refs.rightFoodtype.getElementsByClassName('food-List-Hook')
      let height = 0
      this.heightList.push(height)
      for (let i = 0 ; i<foodLi.length ; i++){
        let item = foodLi[i]
        height += item.clientHeight 
        this.heightList.push(height)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
  #goods
    .goods-wrapper
      display flex
      position absolute
      top 174px
      bottom 48px
      left 0
      right 0
      width 100%
      overflow hidden
      .left-menu
        flex 0 0 80px
        width 80px
        height 100%
        background-color #f3f5f7
        .menu
          padding 0 12px
          &.current
            background-color #ffffff
            position relative
            margin-top -1px
            &:after
             border-top 1px solid #ffffff
            .menu-text 
               font-size 12px
               color rgb(7,17,27)
               font-weight 500
               line-height 14px
         .menu-alone
            display table-cell
            vertical-align middle
            width 56px
            height 54px
            border-1px (rgba(7,17,27,0.1))  
         .menu-text 
             font-size 12px
             color rgb(77,85,93)
             font-weight 200
             line-height 14px
            .icon
                display inline-block
                vertical-align bottom
                width 14px
                height 14px
                background-size 14px 14px
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
      .right-foodtype
        .food-name
          height 25px
          border-left 1px solid #d9dde1
          background-color #f3f5f7
          color  rgb(147,153,159)
          font-size 12px
          line-height 25px
          padding-left 14px
        .foodtype
          padding 18px
         .food-li
           border-1px (rgba(7,17,27,0.1))
           display flex
           flex-direction row
           margin-left 18px  
           margin-right 18px 
           margin-top 18px 
           font-size 0
           padding-bottom 18px 
           .food-title
             width 100%
             margin-left 10px  
            .food-title-name
                color rgb(7,17,27)
                font-size 14px
                line-height 14px
                margin-top 4px
            .food-title-show,.food-title-rating
                font-size 10px
                line-height 10px
                margin-top 8px
                color rgb(147,153,159)
              .food-title-rating span:last-child
                margin-left 12px
              .food-title-price
                position relative
                display inline-block
                width 100%
                font-size 14px
                line-height 14px
                margin-top 8px
                font-weight 700
              .food-title-price-red
                  color rgb(240,20,20)
                  strong 
                  font-size  10px 
              .food-title-price-black
                  margin-left 4px
                  color rgb(147,153,159)
                  text-decoration line-through
                  strong 
                  font-size  10px 
              .cartShow
                display inline-block
                position absolute
                right  0
                bottom -4px
                
              
</style>
