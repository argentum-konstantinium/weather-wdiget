<template>
  <div class="widget-background" aria-hidden="true"></div>
</template>

<script>
export default {
  name: 'WidgetBackground',
};
</script>

<style lang="scss" scoped>
.widget-background {
  position: absolute;
  background: rgba(159, 159, 229, 0.68);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;
  backdrop-filter: blur(4px);
}
</style>
