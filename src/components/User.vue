<template>
  <v-app id="user">

    <v-container fluid grid-list-xs> 

      <v-layout >
        <v-flex xs12 sm5 md5 offset-xs0>

      <v-toolbar dark color="primary">
        <v-toolbar-title>Темы</v-toolbar-title>
      </v-toolbar>
      <v-card>

        <v-card-text>

          <div> {{selectTheme}} </div> 
              

              <v-radio-group v-model="radioTheme">
                
                <v-radio
                  v-for="theme in themes" :key="theme.id"
                  :label="`${theme.text}`"
                  :value="theme.id">
                </v-radio>
              </v-radio-group>
              <v-divider> </v-divider>


          <!--
         
          <v-card class="mb-4" v-for="theme in themes" :key="theme.id">
            <v-card-title primary-title>
              
              {{ theme.text }}
               
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" @click="startTheme(theme.id)">Выбрать</v-btn>
            </v-card-actions>
          </v-card>

  -->
          
         
      
        </v-card-text>
        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn :disabled="radioTheme === null" justify-end color="primary" @click="startTheme()">Далее</v-btn>
        </v-card-actions>

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
      radioTheme: null,
      userInfo: {
        email: '',
        name: ''
      },
      themes: []
    }),

    methods: {
      startTheme () {
        store.dispatch('startTheme');
      }
    },
    computed: {
      selectTheme: function() {
        store.commit('marker', {type: 0, id: this.radioTheme});
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