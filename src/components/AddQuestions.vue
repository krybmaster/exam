<template>

    <div>

<form @submit="addQuestion(name, image)">
<input v-model="name" placeholder="Question Name">
<input v-model="image" placeholder="Question Image URL">
<button type="submit">Add New Question</button>
</form>


            <article v-for="(question, idx) in questions" :key="idx">
            <h1>{{ question.name }}</h1>
            <h1>{{ question.image }}</h1>
            <button @click="deleteQuestion(question.id)"> 
            Delete
            </button>

            <button @click="addAnswer(question.id, '!!!!!!!', false )"> 
            addAnswer
            </button>
</article>
    
    </div>

</template>

<script>

import { db } from '../main'

export default {
    data () {
        return {
            questions: [],
            name: '',      // <-- новое свойство
            image: '',      // <-- новое свойство
            answers: [],
            text: '',
            truthful: false
        }
    },
    firestore () {
        return {
            questions: db.collection('questions')//.limitToFirst(5)
        }
    },
    methods: {
        addQuestion (name, image) {               
            db.collection('questions').add({ name, image })
        },
        deleteQuestion (id) {   // <-- новый метод
            db.collection('questions').doc(id).delete()
        },
        addAnswer (id, text, truthful) {
            db.collection('questions').doc(id).collection('questions').add( {text, truthful})
        }
    }
}


</script>