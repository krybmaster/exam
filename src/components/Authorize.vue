<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="40"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
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
        !this.$v.name.maxLength && errors.push('Name must be at most 40 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        store.commit('email', this.$data  );
        store.dispatch('logIn');
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
      }
    }
  }
</script>