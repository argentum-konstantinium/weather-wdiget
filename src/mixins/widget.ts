export default {
  computed: {
    settingsState: {
      get() {
        return this.$store.getters['widget/settingsState'];
      },
      set(settingsState) {
        this.$store.dispatch('widget/setSettingsStateAction', settingsState);
      },
    },
  },
};
