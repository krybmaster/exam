<template>

  <v-container grid-list-xl text-xs-left>
      <v-btn @click="getDoc()" >Получить документ</v-btn>
   <v-layout row wrap>

        <v-flex xs3 order-md1 order-xs1>
            

            <form @submit="addTheme(text)">
                <div>
                    <input v-model="text" placeholder="Тема">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить тему</v-btn>
                </div>
            </form>

            <article v-for="theme in themes" :key="theme.id">
                <v-card>
                    <v-card-title primary-title>
                        {{ theme.text }}
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="filter(theme.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteDoc(theme.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>
<!-- 
        <v-flex xs4 order-md2 order-xs1>
            <form @submit="addQuestion(text)">
                <div>
                    <input v-model="text" placeholder="Вопрос">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить Вопрос</v-btn>
                </div>
            </form>
            <article v-for="(question, idx) in fQuestions" :key="idx">
                <v-card>
                    <v-card-title primary-title>
                    <div>
                    {{ question.text }}
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="selectQuestion(question.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteDoc(question.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>

        <v-flex xs4 order-md3 order-xs1>
            <form @submit="addQuestion(text)"> 
                <div>
                    <input v-model="text" placeholder="Ответ">
                </div>
                <div>
                    <v-btn flat color="orange" type="submit">Добавить Ответ</v-btn>
                </div>
            </form>
            <article v-for="(question, idx) in fQuestions" :key="idx">
                <v-card>
                    <v-card-title primary-title>
                    <div>
                    {{ question.text }}
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="orange" @click="selectQuestion(question.id)">Выбрать</v-btn>
                    <v-btn flat color="orange" @click="deleteDoc(question.id)">Удалить</v-btn>
                    </v-card-actions>
                </v-card>
            </article>
        </v-flex>
-->
    </v-layout>  

  </v-container>

</template>

<script>

import { db, store } from '../main'
export default {
    data: () => ({
      text: '',
      themes: [],
      courceInfo: {
        Name: 'Name'
      },
      drawer: true,
      drawerRight: true,
      right: null,
      left: null
    }),

    methods: {
        filter (id) {
            store.commit('marker', {type:0, id: id} )
        },
        addTheme (text) {
            db.collection('quiz').add({ text, type: 0 }) 
        },
        selectTheme (id) {
            store.commit('marker', {type:0, id: id} )
        },
        addQuestion (text, link) {
            const createdAt = new Date()
            db.collection('quiz').add({ text, type: 1, createdAt, link }) 
        },
        selectQuestion (id) {
            store.commit('marker', 1, id)
        },

        addAnswer (text, truthful, link) {
            db.collection('quiz').add({ text, type: 2, truthful, link })
        },
        selectAnswer (id) {
            store.commit('marker', 2, id)
        },

        deleteDoc (id) {
            db.collection('quiz').doc(id).delete()
        },

        getDoc () {
            store.dispatch('getData').then(() => {
                this.$data.themes = store.state.themes
                console.log(this.$data.themes)
            });
        }
    },
    created: function () {
        store.dispatch('getData').then(() => {
            this.$data.themes = store.state.themes
            console.log(this.$data.themes)
        });
    }
}

</script>