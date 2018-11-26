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
            question: "",
            answer: ""
        },
        themes: {},
        questions: {},
        answers: {},
        result: {
            true: 0,
            false: 0
          }
        
    },

    getters: {
        getThemes: state => () => state.themes,
        getQuestions: state => () => state.questions,
        getAnswers: state => () => state.answers,
        getResult: state => () => state.result
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
            case 2:  
                state.marker.answer = info.id
            break;

            default:
            break;
            }
        },
        themes(state, data){
            state.themes = data
        },
        questions(state, data){
            state.questions = data
        },
        answers(state, data){
            state.answers = data
        },
        result(state, data) {
            state.result = data
            console.log('state.result', state.result)
        }
    },


    actions: {
        logIn() {
            router.push({ path: 'user' })
        },
        getThemes( {commit} ) {
            db.collection('quiz').get().then(function(querySnapshot){
                var docs = [];
                querySnapshot.forEach(function(doc) {
                    docs.push( {
                        id: doc.id,
                        text: doc.data().text
                    });
                });
                commit('themes', docs)
            })
        },
        getQuestions( { commit, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').get().then(function(querySnapshot){
                var docs = [];
                querySnapshot.forEach(function(doc) {
                    docs.push( {
                        id: doc.id,
                        text: doc.data().text,
                        createdAt: doc.data().createdAt
                    });
                });
                commit('questions', docs)
            })
        },
        getAnswers( { commit, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question)
            .collection('answers').get().then(function(querySnapshot){
                var docs = [];
                querySnapshot.forEach(function(doc) {
                    docs.push( {
                        id: doc.id,
                        text: doc.data().text,
                        truthful: doc.data().truthful
                    });
                });
                commit('answers', docs)
            })
        },

        addTheme( { dispatch }, text ) {
            db.collection('quiz').add({ text, type: 0 })
                .then(function(docRef) {
                    dispatch('getThemes');
                });
        },
        addQuestion( { dispatch, state }, text ) {
            const createdAt = new Date()
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').add({ text, createdAt })
            .then(function(docRef) {
                dispatch('getQuestions');
            });
        },
        addAnswer( { dispatch, state }, data ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question)
            .collection('answers').add( { text: data.text, truthful: data.truthful })
            .then(function(docRef) {
                dispatch('getAnswers');
            });
        },

        deleteTheme( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme).delete()
                .then(function() {
                    dispatch('getThemes');
                });
        },
        deleteQuestion( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question).delete()
                .then(function() {
                    dispatch('getQuestions');
                });
        },
        deleteAnswer( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question)
            .collection('answers').doc(state.marker.answer).delete()
                .then(function() {
                    dispatch('getAnswers');
                });
        },

        startTheme() {
            console.log('startTheme');
            router.push({ name: 'Question' })
        },
        endTheme() {
            router.push({ name: 'Result' })
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