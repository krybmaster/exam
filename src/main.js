// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import Vuetify from 'vuetify';

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)

firebase.initializeApp({
    projectId: 'test-f7b12', 
    databaseURL: 'https://test-f7b12.firebaseio.com'
})

export const db = firebase.firestore()

    /*
    const settings = {
        projectId: 'test-f7b12', 
        databaseURL: 'https://test-f7b12.firebaseio.com',
        timestampsInSnapshots: true
    };

    
    firestore.settings(settings);
    export const db = firebase.firestore();*/

Vue.use(Vuex);
Vue.use(Vuetify);


export const store = new Vuex.Store({

    strict: true,
    state: {
        lp: {}
    },
    //Чтобы инициировать обработку мутации, необходимо вызвать store.commit, уточнив
    mutations: {
        email(state, lp) {
            state.lp = lp;
        }
    },

    actions: {
        logIn({ dispatch, commit }) {
            router.push({ path: 'user' })
            //return dispatch('authByPassword').then(() => {});
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',

    created: function() {
        console.log('Created');
    }
});