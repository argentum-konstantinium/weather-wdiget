<template>
  <div class="widget-header">
    <BasicButton shadow @click="settingsState = true" rounded centred class="widget-header__btn"
                 aria-label="settings">
      <Icon class="widget-header__btn-icon" :path="icons.mdiCogOutline"/>
    </BasicButton>
  </div>
</template>

<script>
import { mdiCogOutline } from '@mdi/js';
import BasicButton from '@/components/basic/BasicButton.vue';
import Icon from '@/components/basic/BasicIcon.vue';
import widgetMixin from '@/mixins/widget';

export default {
  name: 'WidgetHeader',
  mixins: [widgetMixin],
  components: {
    BasicButton,
    Icon,
  },
  data() {
    return {
      icons: {
        mdiCogOutline,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
@import '@/assets/style/mixins';
.widget-header {
  &__btn {
    margin-left: auto;
    padding: 5px;
    transition: transform .2s linear;
    &-icon {
      display: block;
      width: 100%;
      fill: $basicColor;
      transition: .2s linear
    }
    @include roundedBtnHover;
    &:not(:disabled):hover {
      .widget-header__btn-icon {
        fill: $basicBtnHoverFont;
      }
    }
  }
}
</style>
