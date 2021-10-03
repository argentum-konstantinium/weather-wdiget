<template>
  <div class="settings">
    <WidgetSettingsHeader class="settings__header"/>
    <VueScrollbar classes="settings__scrollbar">
      <div v-if="locations.length > 0" role="list" class="settings__list">
        <Draggable
          handle=".settings-item__drag-btn" v-model="locations"
          v-bind="dragOptions"
          @end="getMetcasts">
          <transition-group name='add-in-list'>
            <WidgetSettingsItem :gmap="gmap"
                                class="settings__item" v-for="location of locations"
                                :key="location.id"
                                :settings="location"/>
          </transition-group>
        </Draggable>
      </div>
    </VueScrollbar>
    <BasicButton @click="applyAddition" class="settings__add-btn" shadow>
      Add location
    </BasicButton>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { Loader } from '@googlemaps/js-api-loader';
import VueScrollbar from 'vue2-scrollbar';
import WidgetSettingsHeader from './WidgetSettingsHeader.vue';
import WidgetSettingsItem from './WidgetSettingsItem.vue';
import LocationsMixin from '@/mixins/locations';
import BasicButton from '@/components/basic/BasicButton.vue';
import config from '@/config/config.json';
import metcastsMixin from '@/mixins/metcasts';

export default {
  name: 'WidgetSettings',
  mixins: [LocationsMixin, metcastsMixin],
  components: {
    WidgetSettingsHeader,
    WidgetSettingsItem,
    BasicButton,
    Draggable,
    VueScrollbar,
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
      },
      gmap: null,
    };
  },
  methods: {
    applyAddition() {
      this.addLocation({
        city: '',
        country: '',
        id: Date.now(),
      });
    },
  },
  async mounted() {
    const loader = new Loader({
      apiKey: config.googleToken,
      versions: 'weekly',
      libraries: ['places'],
      language: 'en',
    });
    this.gmap = await loader.load();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/animations";
@import '~vue2-scrollbar/dist/style/vue2-scrollbar.css';
.settings {
  &__header {
    margin-bottom: 15px;
  }

  &__scrollbar {
    margin-bottom: 20px;
    height: 270px;
    background: none;
  }

  &__drag-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__add-btn {
    padding: 10px;
    margin: 0 auto;
    display: block;
  }
}
</style>
