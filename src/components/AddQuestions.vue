<template>

  <v-container grid-list-xl text-xs-left>
      <v-btn @click="getThemes()" >Получить темы</v-btn>
   <v-layout row wrap>

        <v-flex xs3 order-md1 order-xs1>
            <form @submit="addTheme(textTheme)">
                <div>
                    <input v-model="textTheme" placeholder="Тема">
                </div>
                <div>
                    <v-btn flat color="green" type="submit">Добавить тему</v-btn>
                </div>
            </form>

            <article v-for="theme in themes" :key="theme.id">
                <v-card>
                    <v-card-title primary-title>
                        {{ theme.text }}
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="selectTheme(theme.id)">Выбрать</v-btn>
                    <v-btn flat color="red" @click="deleteTheme(theme.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>

        <v-flex xs4 order-md2 order-xs1>
            <form @submit="addQuestion(textQuestion)">
                <div>
                    <input v-model="textQuestion" placeholder="Вопрос">
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
                    <v-btn flat color="red" @click="deleteQuestion(question.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>

        <v-flex xs4 order-md3 order-xs1>
            <form @submit="addAnswer(textAnswer)"> 
                <div>
                    <input v-model="textAnswer" placeholder="Ответ">
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
      textTheme: '',
      textQuestion: '',
      textAnswer: '',
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
            store.dispatch('addTheme', text);
        },
        addQuestion (text) {
            store.dispatch('addQuestion', text);
        },
        addAnswer (text, truthful, link) {
            db.collection('quiz').add({ text, type: 2, truthful, link })
        },

        selectTheme (id) {
            store.commit('marker', {type: 0, id: id});
            store.dispatch('getQuestions');
        },
        selectQuestion (id) {
            store.commit('marker', {type: 1, id: id})
            store.dispatch('getAnswers');
        },
        selectAnswer (id) {
            store.commit('marker', {type: 2, id: id})
        },

        deleteTheme (id) {
            store.commit('marker', {type: 0, id: id});
            store.dispatch('deleteTheme');
        },
        deleteQuestion (id) {
            store.commit('marker', {type: 1, id: id});
            store.dispatch('deleteQuestion');
        },
        deleteAnswer (id) {
            store.commit('marker', {type: 2, id: id});
            store.dispatch('deleteAnswer');
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