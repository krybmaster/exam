<template>
  <v-app id="user">

    <v-container fluid grid-list-xs> 

      <v-layout >
        <v-flex xs12 sm5 md5 offset-xs0>

      <v-toolbar dark color="primary">
        <v-toolbar-title>Темы</v-toolbar-title>
      </v-toolbar>
      <v-card>

        

            <article v-for="theme in themes" :key="theme.id">
              <v-card class="mb-2">
                <v-card-title primary-title>
                  {{ theme.text }}
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange" @click="startTheme(theme.id)">Выбрать</v-btn>
                </v-card-actions>
              </v-card>
            </article>
      

      </v-card>

        </v-flex>
        </v-layout>

    </v-container>

 


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