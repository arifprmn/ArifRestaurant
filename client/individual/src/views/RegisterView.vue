<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { usefoodStore } from '../stores/food'
export default {
  name: 'RegisterView',
  methods: {
    ...mapActions(usefoodStore, ['register'])
  },
  data() {
    return {
      reg: {
        username: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
<template>
  <div class="registrasi">
    <img src="../assets/images/registerimage.jpg" alt="notfound" />
    <form action="get" class="registrasi-form" @submit.prevent="register(reg)">
      <h1>Register</h1>
      <input type="text" placeholder="Username" v-model="reg.username" />
      <input type="text" placeholder="Email" v-model="reg.email" />
      <input type="password" placeholder="Password" v-model="reg.password" />
      <button type="submit">Register</button>
      <p>already have account? <RouterLink :to="'/login'">Login</RouterLink></p>
    </form>
  </div>
</template>
