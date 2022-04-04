<template>
  <div id="app">
    <Widget/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Widget from '@/components/Widget.vue';
import store from '@/store/index';

export default Vue.extend({
  name: 'App',
  store,
  components: {
    Widget,
  },
});
</script>

<style lang="scss">
@import "@/assets/style/index.scss";
</style>
