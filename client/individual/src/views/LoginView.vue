<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { usefoodStore } from '../stores/food'
export default {
  name: 'LoginView',
  data() {
    return {
      isEmail: '',
      isPassword: ''
    }
  },
  methods: {
    ...mapActions(usefoodStore, ['login']),
    ...mapActions(usefoodStore, ['googleLogin']),
    getCredentialLogin(response) {
      this.googleLogin(response.credential)
    }
  }
}
</script>
<template>
  <div class="login">
    <form action="get" class="login-form" @submit.prevent="login(isEmail, isPassword)">
      <h1>Login</h1>
      <input type="text" placeholder="Email" v-model="isEmail" />
      <input type="password" placeholder="Password" v-model="isPassword" />
      <button type="submit">Login</button>

      <GoogleLogin :callback="getCredentialLogin" />
      <p>dont have account? <RouterLink :to="'/register'">Register</RouterLink></p>
    </form>

    <img src="../assets/images/loginImage.jpg" alt="notfound" />
  </div>
</template>
