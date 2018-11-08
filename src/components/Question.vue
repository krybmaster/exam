<template>
  <v-app id="question">

    <p>{{ userRadioAnswer }}</p>
    <v-radio-group v-model="userRadioAnswer">
      <v-radio
        v-for="answer in answers" :key="answer.id"
        :label="`${answer.text}`"
        :value="answer.id">
      </v-radio>
    </v-radio-group>

    <v-container fluid>
      <p>{{ userCheckboxAnswer }}</p>
      <v-checkbox 
        v-model="userCheckboxAnswer" 
          v-for="answer in answers" :key="answer.id"
          :label="`${answer.text}`"
          :value="answer.id">
      </v-checkbox>
    </v-container>

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
      timer: '',
      userRadioAnswer: '',
      userCheckboxAnswer: []
    }),

    methods: {
      nextQuestion: function() {
        this.$data.currQuestion === ( this.$data.allQuestions - 1 ) ? clearTimeout(this.timer) : console.log('resume')
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
        this.timer = setInterval(this.nextQuestion, 10000)
        console.log('число вопросов:', this.$data.allQuestions);
      });
      
      store.watch(store.getters.getAnswers, answers => {
        this.$data.allQuestions = questions.length;
        var sumTruthful = 0;
        for (i = 0; i < answers.length; i++) {
          answers[i].truthful ? sumTruthful++ : {}
        }
        switch(sumTruthful) {
          case 0 :
            break;
          default :
            this.$data.answers = answers;
        }
      });
    }
  }
</script>