<template>
  <svg class="basic-icon" aria-hidden="true" width="24" height="24">
    <path :d="path" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-icon {
  display: block;
  width: 24px;
  height: 24px;
  pointer-events: none;
}
</style>
