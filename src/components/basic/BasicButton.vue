<template>
  <button @click="$emit('click', $event)" class="basic-btn"
          @focus="$emit('focus', $event)"
          :class="{'basic-btn_rounded': rounded,
          'basic-btn_centred': centred,
          'basic-btn_text': type === 'text',
          'basic-btn_shadow': shadow,
          'basic-btn_normal': type === 'normal'}"
          :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    type: {
      type: String,
      default: 'normal',
    },
    rounded: {
      type: Boolean,
    },
    centred: {
      type: Boolean,
    },
    shadow: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixins.scss';
@import "@/assets/style/variables";
.basic-btn {
  background: $basicBtnBg;
  transition: .2s linear;
  border-radius: $basicBorderRadius;
  font-size: 0.85em;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &_normal {
    &:not(:disabled):hover {
      background: $basicBtnHoverBg;
      color: $basicBtnHoverFont;
    }
  }
  &:active {
    background: #d3d2d2;
  }
  &_shadow {
    box-shadow: $basicShadow;
  }
  &_rounded {
    border-radius: 50%;

  }
  &_text {
    background: none;
    box-shadow: none;
  }
  &_centred {
    @include centredFlex;
  }
}
</style>
