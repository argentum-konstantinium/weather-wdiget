<template>
  <div class="widget">
    <WidgetHeader/>
    <WidgetBody/>
    <WidgetBackground/>
  </div>
</template>

<script>
import WidgetHeader from '@/components/Widget/WidgetHeader.vue';
import WidgetBody from '@/components/Widget/WidgetBody.vue';
import WidgetBackground from '@/components/Widget/WidgetBackground.vue';

export default {
  name: 'Widget',
  components: {
    WidgetHeader,
    WidgetBody,
    WidgetBackground,
  },
};
</script>

<style lang="scss" scoped>
.widget {
  opacity: 0.8;
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-height: 400px;
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  padding: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55);
  transition: 0.2s linear;
  &:hover {
    opacity: 1;
  }
}
</style>
