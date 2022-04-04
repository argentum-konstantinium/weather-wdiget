<template>
  <div class="widget">
    <WidgetHeader v-if="!settingsState" class="widget__header"/>
    <transition name="switch-content" mode="out-in">
      <WidgetMetcasts key="metcasts" v-if="!settingsState"/>
      <WidgetSettings key="settings" v-if="settingsState"/>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WidgetHeader from '@/components/Widget/WidgetHeader.vue';
import WidgetMetcasts from '@/components/Widget/WidgetMetcasts.vue';
import WidgetSettings from '@/components/Widget/WidgetSettings.vue';
import WidgetMixin from '@/mixins/widget.ts';
import api from '@/api/weatherApi.ts';
import locationsMixin from '@/mixins/locations.ts';
import metcastMixin from '@/mixins/metcasts.ts';

export default Vue.extend({
  name: 'Widget',
  mixins: [WidgetMixin, locationsMixin, metcastMixin],
  components: {
    WidgetHeader,
    WidgetMetcasts,
    WidgetSettings,
  },
  methods: {
    async getMetcastsFromUserLocation(): Promise<void> {
      const {
        country,
        city,
      } = await api.getVisitorInfo();
      const visitorLocation = {
        country,
        city,
        id: Date.now(),
      };
      this.addLocation(visitorLocation);
      this.updateLocalstorage();
      this.getMetcasts();
    },
    async loadLocationsList(): Promise<void> {
      const data = localStorage.getItem('locations');
      try {
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.length !== 0) {
            this.locations = parsedData;
            this.getMetcasts();
            return;
          }
        }
        this.getMetcastsFromUserLocation();
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.loadLocationsList();
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
@import '@/assets/style/animations';

.widget {
  opacity: 0.94;
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-height: 400px;
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  padding: $widgetPadding;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55);
  transition: 0.2s linear;

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(21deg, rgba(131, 58, 180, 0.9) 0%,
      rgba(29, 214, 253, 0.9) 56%,
      rgba(159, 211, 233, 0.9) 100%);
    left: 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
    backdrop-filter: blur(4px);
  }

  &:hover {
    opacity: 1;
  }

  &__header {
    position: absolute;
    right: $widgetPadding;
    top: $widgetPadding;
    z-index: 1;
  }
}
</style>
