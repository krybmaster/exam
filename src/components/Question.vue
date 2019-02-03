<template>
  <v-app id="question">
    <v-container grid-list-xl text-xs-left>
      <v-content>

        <v-toolbar dark color="primary">
          <v-toolbar-title>Вопрос {{currQuestion}} из {{allQuestions}}</v-toolbar-title>
        </v-toolbar>

        <v-card>
            <v-card-title h3 class="headline mb-7" >
              <div>
                {{ textQuestion }} 
              </div>
            </v-card-title>

            <v-card-text>
              <v-radio-group v-if="oneAnswer" v-model="userRadioAnswer">
                <v-radio
                  height=100
                  v-for="answer in answers" :key="answer.id"
                  :label="`${answer.text}`"
                  :value="answer">
                </v-radio>
                
              </v-radio-group>

              <div v-else>
                <v-checkbox 
                  height=5
                  v-model="userCheckboxAnswer" 
                  v-for="answer in answers" :key="answer.id"
                  :label="`${answer.text}`"
                  :value="answer">
                </v-checkbox>
              </div>
            </v-card-text>

            <v-card-text style="height: 100px; position: relative"></v-card-text>

            <v-card-actions>
              <v-btn
                @click="nextQuestion()"
                color="primary" 
                absolute
                bottom
                left
                fab
              >
                <v-icon dark>done</v-icon>
              </v-btn>
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
      /**
       * Переход к следующему вопросу
       */
      nextQuestion: function() {
        !this.$data.currQuestion == 0 ? this.evalAnswer() : {}
        this.$data.userCheckboxAnswer = []
        this.$data.userRadioAnswer = ''

        if ( this.$data.currQuestion === ( this.$data.allQuestions ) ) {
          this.$data.currQuestion = 0
          this.endTheme();
          return;
        } else {
        }
      
        var id = this.$data.questions[this.$data.currQuestion].id
        this.$data.textQuestion = this.$data.questions[this.$data.currQuestion].text
        this.$data.currQuestion++;
        store.commit('marker', {type: 1, id: id})
        store.dispatch('getAnswers');
      },
      /**
       * Проверка ответа 
       */
      evalAnswer () {
        if ( this.$data.oneAnswer ) {
          this.$data.userRadioAnswer.truthful ? this.$data.result.true++ : this.$data.result.false++
        } else {
          let setUserAnswers = new Set();
          let setAllAnswers = new Set();
          this.$data.userCheckboxAnswer.forEach(element => {
            setUserAnswers.add(element.id)
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
      /**
       * Завершение викторины с записью резуьтата в хранилище и переходом на страницу результата
       */
      endTheme () {
        store.commit('result', {true: this.$data.result.true, false: this.$data.result.false});
        store.dispatch('endTheme');
      }
    },
    /**
     * Инициализация викторины
     */
    created: function () {
      store.dispatch('getQuestions');
      //Наблюдение за сменяющимися вопросами
      store.watch(store.getters.getQuestions, questions => {
        this.$data.questions = questions;
        this.$data.allQuestions = questions.length;
        this.nextQuestion();
      });
      //Наблюдение за сменяющимися ответами
      store.watch(store.getters.getAnswers, answers => {
        this.$data.allAnswers = answers.length;
        var sumTruthful = 0;
        for (var i = 0; i < answers.length; i++) {
          answers[i].truthful ? sumTruthful++ : {}
        }

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