<template>
  <transition
    :name="name"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'ExpandArea',
  props: {
    name: {
      type: String,
    },
  },
  methods: {
    beforeEnter(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = '0px';
          element.style.overflow = 'hidden';
        }
      });
    },
    enter(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`;
          element.style.overflow = 'hidden';
        });
      });
    },
    afterEnter(element) {
      element.style.height = null;
      element.style.overflow = null;
    },
    beforeLeave(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`;
          element.style.overflow = 'hidden';
        }
      });
    },
    leave(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = '0px';
          element.style.overflow = 'hidden';
        });
      });
    },
    afterLeave(element) {
      element.style.height = null;
      element.style.overflow = null;
    },
  },
};
</script>
