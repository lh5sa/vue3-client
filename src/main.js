import { createApp } from 'vue';
import App from '@/App.vue';

// vue-router
import router from '@/router';

// pinia: https://pinia.web3doc.top/introduction.html
import store from '@/store';

// https://github.com/necolas/normalize.css
import 'normalize.css';

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// global.scss
import '@/assets/global.scss';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus).mount('#app');
