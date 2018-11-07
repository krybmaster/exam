<template>
  <v-app id="question">

    <!--<div>Вопрос {{ $route.params.id }}</div> -->
    <div>Тело вопроса</div>

    <p>{{ radios || 'null' }}</p>


    <!--<v-radio-group v-model="radios" :mandatory="false">-->
    <v-radio-group v-for="answer in answers" :key="answer.id">
      <v-radio label="Radio 1" value="radio-1">{{answer.text}}</v-radio>
    </v-radio-group>



    <v-btn> Далее </v-btn>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Rybakov Konstantin</span>
      <v-spacer></v-spacer>
      <span>&copy; 2008-2018 Перфоманс Лаб </span>
    </v-footer>
  </v-app>
</template>

<script>

  import { store } from '../main.js'

  export default {
    data: () => ({
      idQuestion: '',
      answers: [],
      questions: [],
      radios: '',
      allQuestions: 0,
      currQuestion: 0,
    }),

    methods: {
      nextQuestion (num) {
        id = this.$data.questions[num++].id
        store.commit('marker', {type: 1, id: id})
        store.dispatch('getAnswers');
      },
    },

    created: function () {
      store.dispatch('getQuestions');
      store.watch(store.getters.getQuestions, questions => {
        this.$data.questions = questions;
        console.log(': Q', this.$data.questions);
      });
      store.watch(store.getters.getAnswers, answers => {
          this.$data.answers = answers;
      });
      
    }
  }
</script>