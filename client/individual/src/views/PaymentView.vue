<script>
import { mapActions, mapState } from 'pinia'
import { usefoodStore } from '../stores/food'
import { RouterLink, routeLocationKey } from 'vue-router'
export default {
  name: 'PaymentView',
  computed: {
    ...mapState(usefoodStore, ['histories', 'customerName', 'qrCode'])
  },
  methods: {
    ...mapActions(usefoodStore, ['fetchHistory'])
  },
  created() {
    this.fetchHistory()
  }
}
</script>
<template>
  <div class="history-payment">
    <div class="table-history">
      <p>Hello {{ customerName }}</p>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Status</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in histories" :key="history.id">
            <td>{{ history.Food?.name }}</td>
            <td>{{ history.status }}</td>
            <td>{{ history.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="qr-history">
      <div class="qrCode-History">
        <img :src="`data:;base64,${qrCode}`" alt="notfound" />
      </div>
    </div>
  </div>
</template>
