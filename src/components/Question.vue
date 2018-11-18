<template>
  <v-app id="question">

    <v-container grid-list-xl text-xs-left>

      <v-content>

        <v-card>
            <v-card-title primary-title>
                {{ textQuestion }}
              <v-radio-group v-if="oneAnswer" v-model="userRadioAnswer">
                <v-radio
                  v-for="answer in answers" :key="answer.id"
                  :label="`${answer.text}`"
                  :value="answer">
                </v-radio>
              </v-radio-group>

              <v-container fluid v-else>
                <br> 
                <v-checkbox 
                  v-model="userCheckboxAnswer" 
                    v-for="answer in answers" :key="answer.id"
                    :label="`${answer.text}`"
                    :value="answer.id">
                </v-checkbox>
              </v-container>

            </v-card-title>
            <v-card-actions>
            <v-btn flat color="blue" @click="nextQuestion()">Выбрать</v-btn>
            </v-card-actions>
        </v-card>
        
      </v-content>

      <v-spacer></v-spacer>


      <v-footer color="blue-grey" class="white--text" app>
        <span>Rybakov Konstantin</span>
        <v-spacer></v-spacer>
        <span> &copy; 2008-2018 Перфоманс Лаб </span>
      </v-footer> 

    </v-container>

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
      result: {
        sumTrueAnswers: 0,
        sumFalseAnswers: 0
      },
      sumTrueAnswers: 0,
      sumFalseAnswers: 0
    }),

    methods: {
      nextQuestion: function() {
        !this.$data.currQuestion == 0 ? this.evalAnswer() : {}
        this.$data.userCheckboxAnswer = []
        console.log('Верных ответов: ' , this.$data.result.sumTrueAnswers , 'Неверных ответов: ', this.$data.result.sumFalseAnswers)

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
          this.$data.userRadioAnswer.truthful ? this.$data.result.sumTrueAnswers++ : this.$data.result.sumFalseAnswers++
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
          _difference1.size + _difference2.size == 0 ? this.$data.result.sumTrueAnswers++ : this.$data.result.sumFalseAnswers++
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
            this.nextQuestion();
            break;
          case 1 : 
            this.$data.oneAnswer = true;
          default :
            this.$data.answers = answers;
        }
      });
    }
  }
</script>