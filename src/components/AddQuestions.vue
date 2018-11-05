<template>

  <v-container grid-list-xl text-xs-left>
      <v-btn @click="getThemes()" >Получить темы</v-btn>
   <v-layout row wrap>

        <v-flex xs3 order-md1 order-xs1>
            

            <form @submit="addTheme(text)">
                <div>
                    <input v-model="text" placeholder="Тема">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить тему</v-btn>
                </div>
            </form>

            <article v-for="theme in themes" :key="theme.id">
                <v-card>
                    <v-card-title primary-title>
                        {{ theme.text }}
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="selectTheme(theme.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteDoc(theme.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>

        <v-flex xs4 order-md2 order-xs1>
            <form @submit="addQuestion(text)">
                <div>
                    <input v-model="text" placeholder="Вопрос">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить Вопрос</v-btn>
                </div>
            </form>
            <article v-for="question in questions" :key="question.id">
                <v-card>
                    <v-card-title primary-title>
                    <div>
                    {{ question.text }}
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="selectQuestion(question.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteDoc(question.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>

        <v-flex xs4 order-md3 order-xs1>
            <form @submit="addAnswer(text)"> 
                <div>
                    <input v-model="text" placeholder="Ответ">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить Ответ</v-btn>
                </div>
            </form>
            <article v-for="answer in answers" :key="answer.id">
                <v-chip close color="orange" label outline >
                    {{ answer.text }}
                    <!--<v-card-actions>
                    <v-btn flat color="orange" @click="selectAnswer(answer.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteAnswer(answer.id)">Удалить</v-btn>
                    </v-card-actions> -->
                    <v-checkbox> </v-checkbox> 
                </v-chip>
            </article>
        </v-flex>

    </v-layout>  

  </v-container>

</template>

<script>

import { db, store } from '../main'
export default {
    data: () => ({
      text: '',
      themes: [],
      questions: [],
      answers: [],
      drawer: true,
      drawerRight: true,
      right: null,
      left: null
    }),

    methods: {
        addTheme (text) {
            db.collection('quiz').add({ text, type: 0 }) 
        },
        selectTheme (id) {
            store.commit('marker', {type: 0, id: id});
            store.dispatch('getQuestions', id);
        },
        addQuestion (text) {
            const createdAt = new Date()
            link = store.state.marker.theme
            db.collection('quiz').doc(link).collection('questions').add({ text, createdAt }) 
        },
        selectQuestion (id) {
            store.commit('marker', {type: 1, id: id})
            store.dispatch('getAnswers', id);
        },

        addAnswer (text, truthful, link) {
            db.collection('quiz').add({ text, type: 2, truthful, link })
        },

        selectAnswer (id) {
            store.commit('marker', {type: 2, id: id})
        },

        deleteDoc (id) {
            db.collection('quiz').doc(id).delete()
        },

        getThemes () {
            //store.dispatch('getThemes').then(() => {
                //this.$data.themes = store.state.themes
            //});
        }
    },
    created: function () {
        store.dispatch('getThemes');
        store.watch(store.getters.getThemes, themes => {
            this.$data.themes = themes;
        });
        store.watch(store.getters.getQuestions, questions => {
            this.$data.questions = questions;
        });
        store.watch(store.getters.getAnswers, answers => {
            this.$data.answers = answers;
        });

        //store.dispatch('getThemes').then(() => {
        //    this.$data.themes = store.state.themes
        //});
    }
}

</script>