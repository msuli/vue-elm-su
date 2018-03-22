<template>
  <div class="loading-wrap">
    <div class="loading-container">
      <div ref="loadImg" class="load-img" :style="{backgroundPositionY: '-' + positionY + 'px'}"></div>
    </div>
    <div class="radius"></div>
  </div>
</template>
<script>
  export default{
      data(){
          return {
            positionY: 0,
            timer: null
          }
      },
    mounted(){
      this.timer = setInterval(() => {
          this.positionY+= 50;
          console.log(123)
      } ,600)
    },
    beforeDestroy(){
        clearInterval(this.timer);
        console.log(1)
    }
  }
</script>
<style>
  .loading-wrap{
    position: fixed;
    width:50px;
    left:50%;
    top:50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .loading-container{
    height: 50px;
  }
  .load-img {
    width: 100%;
    height: 100%;
    background: url("../../images/icon_loading.png");
    background-size: 50px auto;
    background-position: 50px -100px;
    animation: fade .8s infinite ease;
    position:relative;
    transform: translateY(-100px);
  }
  @keyframes fade {
    0% {
      transform: translateY(-100px);
    }
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100px);
    }
  }
  .radius{
    position: fixed;
    width: 50px;
    height: 20px;
    background: #cccccc;
    border-radius: 50%;
    margin:0 auto;
    animation: shadow .8s infinite ease;
    transform-origin: bottom;
  }
  @keyframes shadow {
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(0.5);
    }
    100%{
      tansform:scale(1);
    }
  }
</style>
