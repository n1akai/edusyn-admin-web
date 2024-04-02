import './assets/plugins/bootstrap/css/bootstrap.min.css'
import './assets/plugins/feather/feather.css'
import './assets/plugins/icons/flags/flags.css'
import './assets/plugins/fontawesome/css/fontawesome.min.css'
import './assets/plugins/fontawesome/css/all.min.css'
import './assets/css/style.css'

import './assets/js/jquery-3.6.0.min'
import './assets/plugins/bootstrap/js/bootstrap.bundle.min'
import './assets/js/feather.min'
import './assets/plugins/slimscroll/jquery.slimscroll.min'
import './assets/js/script'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

// Global components
import PageHeader from './components/Common/PageHeader.vue';
import PageWrapper from './components/Common/PageWrapper.vue';


const app = createApp(App)

app.component('PageHeader', PageHeader);
app.component('PageWrapper', PageWrapper);

app.use(Vue3Toasity)
app.use(router)
app.use(createVuestic())

app.mount('#app')
