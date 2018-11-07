<template>
  <v-app id="question">

    <!--<div>Вопрос {{ $route.params.id }}</div> -->
    <div>Тело вопроса</div>

    <p>{{ radios || 'null' }}</p>


    <!--<v-radio-group v-model="radios" :mandatory="false">-->
    <v-radio-group 
    v-model="answer.id" 
    v-for="answer in answers" :key="answer.id"
    label=" ">
      <v-radio >
      </v-radio>
    </v-radio-group>



    <v-btn @click="nextQuestion"> Далее </v-btn>
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
      nextQuestion: function() {
        console.log('текущий вопрос: ', this.$data.currQuestion )
        var id = this.$data.questions[this.$data.currQuestion++].id
        store.commit('marker', {type: 1, id: id})
        store.dispatch('getAnswers');
      },
    },

    created: function () {
      store.dispatch('getQuestions');
      store.watch(store.getters.getQuestions, questions => {
        this.$data.questions = questions;
        this.$data.allQuestions = questions.length;
        this.nextQuestion();
        console.log('число вопросов:', this.$data.allQuestions);
      });
      store.watch(store.getters.getAnswers, answers => {
          this.$data.answers = answers;
      });
    }
  }
</script>