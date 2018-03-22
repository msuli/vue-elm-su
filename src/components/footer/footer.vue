<template>
  <section id="foot-guide">
    <section class="guide-item">
      <svg class="icon-style"></svg>
      <span>外卖</span>
    </section>
    <section class="guide-item">
      <svg class="icon-style"></svg>
      <span>订单</span>
    </section>
    <section class="guide-item">
      <svg class="icon-style"></svg>
      <span>搜索</span>
    </section>
    <section class="guide-item">
      <svg class="icon-style"></svg>
      <span>我的</span>
    </section>
  </section>
</template>
<script></script>
<style lang="scss" scoped>
  #foot-guide{
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height:1.95rem;
    width:100%;
    box-shadow: 0 -0.026rem 0.053rem rgba(0, 0, 0, 0.1);
    .guide-item{
      flex: 1;
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: center;
      width:25%;
      span{
        font-size: 0.45rem;
        color: #666;
      }
    }
  }
</style>

