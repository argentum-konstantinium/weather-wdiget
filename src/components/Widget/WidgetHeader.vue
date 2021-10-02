<template>
  <div class="widget-header">
    <b-button class="widget-header__button" size="is-small" type="is-primary is-light"
              aria-label="settings" rounded>
      <b-icon type="is-primary" aria-hidden="true" pack="mdi" icon="cog-outline"/>
    </b-button>
  </div>
</template>

<script>
import { BButton } from 'buefy/dist/components/button';
import { BIcon } from 'buefy/dist/components/icon';

export default {
  name: 'WidgetHeader',
  components: {
    BButton,
    BIcon,
  },
};
</script>

<style lang="scss">
.widget-header {
  &__button {
    display: block;
    margin-left: auto;
    padding-left: 1em !important;
    padding-right: 1em !important;
    transition: transform .2s linear;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.50);
    &:hover {
      transform: scale(1.15) rotate(180deg);
    }
  }
}
</style>
