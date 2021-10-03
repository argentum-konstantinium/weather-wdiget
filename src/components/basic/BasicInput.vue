<template>
  <label :class="{'basic-input_shadow': shadow}" class="basic-input">
    <span v-if="label" class="basic-input__label">{{label}}</span>
    <input @input="$emit('input', $event.target.value.trim())"
           @change="$emit('change', $event.target.value.trim())"
           @focus="$emit('focus', $event)"
           @click="$emit('click', $event)"
           :placeholder="placeholder" class="basic-input__input" type="text">
  </label>
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    shadow: {
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables';
.basic-input {
  display: block;
  position: relative;
  &_shadow {
    box-shadow: $basicShadow;
  }
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    bottom: 0;
    height: 2px;
    background: $basicColor;
    left: 0;
    transform: scaleX(0);
    transition: .2s ease-in;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }
  &__label {
    display: block;
    font-size: 0.875em;
    margin-bottom: 0.5em;
    padding: 5px 10px 0;
  }
  &__input {
    display: block;
    font-size: 1em;
    width: 100%;
    padding: 10px;
    background: $basicInputBg;
    transition: .2s linear;
    border-radius: $basicBorderRadius;
    &::placeholder {
      color: $basicInputPlaceholder;
      transition: .2s linear;
    }
    &:focus {
      background: $basicInputFocusBg;
      &::placeholder {
        color: $basicInputFocusPlaceholder;
      }
    }
    &:hover {
      background: $basicInputHoverBg;
      &::placeholder {
        color: $basicInputFocusPlaceholder;
      }
    }
  }
}
</style>
