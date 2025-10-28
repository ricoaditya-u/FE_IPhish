<template>
    <div
        class="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div
      class="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6"
      >
        <div class="flex justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">{{ title }}</h3>
              <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ titleDescription }}
              </p>
            </div>
        </div>
        <div class="relative max-h-[195px]">
            <div id="chartTwo" class="h-full">
              <div class="radial-bar-chart">
                  <VueApexCharts type="radialBar" height="330" :options="chartOptions" :series="series" />
              </div>
            </div>
        </div>
        <ul class="list-disc pl-5 space-y-2 mt-2">
          <li v-for="(item, index) in description" :key="index" class="mx-auto mt-1.5 w-full max-w-[380px] text-left text-sm text-gray-500 sm:text-base">
              {{ item }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: {
    type: Number,
    default: 0
  },
  title: {
    type: Text
  },
  titleDescription: {
    type: Text
  },
  description: {
    type: Array
  },
  isPotentialBreach: {
    type: Boolean,
    default: false
  }
})

const series = computed(() => [props.data])
const chartColor = computed(() => props.isPotentialBreach ? '#FF0000' : '#465FFF')
const pointDeskripsi = computed(() => [props.description])

const chartOptions = {
  colors: [chartColor.value],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: '80%',
      },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: 60,
          color: '#1D2939',
          formatter: function (val: number) {
            return val.toFixed(2) + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'solid',
    colors: [chartColor.value],
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['Progress'],
}
</script>

<style scoped>
.radial-bar-chart {
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
}
</style>
