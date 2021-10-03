<template>
  <div class="carousel">
    <BasicButton class="carousel__btn carousel__btn_prev" :disabled="activeSlide === 0"
                 @click="activeSlide -= 1" rounded centred
                 aria-label="Previous slide">
      <Icon class="carousel__icon" aria-hidden="true"
            :path="icons.mdiArrowLeftBoldCircleOutline"/>
    </BasicButton>
    <div :style="calculatedStyles" ref="track" class="carousel__track">
      <slot></slot>
    </div>
    <BasicButton class="carousel__btn carousel__btn_next"
                 :disabled="activeSlide + 1 === slidesNumber" @click="activeSlide += 1" rounded
                 centred
                 aria-label="Next slide">
      <Icon class="carousel__icon" aria-hidden="true"
            :path="icons.mdiArrowLeftBoldCircleOutline"/>
    </BasicButton>
  </div>
</template>

<script>
import { mdiArrowLeftBoldCircleOutline } from '@mdi/js';
import BasicButton from '@/components/basic/BasicButton.vue';
import Icon from '@/components/basic/BasicIcon.vue';

export default {
  components: {
    BasicButton,
    Icon,
  },
  name: 'BasicCarousel',
  props: {
    animationDuration: {
      type: String,
      default: '300ms',
    },
    cssEasing: {
      type: String,
      default: 'linear',
    },
    auto: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeSlide: 0,
      slidesNumber: 0,
      icons: {
        mdiArrowLeftBoldCircleOutline,
      },
    };
  },
  watch: {
    activeSlide: {
      handler(newVal, oldVal) {
        this.activeSlide = newVal;
        this.defineActiveSlide(newVal, oldVal);
      },
    },
  },
  computed: {
    calculatedTransform() {
      return `-${100 * (this.activeSlide / this.slidesNumber)}%`;
    },
    calculatedStyles() {
      return `transform: translateX(${this.calculatedTransform});
      transition: ${this.animationDuration} ${this.cssEasing}`;
    },
  },
  methods: {
    defineActiveSlide(activeSlide, prevSlide) {
      this.$refs.track.childNodes[activeSlide]?.classList.add('carousel__active-slide');
      this.$refs.track.childNodes[prevSlide]?.classList.remove('carousel__active-slide');
    },
  },
  mounted() {
    this.slidesNumber = this.$refs?.track?.childNodes?.length;
    /* eslint-disable */
    this.$refs?.track?.childNodes?.forEach((slide) => {
      slide.classList.add('carousel__slide');
      slide.style.transition = this.animationDuration + ' ' + this.cssEasing; // eslint crash if we use template string here
    });
    this.defineActiveSlide(0, 1);
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/variables';
.carousel {
  position: relative;
  overflow: hidden;
  &__btn {
    position: absolute;
    top: 50%;
    z-index: 1;
    &_prev {
      left: 0;
    }
    &_next {
      transform: scale(-1);
      right: 0;
    }
    &:not(:disabled):hover .carousel__icon {
      fill: $basicBtnHoverFont;
    }
  }
  &__icon {
    pointer-events: none;
    fill: $basicColor;
  }

  &__slide {
    opacity: 0;
    transform: scale(0.5);
  }

  &__active-slide {
    opacity: 1;
    transform: scale(1);
  }

  &__track {
    display: flex;
    width: fit-content;
  }
}
</style>
