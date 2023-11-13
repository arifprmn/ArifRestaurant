<script>
import { mapActions, mapState } from 'pinia'
import { usefoodStore } from '../stores/food'
import { RouterLink, routeLocationKey } from 'vue-router'
export default {
  name: 'HomeView',
  data() {
    return {
      page: '',
      search: '',
      token: localStorage.getItem('access_token')
    }
  },
  methods: {
    ...mapActions(usefoodStore, ['getDataFood']),
    clearSearch() {
      this.search = ''
    },
    clickHandler(newPage, newSearch) {
      this.$router.push({
        query: {
          search: newSearch,
          page: newPage
        }
      })
    },
    ...mapActions(usefoodStore, ['logout']),
    ...mapActions(usefoodStore, ['payment']),
    ...mapActions(usefoodStore, ['fetchHistory'])
  },
  created() {
    this.getDataFood(this.$route.query.page, this.$route.query.search)
    this.clickHandler(this.$route.query.page, this.$route.query.search)
  },
  computed: {
    ...mapState(usefoodStore, ['foods']),
    ...mapState(usefoodStore, ['countPage'])
  },
  watch: {
    '$route.query'() {
      this.getDataFood(this.$route.query.page, this.$route.query.search)
    },
    token() {
      this.getDataFood(this.$route.query.page)
    }
    // '$route.query.search'() {
    //   this.getDataCuisines(this.$route.query.search)
    // }
  }
}
</script>

<template>
  <div class="home-page">
    <div class="navbar">
      <p class="logo">Welcome To Arif Restaurant</p>
      <form
        action="get"
        class="search"
        @submit.prevent="getDataFood(search, page), clickHandler(index, search)"
      >
        <input type="text" placeholder="Search Here" v-model="search" />
        <button type="submit">Search</button>
        <button @click="clearSearch">Clear Search</button>
      </form>
    </div>
    <div class="conttent">
      <div class="navbar-beforeLogin">
        <div class="button-navbarbefLog">
          <RouterLink :to="'/login'" v-if="!token"> <button>Login</button> </RouterLink>
          <RouterLink :to="'/register'" v-if="!token"><button>Register</button></RouterLink>
          <RouterLink :to="'/customerhistory'" v-if="token" @click.prevent="fetchHistory">
            <button>History</button>
          </RouterLink>
          <button v-if="token" @click.prevent="logout">
            <a href=""><p>Logout</p></a>
          </button>
        </div>
      </div>
      <div>
        <div class="card-content">
          <div class="card-cuisine" v-for="food in foods" :key="food.id">
            <img :src="food.imageUrl" alt="NotFound" />
            <p>{{ food.name }}</p>
            <p>Rp.{{ food.price }}</p>
            <div class="card-symbol">
              <a href="" @click.prevent="payment(food.id)"
                ><i class="fa-solid fa-cart-shopping" style="color: #a75f12"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button
          v-for="index in countPage"
          :key="index"
          @click.prevent="getDataFood(index, search), clickHandler(index, search)"
        >
          <a href="">{{ index }}</a>
        </button>
      </div>
    </div>
  </div>
</template>
