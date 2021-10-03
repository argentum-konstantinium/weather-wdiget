export default {
  computed: {
    locations: {
      get() {
        return this.$store.getters['locations/locations'];
      },
      set(locations) {
        this.$store.dispatch('locations/setLocationsAction', locations);
        this.updateLocalstorage();
      },
    },
  },
  methods: {
    updateLocalstorage() {
      const newLocations = this.locations.filter((location) => location.city && location.country);
      localStorage.setItem('locations', JSON.stringify(newLocations));
    },
    checkExistingLocation(location) {
      const locationCopy = this.locations.find((existLocation) => (
        (location.city === existLocation.city)
          && (location.country === existLocation.country)
      ));
      if (locationCopy) {
        alert('Location with your settings already exist');
        return true;
      }
      return false;
    },
    addLocation(location = { city: '', country: '' }) {
      if (location.city && location.country) {
        if (this.checkExistingLocation(location)) {
          return;
        }
      }
      this.locations.push(location);
    },
    removeLocation(location) {
      this.locations.splice(
        this.locations.indexOf(location), 1,
      );
      this.updateLocalstorage();
    },
  },
};
