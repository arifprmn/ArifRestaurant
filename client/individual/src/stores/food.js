import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'
// let BASE_URL = 'https://projectfas2.arifprmn.site'
let BASE_URL = 'http://localhost:3000'

export const usefoodStore = defineStore({
  id: 'food',
  state() {
    return {
      foods: [],
      countPage: '',
      token: '',
      foodPayment: '',
      customerName: '',
      histories: [],
      qrCode: ''
    }
  },
  actions: {
    async getDataFood(page, search) {
      try {
        const { data } = await axios.get(`${BASE_URL}/food`, {
          params: {
            page,
            search
          }
        })
        this.foods = data.data.foundFoods.rows
        this.countPage = Math.ceil(data.data.foundFoods.count / 4)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async login(email, password) {
      try {
        console.log(email, password)
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/login`,
          data: {
            email,
            password
          }
        })
        console.log(data.data.message)
        // console.log(data.data.access_token)
        localStorage.setItem('access_token', data.data.access_token)
        Swal.fire('success', data.data.message, 'success')
        router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'FixIt!'
        })
      }
    },
    async register(reg) {
      console.log(reg)
      try {
        const { data } = await axios({
          url: `${BASE_URL}/register`,
          method: 'POST',
          data: {
            username: reg.username,
            email: reg.email,
            password: reg.password
          }
        })
        Swal.fire('success', data, 'success')
        router.push('/login')
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'FixIt!'
        })
      }
    },
    logout() {
      localStorage.clear()
      router.push('/login')
    },
    async changeStatus(id) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/midtrantoken/patch/${id}`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire('success', data.message, 'success')
      } catch (err) {
        console.log(err)
      }
    },
    async payment(id) {
      try {
        console.log(id)
        const { data } = await axios({
          url: `${BASE_URL}/midtransToken/${id}`,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log(data)
        // console.log(token)
        // console.log(data.data.dataPayment)
        this.foodPayment = data.data.dataPayment.id
        let func = this.changeStatus
        window.snap.pay(data.data.midtransToken.token, {
          onSuccess: function (result) {
            func(data.data.dataPayment.id)
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async fetchHistory() {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/customerhistory`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.customerName = data.data.customer
        this.histories = data.data.foundHistory
        this.qrCode = data.data.qrCode
        console.log(this.customerName, this.histories, this.qrCode)
      } catch (err) {
        console.log(err)
      }
    },
    async googleLogin(credential) {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/login-google`,
          method: 'POST',
          data: {
            token: credential
          }
        })

        // console.log(data)
        // this.googleEmail = data.data.email
        // this.googlePassword = data.data.password
        // console.log(data.data.email, data.data.password)
        this.login(data.data.email, data.data.password)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
