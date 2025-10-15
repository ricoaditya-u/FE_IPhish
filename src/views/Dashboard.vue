<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <statistics-chart />
      </div>
      <div class="col-span-12">
        <ecommerce-metrics />
      </div>
      <div class="col-span-12">
        <DashboardTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import DashboardTable from '../components/dashboard/DashboardTable.vue'
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const datas = ref([])

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('/api/campaigns/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

onMounted(() => {
    fetchPages()
})
</script>
