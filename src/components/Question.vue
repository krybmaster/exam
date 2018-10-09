<template>
  <v-app id="question">

    <div>Вопрос {{ $route.params.id }}</div>
    <div>Тело вопроса</div>

    <p>{{ radios || 'null' }}</p>
    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="Radio 1" value="radio-1"></v-radio>
      <v-radio label="Radio 2" value="radio-2"></v-radio>
      <v-radio label="Radio 3" value="radio-3"></v-radio>
      <v-radio label="Radio 4" value="radio-4"></v-radio>
    </v-radio-group>


    <v-btn> saas </v-btn>
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

      }
    }),
    props: {
      source: String
    },
    question: {
      result: ''
    },
    object: {
      firstName: 'Иван',
      lastName: 'Петров',
      age: 30
    },

    created: function () {

    }
  }
</script>