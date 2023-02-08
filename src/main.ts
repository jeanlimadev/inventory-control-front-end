import { createApp } from "vue";
import VueCookies from "vue-cookies";
import PhosphorVue from "phosphor-vue";

import App from "./App.vue";
import router from "./router";
import "./assets/sass/main.scss";

const app = createApp(App);

app.use(VueCookies);

app.use(PhosphorVue);

app.use(router);

app.mount("#app");
