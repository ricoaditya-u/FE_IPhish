<template>
  <LoadingWheel v-if="isLoading" />

  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-6">
          <DashboardCard :title="title1" :titleDescription="titleDescription1" :description="deskripsi2" :data="dataAverage?.data?.awareness_score || 0" :isPotentialBreach="false"/>
          <DashboardCard :title="title2" :titleDescription="titleDescription2" :description="deskripsi1" :data="(dataAverage?.data?.potential_breach * 100) || 0" :isPotentialBreach="true"/>
        </div>
      </div>
      <div class="col-span-12">
        <statistics-chart :data-curvas="dataCurvas"/>
      </div>
      <div class="col-span-12">
        <DashboardReport  :dataAverage="dataAverage"/>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import DashboardTable from '../components/dashboard/DashboardTable.vue'
import DashboardCard from '../components/dashboard/DashboardCard.vue'
import DashboardReport from '../components/dashboard/DashboardReport.vue'
import LoadingWheel from '../components/common/LoadingWheel.vue'
import { ref, nextTick, onMounted } from 'vue'
import axios from 'axios'

// Definition
const datas = ref([])
const dataCurvas = ref({})
const dataAverage = ref()
const isLoading = ref(true)
const title1 = "Human Security Awareness Score Average"
const title2 = "Potential Breach Average"
const titleDescription1 = "Rata rata nilai Potential Breach dari 3 kampanye terakhir"
const titleDescription2 = "Rata rata nilai awareness dari 3 kampanye terakhir"
const deskripsi1 = ["Skor Awareness = 100 - vulnerability", "Vulnerability = 0.5*℅ + 0.35*s/c + 0.15*s/n", "% : jumlah klik link setelah buka email", "s/c : jumlah yang submit data setelah klik link", "s/n : jumlah yang submit data terhadap populasi"]
const deskripsi2 = ["Skor Potential Breach = (S + (C - S)*p) / N", "S: Jumlah submit credential", "C: Jumlah klik link phishing", "N: Jumlah target yang dikirim (Populasi)", "p: Submitted/clicked dari tahun sebelumnya"]

// Methods
const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/campaigns/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

const getDataCurva = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_GATEWAY_API_URL}/gateway-api/campaigns/trend`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // Process response as needed
        dataCurvas.value = response.data
    } catch (error) {
        console.error('Failed to fetch data curva:', error)
    }
}

const getDataAverage = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_GATEWAY_API_URL}/gateway-api/campaigns/report/average`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // Process response as needed
        return response.data
    } catch (error) {
        console.error('Failed to fetch data curva:', error)
    }
}

onMounted(async () => {
    try {
        isLoading.value = true
        await fetchPages()
        await getDataCurva()
        dataAverage.value = await getDataAverage()
        // console.log("dataAverage: ", dataAverage.value.data.awareness_score)

        // Tunggu data terload dulu
        await nextTick()
    } catch (error) {
        console.error('Error in mounting:', error)
    } finally {
        isLoading.value = false
    }
})
</script>
