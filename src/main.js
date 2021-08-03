import { createApp } from 'vue'
import App from './App.vue'
import Circle from './components/Circle.vue'

const app = createApp(App);
app.component('Circle', Circle);
app.mount('#app');
