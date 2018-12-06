<template>
  <v-app id="result">


    <v-container grid-list-xl text-xs-left>
      <v-content>

        <v-toolbar dark color="primary">
          <v-toolbar-title>Результат</v-toolbar-title>
        </v-toolbar>

        <v-card >
            <v-card-title h3 class="headline mb-7" >
                {{ userInfo.name }}, тест знаний завершен. 
            </v-card-title>

            <v-card-text>
              Из 
              <strong> 
                {{ result.true + result.false }} 
              </strong> вопросов Вы ответили верно на  
              <strong> 
                {{ result.true }}
              </strong> 
              из них. Ваша почта 
              <strong> 
                {{ userInfo.email }}
              </strong> 
            </v-card-text>

            <v-card-actions> 
              <v-btn> Получить результат на почту </v-btn>
            </v-card-actions>
        </v-card>

      </v-content>
    </v-container>

    <v-footer class="pa-3 ;white--text pt-0">
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