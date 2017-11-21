<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';
export default {
  name: 'app',
  components: {
      appHeader: Header
  }
}
</script>

<style lang="scss">
@import "./style/common";

</style>
