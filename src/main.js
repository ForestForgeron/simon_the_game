import { createApp } from 'vue'
import App from './App.vue'
import Circle from './components/Circle.vue'
import Square from './components/Square.vue'
import Menu from './components/Menu.vue'

const app = createApp(App);
app.component('Circle', Circle);
app.component('Square', Square);
app.component('Menu', Menu);
app.mount('#app');
