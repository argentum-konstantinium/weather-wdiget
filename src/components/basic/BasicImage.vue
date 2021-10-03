<template>
  <div class="image-container">
    <img class="image" @load="loaded = true" :class="{image_loading: !loaded, image_loaded: loaded}"
         :src="src"
         :alt="alt"
         :width="width"
         :height="height"
    >
  </div>
</template>

<script>
export default {
  name: 'BasicImage',
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  transition: .3s linear;
  display: block;
  &_loading {
    opacity: 0;
  }

  &_loaded {
    opacity: 1;
  }
}
</style>
