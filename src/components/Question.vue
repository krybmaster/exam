<template>
  <v-app id="question">
    <v-container grid-list-xl text-xs-left>
      <v-content>

        <v-toolbar dark color="primary">
          <v-toolbar-title>Вопрос {{currQuestion}} из {{allQuestions}}</v-toolbar-title>
        </v-toolbar>

        <v-card height="500px">
            <v-card-title h3 class="headline mb-7" >
              <div>
                {{ textQuestion }} 
              </div>
            </v-card-title>

            <div> {{userRadioAnswer}} {{userCheckboxAnswer}} </div>

            <v-card-text>
              <v-radio-group v-if="oneAnswer" v-model="userRadioAnswer">
                <v-radio
                  v-for="answer in answers" :key="answer.id"
                  :label="`${answer.text}`"
                  :value="answer.id">
                </v-radio>
              </v-radio-group>

              <div  v-else>
                <v-checkbox 
                  v-model="userCheckboxAnswer" 
                    v-for="answer in answers" :key="answer.id"
                    :label="`${answer.text}`"
                    :value="answer.id">
                </v-checkbox>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn justify-end color="primary" @click="nextQuestion()">Далее</v-btn>
            </v-card-actions> 
        </v-card>
      </v-content>
    </v-container>

    <v-footer color="blue" class="pa-3">
      <span>Rybakov Konstantin </span>
      <v-spacer></v-spacer>
      <span> &copy; krybmaster </span>
    </v-footer> 

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
        true: 0,
        false: 0
      }
    }),

    methods: {
      nextQuestion: function() {
        !this.$data.currQuestion == 0 ? this.evalAnswer() : {}
        this.$data.userCheckboxAnswer = []
        console.log('Верных ответов: ' , this.$data.result.true , 'Неверных ответов: ', this.$data.result.false)

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
          this.$data.userRadioAnswer.truthful ? this.$data.result.true++ : this.$data.result.false++
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
          _difference1.size + _difference2.size == 0 ? this.$data.result.true++ : this.$data.result.false++
        };
      },

      endTheme () {
        store.commit('result', {true: this.$data.result.true, false: this.$data.result.false});
        store.dispatch('endTheme');
      }
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