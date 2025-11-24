import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import keycloak from './auth/keycloak';


const app = createApp(App)
const initKeycloak = async () => {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });
    if (authenticated) {
      console.log('authenticated');
      app.config.globalProperties.$keycloak = keycloak
      app.use(router)
      app.use(VueApexCharts)
      app.mount('#app')
    } else {
      console.log('authentication failed');
    }
  } catch (error) {
    console.error('Failed to initialize authentication', error);
  }
};

initKeycloak();