<template>
  <v-app id="question">

    <p> {{ textQuestion }} </p>

    <p>{{ userRadioAnswer }}</p> 
    <v-radio-group v-if="oneAnswer" v-model="userRadioAnswer">
      <v-radio
        v-for="answer in answers" :key="answer.id"
        :label="`${answer.text}`"
        :value="answer">
      </v-radio>
    </v-radio-group>

    <v-container fluid v-else>
      <p>{{ userCheckboxAnswer }}</p> 
      <v-checkbox 
        v-model="userCheckboxAnswer" 
          v-for="answer in answers" :key="answer.id"
          :label="`${answer.text}`"
          :value="answer.id">
      </v-checkbox>
    </v-container>

    <button @click="nextQuestion()"> Далее </button>
<!--
    <v-footer color="blue-grey" class="white--text" app>
      <span>Rybakov Konstantin</span>
      <v-spacer></v-spacer>
      <span> &copy; 2008-2018 Перфоманс Лаб </span>
    </v-footer> -->
  </v-app>
</template>

<script>

  import { store } from '../main.js'

  export default {
    data: () => ({
      oneAnswer: null,
      idQuestion: '',
      answers: [],
      questions: [],
      radios: '',
      allQuestions: 0,
      currQuestion: 0,
      textQuestion: '',
      allAnswers: 0,
      timer: '',
      userRadioAnswer: '',
      userCheckboxAnswer: [],
      sumTrueAnswers: 0,
      sumFalseAnswers: 0
    }),

    methods: {
      nextQuestion: function() {
        !this.$data.currQuestion == 0 ? this.evalAnswer() : {}
        this.$data.userCheckboxAnswer = []
        console.log('Верных ответов: ' , this.$data.sumTrueAnswers , 'Неверных ответов: ', this.$data.sumFalseAnswers)

        if ( this.$data.currQuestion === ( this.$data.allQuestions ) ) {
          this.endTheme();
          return;
        } else {
          console.log('текущий вопрос: ', this.$data.currQuestion, 'всего вопросов: ', this.$data.allQuestions )
        }
        
        
        var id = this.$data.questions[this.$data.currQuestion].id
        this.$data.textQuestion = this.$data.questions[this.$data.currQuestion].text
        this.$data.currQuestion++;
        console.log('ID: ', id);
        store.commit('marker', {type: 1, id: id})
        store.dispatch('getAnswers');
      },

      evalAnswer () {
        if ( this.$data.oneAnswer ) {
          this.$data.userRadioAnswer.truthful ? this.$data.sumTrueAnswers++ : this.$data.sumFalseAnswers++
        } else {
          let setUserAnswers = new Set();
          let setAllAnswers = new Set();
          this.$data.userCheckboxAnswer.forEach(element => {
            setUserAnswers.add(element)
          });
          this.$data.answers.forEach(element => {
            element.truthful ? setAllAnswers.add(element.id) : {}
          });
          var _difference1 = new Set(setUserAnswers);
          for (var elem of setAllAnswers) {
          _difference1.delete(elem);
          }
          var _difference2 = new Set(setAllAnswers);
          for (var elem of setUserAnswers) {
          _difference2.delete(elem);
          }
          
          console.log('_difference1.length', _difference1)
          console.log('_difference2.length', _difference2)
          console.log('_difference1.length', _difference1.size)
          console.log('_difference2.length', _difference2.size)
          _difference1.size + _difference2.size == 0 ? this.$data.sumTrueAnswers++ : this.$data.sumFalseAnswers++
          
        };
      },

      endTheme () {
        store.dispatch('endTheme');
      }
    },

    created: function () {
      store.dispatch('getQuestions');
      store.watch(store.getters.getQuestions, questions => {
        this.$data.questions = questions;
        this.$data.allQuestions = questions.length;
        this.nextQuestion();
        //this.timer = setInterval(this.nextQuestion, 10000)
        console.log('число вопросов:', this.$data.allQuestions);
      });
      
      store.watch(store.getters.getAnswers, answers => {
        this.$data.allAnswers = answers.length;
        var sumTruthful = 0;
        for (var i = 0; i < answers.length; i++) {
          answers[i].truthful ? sumTruthful++ : {}
        }
        console.log("Количество верных ответов в вопросе", sumTruthful);
        this.$data.oneAnswer = false;
        switch(sumTruthful) {
          case 0 :
            console.log('Ни едного верного ответа!')
            this.nextQuestion();
            break;
          case 1 : 
            this.$data.oneAnswer = true;
            console.log('Вопрос с одним ответом')
          default :
            this.$data.answers = answers;
        }
        console.log('Ответы получены')
      });
    }
  }
</script>