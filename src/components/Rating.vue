<template>
  <div class="rating">
       <div class="rating-wrapper border-1px">
         <div class="rating-left border-1px-right">
            <h1 class="rating-left-rating">{{seller.score}}</h1>
            <p class="rating-left-title">综合评分</p>
            <p class="rating-left-content">高于周边商家{{seller.rankRate}}%</p>
         </div>
         <div class="rating-right">
           <li class="serviceScore"><span class="serviceScore-title">服务态度</span><span class="serviceScore-img"><star :score= "seller.serviceScore" :size= "36"></star></span><span class="serviceScore-num">{{seller.serviceScore}}</span></li>
           <li><span class="foodScore-title">服务态度</span><span class="foodScore-img"><star :score= "seller.foodScore" :size= "36"></star></span><span class="foodScore-num">{{seller.foodScore}}</span></li>
           <li><span class="deliveryTime-title">送达时间</span><span class="deliveryTime-min">{{seller.deliveryTime}}分钟</span></li>
         </div>
       </div>
       <div class="border-wrapper  border-1px"></div>

       <div class="choice-wrapper   border-1px">
         <div class="choice border-1px">
           <span @click="satisfiedBind(2)" :class="{active: this.isSatisfied==2}">全部<strong>57</strong></span>
           <span @click="satisfiedBind(0)" :class="{active: this.isSatisfied==0}">满意<strong>47</strong></span>
           <span @click="satisfiedBind(1)" :class="{active1: this.isSatisfied==1}">不满意<strong>10</strong></span>
         </div>
         <div class="choice-content" @click="isText=!isText" ><span class="choice-icon icon-check_circle" :class="{showtext: this.isText}"></span>只看有内容的评价</div>
       </div>
       <ul class="rating-text-wrapper">
          <li class="rating-text-li border-1px" v-for="(items,index) in ratingData" :key="index" v-show="needshow(items.rateType,items.text)" >
             <div class="rating-text-left"><img :src="items.avatar" alt=""></div>
             <div class="rating-text-right">
                <p class="rating-text-username">{{items.username}}</p>
                <p class="rating-text-deliveryTime"><star :score= items.score :size= "24"></star><span v-show="items.deliveryTime">{{items.deliveryTime}}分钟送达</span></p>
                <p class="rating-text-text">{{items.text}}</p>
                <p class="rating-text-recommend"><span class="recommend-icon " :class="items.rateType ===0 ?'icon-thumb_up':'icon-thumb_down' "></span><span class="recommend-items" v-for="(item,index) in items.recommend" :key="index">{{item}}</span></p>
                <div class="folat-time">{{timestampToTime(items.rateTime)}}</div>
             </div>
          </li>
       </ul>
  </div>
</template>

<script>
import axios from 'axios'
import star from './star'

const ALL = 2
export default {
  name: 'HelloWorld',
  props:{
    seller:{
      type : Object
    }
  },
  data () {
    return {
      isText:false,
      isSatisfied:ALL,
      ratingData:{},
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  star
  },
  created(){
      axios.get('/good/ratings').then(
      res =>{
        if (res.data.code === 0){
          this.ratingData = res.data.data
        }
      }
    )
    
  },
  methods:{
    timestampToTime(timestamp){
      let date = new Date(timestamp)
      let year =date.getFullYear()+'-'
      let month =(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      let day = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '-'
      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      let addAll =[ hour,min,sec ].map((ele)=>{
        return this.formatNumber(ele)
      }).join(':')
      return year+month+day+addAll
    },
    formatNumber(n){
       n = n.toString()
      return n[1] ? n :'0'+n
    },
    satisfiedBind(type){
      this.isSatisfied = type
    },
    needshow(rateType,text){
        if (this.isText && !text){
          return false
        }
        if (this.isSatisfied === ALL){
           return true
        } else {
           return this.isSatisfied === rateType
        }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.rating
  width 100%
  .rating-wrapper
   padding 18px 0
   display  flex
   border-1px (rgba(240,20,20,0.1))
   .rating-left
      flex  0 0 137px
      text-align center
      border-1px-right (rgba(240,20,20,0.1))
      .rating-left-rating
       font-size 24px
       line-height 28px
       color rgb(255,153,0)
      .rating-left-title
       font-size 12px
       color rgb(7,17,27)
       font-weight 400
       line-height 12px
       margin-top 6px
      .rating-left-content
       font-size 10px
       color rgb(144,153,159)
       line-height 10px
       margin-top 8px
   .rating-right
      flex 0 0 237px
      margin-left 24px
      li
       list-style none 
       font-size 12px
       font-weight 400
       line-height 18px
       color rgb(7,17,27)
       margin-top 8px
       &.serviceScore
         margin-top 0px
        span:nth-of-type(2)
         margin 0 12px
        span:nth-of-type(3)
         color rgb(255,153,0)
         font-size 12px
  .border-wrapper
    height 20px
    width 100%
    background-color #eee
    border-1px (rgba(240,20,20,0.1))
  .choice-wrapper 
    padding  18px
    border-1px (rgba(240,20,20,0.1))
    .choice
      padding-bottom 18px
      border-1px (rgba(240,20,20,0.1))
      span 
        display inline-block
        font-size 16px
        line-height 16px
        padding 10px 12px
        margin-right 6px
        background-color #ccecf8
        &:nth-of-type(3)
         background-color #e9ebec
        &.active
         background-color #00a0dc
         color #ffffff
        &.active1
         background-color #ccc
        strong
         font-size 8px
         padding-left 5px
     .choice-content
       line-height 30px
       font-size 14px
       margin-top 18px
       color #b7bbbf
       .choice-icon
        vertical-align middle
        font-size 30px
        margin-right 5px
        &.showtext
          color #00a0dc
 .rating-text-wrapper
    padding 0 18px 48px 18px
    .rating-text-li
     list-style none 
     padding 18px 0
     border-1px (rgba(240,20,20,0.1))
     display flex
     .rating-text-left
       flex 0 0 40px
       img 
        width 28px
        height 28px
        border-radius  50%
     .rating-text-right
       position relative
       flex 0 0 299px
       .rating-text-username
        font-size 10px
        color rgb(7,17,27)
        line-height 12px
       .rating-text-deliveryTime
        color rgb(7,17,27)
        line-height 12px
        margin-top 4px
        span
         margin-left 6px
         font-size 10px
         color rgb(147,153,159)
         line-height 12px
       .rating-text-text
        font-size 12px
        color rgb(7,17,27)
        line-height 18px
        margin-top 6px
        word-wrap break-word
       .rating-text-recommend
        margin-top 8px
        line-height 16px 
        .recommend-icon
         display inline-block
         font-size 12px
         color rgb(0,160,220)
         margin-right 8px
         vertical-align top
         line-height 16px 
         &.icon-thumb_down
          color #ccc
        .recommend-items
         width 40px
         height 16px
         overflow hidden
         display inline-block
         font-size 9px
         padding 0 6px 
         margin-right 8px
         color rgb(147,153,159)
         line-height 16px 
         border 1px solid rgba(7,17,27,0.1)
       .folat-time
         position absolute
         top 0
         right 0
         font-size 12px
         color   rgb(7,17,27) 

</style>
