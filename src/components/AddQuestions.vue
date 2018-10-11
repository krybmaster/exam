<template>

    <div>

        <form @submit="addQuestion(text, image)">
            <input v-model="text" placeholder="Question text">
            <v-btn type="submit">Добавить вопрос</v-btn>
        </form>

        <article v-for="(question, idx) in questions" :key="idx">

            <div>{{ question.text }}</div>

            <div>
                <v-btn @click="addAnswer(question.id, 'New answer', false)">
                    Добавить ответ
                </v-btn>
            </div>
            <v-btn @click="deleteQuestion(question.id)">
                Удалить вопрос
            </v-btn>
        </article>
    
    </div>

</template>

<script>

import { db } from '../main'
export default {
    data () {
        return {
            questions: [],
            text: '',      // <-- новое свойство
            image: '',      // <-- новое свойство
            answers: [],
            truthful: false
        }
    },
    firestore () {
        return {
            questions: db.collection('questions').orderBy('createdAt'),
        }
    },
    methods: {
        addQuestion (text, image) {      // <-- новый метод
            const createdAt = new Date()
            db.collection('questions').add({ text, image, createdAt }) 
        },
        deleteQuestion (id) {   // <-- новый метод
            db.collection('questions').doc(id).delete()
        },
        addAnswer (id, text, truthful) {
            db.collection('questions').doc(id).collection('answers').add({ text, truthful })
        }
    }
}

</script>