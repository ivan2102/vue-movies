import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/main.css'
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';

let app;

auth.onAuthStateChanged(() => {

    if(!app) {

     app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    
    app.mount('#app');

    }

});


