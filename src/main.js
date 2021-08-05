import { createApp } from 'vue'
import App from './App.vue'
import Circle from './components/Circle.vue'
import Test from './components/Test.vue'


const app = createApp(App);
app.component('Circle', Circle);
app.component('Test', Test);
app.mount('#app');
