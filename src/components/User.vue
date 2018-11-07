<template>
  <v-app id="user">

    <v-content>

      <div>
          {{ userInfo.name }} , выберите тему для тестирования.
      </div>
      <div>
          Результат тестирования Вы получите на почту: {{ userInfo.email }}
      </div>

      <article v-for="theme in themes" :key="theme.id">
        <v-card>
          <v-card-title primary-title>
            {{ theme.text }}
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="startTheme(theme.id)">Выбрать</v-btn>
          </v-card-actions>
        </v-card>
      </article>

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
      themes: []
    }),

    methods: {
      startTheme (id) {
        store.commit('marker', {type: 0, id: id});
        store.dispatch('startTheme');
      }
    },
    created: function () {
      this.userInfo = store.state.lp
      store.dispatch('getThemes');
      store.watch(store.getters.getThemes, themes => {
          this.$data.themes = themes;
      });
    }

  }
</script>