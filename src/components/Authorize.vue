<template>
<v-app id="authorize">
  <v-container grid-list-xl text-xs-left>
    <v-layout row wrap>
      <v-flex xs12 sm5 md5 offset-xs0  >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вход пользователя</v-toolbar-title>
          </v-toolbar>
          <v-card-text> 
          <form >
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="40"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              prepend-icon="person"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              prepend-icon="email"
            ></v-text-field>
          </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>

  


</template>

<script>
  import { store } from '../main.js'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(40) },
      email: { required, email }
    },

    data: () => ({
      name: '',
      email: ''
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Very long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        this.email = this.email.toLowerCase().trim()
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (!this.emailErrors.length) {
          //this.email.toLowerCase().trim();
          store.commit('userData', this.$data);
          store.dispatch('logIn');
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
      }
    }
  }
</script>