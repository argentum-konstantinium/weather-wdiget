<template>
  <div class="settings-item">
    <div @click="itemOpened = !itemOpened" class="settings-item__header d-flex j-between">
      <BasicButton class="settings-item__drag-btn" type="text">
        <Icon class="settings-item__icon" :path="icons.mdiDragVertical"/>
      </BasicButton>
      <span class="settings-item__location">
        {{ formattedLocation }}
      </span>
      <div class="settings-item__control d-flex ai-center">
        <BasicButton shadow type="text" rounded centred>
          <Icon :class="{'settings-item__icon_top': itemOpened}"
                class="settings-item__icon" :path="icons.mdiChevronDown"/>
        </BasicButton>
        <BasicButton @click.stop="applyRemoving" type="text" centred rounded>
          <Icon class="settings-item__icon" :path="icons.mdiClose"/>
        </BasicButton>
      </div>
    </div>
    <ExpandArea>
      <div v-show="itemOpened" class="settings-item__body">
        <BasicInput class="settings-item__input" placeholder="location"/>
      </div>
    </ExpandArea>
  </div>
</template>

<script>
import { mdiChevronDown, mdiClose, mdiDragVertical } from '@mdi/js';
import ExpandArea from '@/components/basic/BasicExpandArea.vue';
import BasicButton from '@/components/basic/BasicButton.vue';
import Icon from '@/components/basic/BasicIcon.vue';
import BasicInput from '@/components/basic/BasicInput.vue';
import locationsMixin from '@/mixins/locations';
import metcastsMixin from '@/mixins/metcasts';

export default {
  name: 'WidgetSettingsItem',
  mixins: [locationsMixin, metcastsMixin],
  components: {
    ExpandArea,
    BasicButton,
    BasicInput,
    Icon,
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    gmap: null,
  },
  data() {
    return {
      icons: {
        mdiChevronDown,
        mdiClose,
        mdiDragVertical,
      },
      input: null,
      itemOpened: false,
      autocomplete: null,
    };
  },
  watch: {
    gmap: {
      handler(maps) {
        this.gmap = maps;
        this.initAutocomplete();
      },
    },
  },
  computed: {
    formattedLocation() {
      if (this.settings.country && this.settings.city) {
        return `${this.settings.city}, ${this.settings.country}`;
      }
      return '';
    },
  },
  methods: {
    initAutocomplete() {
      this.autocomplete = new this.gmap.maps.places.Autocomplete(this.input, {
        fields: ['address_components'],
        types: ['(cities)'],
      });
      this.gmap.maps.event.addListener(this.autocomplete, 'place_changed', () => {
        this.saveAutocompleteResult();
      });
    },
    applyRemoving() {
      this.removeLocation(this.settings);
      this.getMetcasts();
    },
    saveAutocompleteResult() {
      const { address_components: addressComponents } = this.autocomplete.getPlace();
      const { long_name: city } = addressComponents.find((addressComp) => (
        addressComp.types.includes('locality')
      ));
      const { short_name: country } = addressComponents.find((addressComp) => (
        addressComp.types.includes('country')
      ));
      if ((this.settings.country !== country) && (this.settings.city !== city)) {
        this.settings.country = country;
        this.settings.city = city;
        this.updateLocalstorage();
        this.getMetcasts();
      }
    },
  },
  mounted() {
    this.input = this.$el.querySelector('input');
    if (this.gmap) {
      this.initAutocomplete();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';

.settings-item {
  background: #ffffff;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  padding: 5px;

  &__header {
    padding: 5px;
    cursor: pointer;
    color: #101013;
  }

  &__drag-btn {
    cursor: move;
  }

  &__icon {
    pointer-events: none;
    transition: .2s linear;
    fill: $basicColor;

    &_top {
      transform: rotate(180deg);
    }
  }

  &__body {
    transition: .2s ease-in;
  }

  &__input {

    border-radius: 5px;
  }
}
</style>
