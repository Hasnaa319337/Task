import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";


import store from './store/index'

import Dialog from "primevue/dialog";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";
const app = createApp(App);
app.use(store);
app.use(PrimeVue);
app.component('Dialog',Dialog)
app.mount("#app");
