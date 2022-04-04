import axios from 'axios';
import config from '@/config/config.json';

export default {
  async getVisitorInfo() {
    const response = (await axios(`https://ipinfo.io/json?token=${config.ipinfoToken}`)).data;
    return response;
  },
  /**
   * Get weather info.
   * @param {object} locationInfo - The location info.
   * @param {string} locationInfo.country - The code of country.
   * @param {string} locationInfo.city - The name of city.
   */
  async getWeatherInfo({ country, city }) {
    let location;
    if (city) location = city;
    if (country) location += `, ${country}`;
    const response = (await axios(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.weatherToken}&units=metric`)).data;
    return response;
  },
};
