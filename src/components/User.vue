<template>
  <v-app id="user">

    <v-content>

      <div>
          {{ userInfo.name }} , Вам предлагается пройти тест!
      </div>
      <div>
          Результат тестирования Вы получите на почту: {{ userInfo.email }}
      </div>

      <router-link :to="{ name: 'Question', params: { id: 1 }}">Начать</router-link>

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
      }
    }),
    created: function () {
      this.userInfo = store.state.lp
    }

  }
</script>