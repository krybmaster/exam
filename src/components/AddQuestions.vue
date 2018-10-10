<template>

    <div>

<form @submit="addLocation(name, image)">
<input v-model="name" placeholder="Location Name">
<input v-model="image" placeholder="Location Image URL">
<button type="submit">Add New Location</button>
</form>


            <article v-for="(location, idx) in locations" :key="idx">
            <img :src="location.image">
            <h1>{{ location.name }}</h1>
            <button @click="deleteLocation(location.id)"> 
            Delete
            </button>
</article>
    
    </div>

</template>

<script>

import { db } from '../main'

export default {
 name: 'HelloWorld',
 data () {
   return {
     locations: [],
     name: '',      // <-- новое свойство
     image: ''      // <-- новое свойство
   }
 },
 firestore () {
   return {
     locations: db.collection('locations').orderBy('createdAt')
   }
 },
    methods: {
        addLocation (name, image) {      
            const createdAt = new Date()
            db.collection('locations').add({ name, image, createdAt })
        },
            deleteLocation (id) {   // <-- новый метод
            db.collection('locations').doc(id).delete()
        }
    }
}


</script>