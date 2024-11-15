import "./assets/plugins/bootstrap/css/bootstrap.min.css";
import "./assets/plugins/feather/feather.css";
import "./assets/plugins/icons/flags/flags.css";
import "./assets/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/css/style.css";

import "./assets/js/jquery-3.6.0.min";
import "./assets/plugins/bootstrap/js/bootstrap.bundle.min";
import "./assets/js/feather.min";
import "./assets/plugins/slimscroll/jquery.slimscroll.min";
import "./assets/js/script";

import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import "primevue/resources/themes/aura-light-green/theme.css";

// Global components
import PageHeader from "./components/Common/PageHeader.vue";
import PageWrapper from "./components/Common/PageWrapper.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("PageHeader", PageHeader);
app.component("PageWrapper", PageWrapper);

app.use(Vue3Toasity);
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);

app.mount("#app");
