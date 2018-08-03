<template>
  <div class="star" :class="starType">
        <span class="star-item" v-for="(itemClass,index) in itemClasses " :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
      score:{
          type:Number
      },
      size:{
          type:Number
      }

  },
  computed:{
      itemClasses(){
          let result = [] 
          let score = Math.floor(this.score*2)/2    
          /* 评分乘以2向下取整再除以2就可以算出是否有半星,比如评分是3.6 套用公式就是Math.floor(3.6*2)/2=3.5  */ 
          let hasDecimal = score % 1 !== 0 
          let interger = Math.floor(score)
          for (let i=0 ;i<interger ;i++){
              result.push(CLS_ON)
          }
          if (hasDecimal){
              result.push(CLS_HALF)
          }
          while (result.length < LENGTH){
              result.push(CLS_OFF)
          }
          return result
      },
      starType(){
          return 'star-'+ this.size
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.star
 display inline-block
 &.star-36
   .star-item
     display inline-block
     width 18px
     height 18px
     vertical-align top
     background-size 18px 18px
     margin 0 2px
     &.on
      bg-image('star36_on')
     &.half
      bg-image('star36_half')
     &.off
      bg-image('star36_off')
 &.star-24
   .star-item
     display inline-block
     width 12px
     height 12px
     vertical-align top
     background-size 12px 12px
     margin-right 2px
     &.on
      bg-image('star24_on')
     &.half
      bg-image('star24_half')
     &.off
      bg-image('star24_off')
</style>
