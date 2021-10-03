<template>
  <div v-if="metcasts.length > 0" class="widget-body">
    <BasicCarousel>
      <WidgetMetcast v-for="metcast of metcasts" :key="metcast.name"
                     :metcast="metcast"/>
    </BasicCarousel>
  </div>
</template>

<script>
import WidgetMetcast from './WidgetMetcast.vue';
import BasicCarousel from '@/components/basic/BasicCarousel.vue';
import metcastsMixin from '@/mixins/metcasts';
import locationsMixin from '@/mixins/locations';

export default {
  name: 'WidgetMetcasts',
  components: {
    BasicCarousel,
    WidgetMetcast,
  },
  mixins: [metcastsMixin, locationsMixin],
};
</script>
