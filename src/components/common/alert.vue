<template>
  <div class="tip-alert">
    <div class="tip-icon">
      <span class="icon-circle"></span>
      <span></span>
    </div>
    <div class="tip-text">{{tipText}}</div>
    <button class="confirm" @click.stop="confirm">确认</button>
  </div>
</template>
<script>
  export default{
    props: ['tipText'],
    methods: {
      confirm(){
        this.$emit('confirmed', false);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  @keyframes big-scale {
    0% {
      transform: translateX(-50%) scale(0);
    }
    25% {
      transform: translate(-50%, 0) scale(1.2);
    }
    50% {
      transform: translate(-50%, 0) scale(1);
    }
    75% {
      transform: translate(-50%, 0) scale(1.2);
    }
    100% {
      transform: translate(-50%, 0) scale(1);
    }
  }

  .tip-alert {
    width: 80%;
    height: 30%;
    top: 30%;
    background: $white;
    padding: 0.8rem 0 0;
    @include lrc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: big-scale 0.5s ease;
    z-index: 45;
    .tip-icon {
      width: 4rem;
      height: 4rem;
      border: 0.15rem solid #f8cb86;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        &:nth-child(1) {
          width: 0.17rem;
          height: 2rem;
          background: #f8cb86;
        }
        &:last-child {
          background: #f8cb86;
          border: 0.15rem solid #f8cb86;
          border-radius: 50%;
          margin-top: 0.3rem;
        }
      }
    }
    .tip-text {
      font-size: 0.8rem;
    }
    .confirm {
      width: 100%;
      font-size: 0.8rem;
      color: $white;
      font-weight: 600;
      padding: 0.5rem 0;
      background: $successbutton;
    }
  }

</style>
