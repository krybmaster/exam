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
        if ( !this.$data.currQuestion == 0 ) {
          this.evalAnswer();
        } else {
        }
        if ( this.$data.currQuestion === ( this.$data.allQuestions ) ) {
          this.endTheme();
          return;
        } else {
          console.log('resume')
        }
        console.log('Верных ответов: ' , this.$data.sumTrueAnswers , 'Неверных ответов: ', this.$data.sumFalseAnswers)
        console.log('текущий вопрос: ', this.$data.currQuestion, 'всего вопросов: ', this.$data.allQuestions )
        var id = this.$data.questions[this.$data.currQuestion].id
        this.$data.textQuestion = this.$data.questions[this.$data.currQuestion].text
        this.$data.currQuestion++;
        console.log('ID: ', id);
        store.commit('marker', {type: 1, id: id})
        store.dispatch('getAnswers');
      },

      evalAnswer () {
        if ( this.$data.oneAnswer ) {
          console.log('this.$data.userRadioAnswer.truthful', this.$data.userRadioAnswer.truthful)
          this.$data.userRadioAnswer.truthful ? this.$data.sumTrueAnswers++ : this.$data.sumFalseAnswers++
        } else {
          var setAnswers = true
          for (var i = 0; i < this.$data.answers.length; i++) {
            console.log (setAnswers);
            this.$data.answers[i].truthful ? setAnswers = this.$data.userCheckboxAnswer.indexOf(this.$data.answers[i]) : {} ;
            if ( !setAnswers ) {
              this.$data.sumFalseAnswers--
              break;
            } else {
              for (var i = 0; i < this.$data.userCheckboxAnswer.length; i++) {
                this.$data.userCheckboxAnswer[i].truthful ? setAnswers = this.$data.answers.indexOf(this.$data.userCheckboxAnswer[i]) : {} ;
                if ( !setAnswers ) {
                  this.$data.sumFalseAnswers--
                  break;
                } else {
                  this.$data.sumTrueAnswers++
                }
              }
            }
          }
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