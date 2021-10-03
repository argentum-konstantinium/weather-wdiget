<template>
  <div id="app">
    <Widget/>
  </div>
</template>

<script>

import store from './store/index';
import Widget from '@/components/Widget.vue';

export default {
  name: 'App',
  store,
  components: {
    Widget,
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index.scss";
</style>
