<template>
  <div id="app">
     <v-header  :seller = "seller"></v-header>
    
     <div class="tab border-1px">
       <div class="tab-item"><router-link to="goods">商品</router-link></div>
       <div class="tab-item"><router-link to="rating">评价</router-link></div>
       <div class="tab-item"><router-link to="seller">商家</router-link></div>
     </div>
     <div class="content">
         <router-view :seller = "seller"></router-view>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import header from '@/components/Header'

export default {
  name: 'App',
  data (){
    return {
      seller : {}
    }
  },
  components:{
    'v-header': header
  },
  created (){
   
    axios.get('/good/seller').then(
      res => {
        if (res.data.code === 0){
          this.seller = res.data.data
           console.log(this.seller)
           
        }
       
      }
    )
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
 @import 'assets/stylus/index.styl'; 
#app
  .tab 
     display flex
     height 40px
     line-height  40px
     border-1px (rgba(240,20,20,0.1))
     .tab-item
       flex 1
       text-align center 
       font-size 14px
       color rgb(77,85,93)
       a 
         width  100%
         height 100%
         display block
      a.active
         color rgb(240,20,20)
 
</style>
