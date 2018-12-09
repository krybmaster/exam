<template>

  <v-app id="question">

    <v-container 
        grid-list-xl 
        text-xs-left   
    >

    <v-layout row wrap>

            <v-flex xs3 order-md1 order-xs1 >
                <v-btn fab dark color="orange" @click="hiddenAddTheme = !hiddenAddTheme" class="mb-4">
                    <v-icon v-if="hiddenAddTheme">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addTheme()" v-show="!hiddenAddTheme">
                    <div>
                        <v-text-field v-model="textTheme" placeholder="Тема"> </v-text-field>
                    </div>
                    <div>
                        <v-btn flat color="green" type="submit">Добавить тему</v-btn>
                    </div>
                </form>
                <v-container
                    style="max-height: 500px"
                    class="scroll-y"
                >
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
                </v-container>
            </v-flex>

            <v-flex xs4 order-md2 order-xs1 v-show="selectedTheme">
                <v-btn fab dark color="orange" @click="hiddenAddQuestion = !hiddenAddQuestion" class="mb-4">
                    <v-icon v-if="hiddenAddQuestion">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addQuestion()" v-show="!hiddenAddQuestion">
                    <div>
                        <v-text-field v-model="textQuestion" placeholder="Вопрос"> </v-text-field>
                    </div>
                    <div>
                        <v-btn flat color="orange" type="submit">Добавить Вопрос</v-btn>
                    </div>
                </form>

                <v-container
                    style="max-height: 500px"
                    class="scroll-y"
                >
                    <article v-for="question in questions" :key="question.id" class="mb-4">
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
                </v-container>

            </v-flex>

            <v-flex xs4 order-md3 order-xs1 v-show="selectedQuestion">
                <v-btn fab dark color="orange" @click="hiddenAddAnswer = !hiddenAddAnswer" class="mb-4">
                    <v-icon v-if="hiddenAddAnswer">add</v-icon>
                    <v-icon v-else>remove</v-icon>
                </v-btn>
                <form @submit="addAnswer()" v-show="!hiddenAddAnswer"> 
                    <div>
                        <v-text-field v-model="textAnswer" placeholder="Ответ"> </v-text-field>
                         <v-switch
                            :label="`Верный: ${trueAnswer ? 'Да' : 'Нет'}`"
                            v-model="trueAnswer"
                        ></v-switch>

                    </div>
                    <div>
                        <v-btn flat color="orange" type="submit">Добавить Ответ</v-btn>
                    </div>
                </form>
                <v-container
                    style="max-height: 500px"
                    class="scroll-y"
                >
                    <article v-for="answer in answers" :key="answer.id" class="mb-4">
                        <v-card >
                            <v-card-title>
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
                </v-container>
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
      left: null,
      textCheckBox: 'Верный'
    }),

    methods: {
        addTheme () {
            store.dispatch('addTheme', this.textTheme);
            this.textTheme = ''
        },
        addQuestion () {
            store.dispatch('addQuestion', this.textQuestion);
            this.textQuestion = ''
        },
        addAnswer () {
            store.dispatch('addAnswer', {text: this.textAnswer, truthful: this.trueAnswer});
            this.textAnswer = ''
            this.trueAnswer = ''
        },

        selectTheme (id) {
            store.commit('marker', {type: 0, id: id});
            store.dispatch('getQuestions');
            this.$data.selectedTheme = true
            this.$data.answers = []
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