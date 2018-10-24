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
db.settings({timestampsInSnapshots: true})
Vue.use(Vuex);
Vue.use(Vuetify);


export const store = new Vuex.Store({

    strict: true,
    state: {
        lp: {},
        marker: {
            theme: "",
            question: ""
        },
        themes: {
            
        }
        
    },

    mutations: {
        email(state, lp) {
            state.lp = lp;
        },
        marker(state, info) {
           switch(info.type) {
            case 0:  
                state.marker.theme = info.id
            break;
            case 1:  
                state.marker.question = info.id
            break;

            default:
            break;
            }
        },
        data(state, data){
            state.themes = data
        }
    },


    actions: {
        logIn({ dispatch, commit }) {
            router.push({ path: 'user' })
        },
        getData( {dispatch, commit} ) {
            db.collection('quiz').where("type", "==", 0).get().then(function(querySnapshot){
                var docs = [];
                var id=0;
                querySnapshot.forEach(function(doc) {
                    docs.push( {
                        id: doc.id,
                        text: doc.data().text, 
                        type: doc.data().type
                    });
                });
                commit('data', docs)
            })
            
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