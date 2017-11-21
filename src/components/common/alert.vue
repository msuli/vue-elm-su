<template>
  <div>
    <div class="tip-icon">
      <span></span>
      <span></span>
    </div>
    <div class="tip-text">{{tipText}}</div>
    <button class="confirm"></button>
  </div>
</template>
<script>
  export default{
    props: ['tipText']
  }
</script>
<style lang="scss" scoped>

</style>
