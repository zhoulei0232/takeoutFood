<template>
  <div class="cartControl">
       <div class="cartControl-wrapper">
           <span class="cartControl-icon icon-remove_circle_outline" @click="remove" v-show="food.count>0"></span>
           <span class="cartNum" v-show="food.count>0">{{food.count}}</span>
           <span class="cartControl-icon icon-add_circle" @click="add"></span>
       </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  
  props:{
    food:{
      type: Object
    }
  },
  methods:{
    add(event){
      console.log(this.food)
      if (event._constructed){
        if (!this.food.count){
          Vue.set(this.food ,'count',1)
        } else {
           this.food.count++ 
        }
      }
    },
    remove(event){
      if (event._constructed){
        if (this.food.count ===0){
          return
        }
        this.food.count--
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.cartControl
   .cartControl-wrapper
     font-size 24px
     color rgb(0,160,220)
     line-height 24px
     .cartControl-icon
        vertical-align middle
        padding 2px
     .cartNum
        width 24px
        font-size 10px
        line-height 24px
        color rgb(147,153,159)
</style>
