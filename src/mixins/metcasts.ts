import api from '@/api/weatherApi';

export default {
  computed: {
    metcasts: {
      get() {
        return this.$store.getters['metcasts/metcastsList'];
      },
      set(metcasts) {
        this.$store.dispatch('metcasts/setMetcastsAction', metcasts);
      },
    },
  },
  methods: {
    async getMetcasts() {
      if (this.locations.length === 0) {
        this.metcasts = [];
        return;
      }
      let result = [];
      this.locations.forEach((location) => {
        if (location.city && location.country) {
          result.push(api.getWeatherInfo(location));
        }
      });

      result = await Promise.all(result);
      result = this.prepareMetcasts(result);
      this.metcasts = result;
    },
    prepareMetcasts(metcasts) {
      return metcasts.map((metcast) => {
        const newMetcast = {
          main: metcast.main,
          name: metcast.name,
          country: metcast.sys.country,
          weather: metcast.weather[0],
          visibility: metcast.visibility,
          wind: metcast.wind,
          icon: `http://openweathermap.org/img/wn/${metcast.weather[0].icon}@4x.png`,
        };
        delete newMetcast.weather.icon;
        return newMetcast;
      });
    },
  },
};
