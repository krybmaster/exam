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
        lp: {
            email: '',
            name: ''
        },
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
        /**
         * Мутация информации со страницы входа
         * @param {Хранилище} state 
         * @param {Данные пользователя с формы} lp 
         */
        userData(state, lp) {
            state.lp = lp;
        },
        /**
         * Мутация установки указателей на номер темы или вопроса, в зависимости от info.type
         * @param {Хранилище} state 
         * @param {Принимает тип и идентификатор} info 
         * info.type: 0 - Тема, 1 - Вопрос
         */
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
        /** Мутация, записывающая темы в хранилище */
        themes(state, data){
            state.themes = data
        },

        /** Мутация, записывающая вопросы в хранилище */
        questions(state, data){
            state.questions = data
        },

        /** Мутация, записывающая ответы в хранилище */
        answers(state, data){
            state.answers = data
        },

        /** Мутация, записывающая результат экзамена в хранилище */
        result(state, data) {
            state.result = data
        }
    },


    actions: {
        /**
         * Переход на страницу выбора тем
         */
        logIn() {
            router.push({ path: 'user' })
        },
        /**
         * Запрос получения тем из firebase 
         */
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
        /**
         * Запрос получения вопросов из firebase 
         */
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
        /**
         * Запрос получения ответов из firebase 
         */
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
        /**
         * Запрос добавления тем в firebase 
         */
        addTheme( { dispatch }, text ) {
            db.collection('quiz').add({ text, type: 0 })
                .then(function(docRef) {
                    dispatch('getThemes');
                });
        },
        /**
         * Запрос добавления вопросов в firebase 
         */
        addQuestion( { dispatch, state }, text ) {
            const createdAt = new Date()
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').add({ text, createdAt })
            .then(function(docRef) {
                dispatch('getQuestions');
            });
        },
        /**
         * Запрос добавления ответов в firebase 
         */
        addAnswer( { dispatch, state }, data ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question)
            .collection('answers').add( { text: data.text, truthful: data.truthful })
            .then(function(docRef) {
                dispatch('getAnswers');
            });
        },
        /**
         * Запрос удаления темы из firebase 
         */
        deleteTheme( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme).delete()
                .then(function() {
                    dispatch('getThemes');
                });
        },
        /**
         * Запрос удаления вопроса из firebase 
         */
        deleteQuestion( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question).delete()
                .then(function() {
                    dispatch('getQuestions');
                });
        },
        /**
         * Запрос удаления ответа из firebase 
         */
        deleteAnswer( { dispatch, state } ) {
            db.collection('quiz').doc(state.marker.theme)
            .collection('questions').doc(state.marker.question)
            .collection('answers').doc(state.marker.answer).delete()
                .then(function() {
                    dispatch('getAnswers');
                });
        },
        /**
         * Переход к странице викторины 
         */
        startTheme() {
            router.push({ name: 'Question' })
        },
        /**
         * Переход к странице результата
         */
        endTheme() {
            router.push({ name: 'Result' })
        },
        /**
         * Обнуление результаатов екзамена
         */
        refreshExam(state) {
            state = null
            router.push({ name: 'Authorize' })
        }

    }
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',

});