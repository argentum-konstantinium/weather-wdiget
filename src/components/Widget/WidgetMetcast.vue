<template>
  <div class="metcast">
    <div class="metcast__header metcast__primary-text">
      {{ formattedLocation }}
    </div>
    <div class="metcast__body">
      <div class="metcast__main d-flex j-start ai-center centred">
        <BasicImage height="200" width="200" class="metcast__icon" :src="metcast.icon"/>
        <div class="metcast__temp">
          {{ Math.round(metcast.main.temp) }}°C
        </div>
      </div>
      <div class="metcast__description metcast__secondary-text">
        {{ formattedDescription }}
      </div>
      <div class="metcast__params metcast__params_main d-flex ai-center j-between">
        <div class="metcast__params metcast__secondary-text d-flex ai-center">
          <Icon class="metcast__icon" :path="icons.mdiNavigation"/>
          <span>{{ metcast.wind.speed }}m/s SSE</span>
        </div>
        <div class="metcast__params metcast__secondary-text d-flex ai-center">
          <Icon class="metcast__icon" :path="icons.mdiSpeedometer"/>
          {{ metcast.main.pressure }}hpa
        </div>
      </div>
      <div class="metcast__params metcast__params_main d-flex j-between">
        <div class="metcast__params metcast__secondary-text">
          Humidity: {{ metcast.main.humidity }}%
        </div>
        <div class="metcast__params metcast__secondary-text">
          Dew point: {{ dewPoint }}
        </div>
      </div>
      <div class="metcast__params metcast__params_main d-flex ai-center j-between">
        <div class="metcast__params metcast__secondary-text">
          Visibility: {{ (metcast.visibility / 1000).toFixed(1) }}km
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiNavigation, mdiSpeedometer } from '@mdi/js';
import BasicImage from '@/components/basic/BasicImage.vue';
import Icon from '@/components/basic/BasicIcon.vue';

export default {
  name: 'WidgetMetcast',
  components: {
    BasicImage,
    Icon,
  },
  props: {
    metcast: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icons: {
        mdiNavigation,
        mdiSpeedometer,
      },
    };
  },
  computed: {
    formattedDescription() {
      return `Feels like ${Math.round(this.metcast.main.feels_like)}°C.
      ${this.metcast.weather.main}, ${this.metcast.weather.description}`;
    },
    formattedLocation() {
      return `${this.metcast.name}, ${this.metcast.country}`;
    },
    dewPoint() {
      const { temp } = this.metcast.main;
      const { humidity } = this.metcast.main;
      const a = 17.27;
      const b = 237.7;
      const f = (a * temp) / (b + temp) + Math.log(humidity / 100);
      const result = (b * f) / (a - f);
      return Math.round(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.metcast {
  color: #fffdfd;
  line-height: 1em;
  font-weight: 300;
  &__secondary-text {
    font-size: 16px;
  }
  &__description {
    margin-bottom: 10px;
  }
  &__params {
    &_main {
      max-width: 250px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
  &__header {
    font-weight: 300;
    font-size: 18px;
  }

  &__temp {
    font-weight: 500;
    font-size: 36px;
  }

  &__icon {
    fill: #fffdfd;
  }
}
</style>
