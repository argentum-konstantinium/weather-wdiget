<template>
  <div class="settings-header">
    <BasicButton class="settings-header__close-btn" shadow rounded centred
                 @click="settingsState = false">
      <BasicIcon class="settings-header__icon" :path="icons.mdiCloseCircleOutline"/>
    </BasicButton>
  </div>
</template>

<script>
import { mdiCloseCircleOutline } from '@mdi/js';
import BasicButton from '@/components/basic/BasicButton.vue';
import BasicIcon from '@/components/basic/BasicIcon.vue';
import widgetMixin from '@/mixins/widget';

export default {
  name: 'WidgetSettingsHeader',
  components: {
    BasicButton,
    BasicIcon,
  },
  mixins: [widgetMixin],
  data() {
    return {
      icons: {
        mdiCloseCircleOutline,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
@import '@/assets/style/mixins';
  .settings-header {
    transition: .2s linear;
    &__close-btn {
      margin-left: auto;
      &:not(:disabled):hover {
        .settings-header__icon {
          fill: $basicBtnHoverFont;
        }
      }
      @include roundedBtnHover;
    }
    &__icon {
      transition: .2s linear;
      fill: $basicColor;
    }
  }
</style>
