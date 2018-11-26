<template>
  <v-app id="result">

    <v-content>

      <div>
          {{ userInfo.name }} , Вы ответили на все вопросы.
      </div>
      <div>
          Из {{ result.true + result.false }} вопросов Вы ответили верно на  {{ result.true }} вопросов.
      </div>
      <div>
          Результат тестирования Вы получите на почту: {{ userInfo.email }}
      </div>

    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
      <span> Rybakov Konstantin </span>
      <v-spacer></v-spacer>
      <span>&copy; 2008-2018 Перфоманс Лаб </span>
    </v-footer>
  </v-app>
</template>

<script>

  import { store } from '../main.js'

  export default {

    data: () => ({
      userInfo: {
        email: '',
        name: ''
      },
      result: {
        true: 0,
        sumFalseAnswers: 0
      }
    }),

    methods: {

    },
    created: function () {
      this.userInfo = store.state.lp
      this.result = store.state.result
    }

  }
</script>