<template>

  <v-app id="question">

    <v-container grid-list-xl text-xs-left>

    <v-layout row wrap>

            <v-flex xs3 order-md1 order-xs1 >
                <v-btn fab dark color="orange" @click="hiddenAddTheme = !hiddenAddTheme" class="mb-4">
                    <v-icon v-if="hiddenAddTheme">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addTheme(textTheme)" v-show="!hiddenAddTheme">
                    <div>
                        <v-text-field v-model="textTheme" placeholder="Тема"> </v-text-field>
                    </div>
                    <div>
                        <v-btn flat color="green" type="submit">Добавить тему</v-btn>
                    </div>
                </form>

                <article v-for="theme in themes" :key="theme.id" class="mb-4">
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

            <v-flex xs4 order-md2 order-xs1 v-show="selectedTheme">
                <v-btn fab dark color="orange" @click="hiddenAddQuestion = !hiddenAddQuestion" class="mb-4">
                    <v-icon v-if="hiddenAddQuestion">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addQuestion(textQuestion)" v-show="!hiddenAddQuestion">
                    <div>
                        <v-text-field v-model="textQuestion" placeholder="Вопрос"> </v-text-field>
                    </div>
                    <div>
                        <v-btn flat color="orange" type="submit">Добавить Вопрос</v-btn>
                    </div>
                </form>
                <article v-for="question in questions" :key="question.id" class="mb-4">
                    <v-card >
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

            <v-flex xs4 order-md3 order-xs1 v-show="selectedQuestion">
                <v-btn fab dark color="orange" @click="hiddenAddAnswer = !hiddenAddAnswer" class="mb-4">
                    <v-icon v-if="hiddenAddAnswer">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addAnswer(textAnswer, trueAnswer)" v-show="!hiddenAddAnswer"> 
                    <div>
                        <v-text-field v-model="textAnswer" placeholder="Ответ"> </v-text-field>
                        <v-checkbox :label="Верный" v-model="trueAnswer" ></v-checkbox> 
                        <span> (Верный) </span>
                    </div>
                    <div>
                        <v-btn flat color="orange" type="submit">Добавить Ответ</v-btn>
                    </div>
                </form>
                <article v-for="answer in answers" :key="answer.id" class="mb-4">
                    <v-card>
                        <v-card-title primary-title>
                            <v-checkbox
                                disabled
                                :label="`${answer.text}`"
                                v-model="answer.truthful">
                            </v-checkbox>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat color="orange" @click="selectAnswer(answer.id)">Выбрать</v-btn>
                            <v-btn flat color="red" @click="deleteAnswer(answer.id)">Удалить</v-btn>
                        </v-card-actions>
                    </v-card>
                </article>
            </v-flex>

        </v-layout>  

    </v-container>

    <v-footer color="blue" class="pa-3">
        <span>Rybakov Konstantin </span>
        <v-spacer></v-spacer>
        <span> &copy; krybmaster </span>
    </v-footer> 

  </v-app>

</template>

<script>

import { store } from '../main'
export default {
    data: () => ({
      hiddenAddTheme: true,
      hiddenAddAnswer: true,
      hiddenAddQuestion: true,
      selectedTheme: false,
      selectedQuestion: false,
      textTheme: '',
      textQuestion: '',
      textAnswer: '',
      trueAnswer: false,
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
        addAnswer (text, truthful) {
            store.dispatch('addAnswer', {text, truthful});
        },

        selectTheme (id) {
            store.commit('marker', {type: 0, id: id});
            store.dispatch('getQuestions');
            this.$data.selectedTheme = true
        },
        selectQuestion (id) {
            store.commit('marker', {type: 1, id: id})
            store.dispatch('getAnswers');
            this.$data.selectedQuestion = true
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
    }
}

</script>