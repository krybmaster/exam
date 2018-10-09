<template>
  <v-app id="question">

    <div>Вопрос 1</div>

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
      userInfo: {
        Firstname: '!',
        Lastname: '@',
        Middlename: '#',
        State: 'Student'
      }
    }),
    props: {
      source: String
    },
    created: function () {

    }
  }
</script>