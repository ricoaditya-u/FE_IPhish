<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
      <div class="w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Phising Result Overview</h3>
      </div>

      <div class="relative">
        <div class="inline-flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selected = option.value"
            :class="[
              selected === option.value
                ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400',
              'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
        <VueApexCharts
          type="area"
          height="310"
          :options="chartOptions"
          :series="series"
          :key="dataList.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  dataCurvas: {
    type: Object,
    default: () => ({}),
  },
})

const options = [
  { value: 'optionOne', label: 'Monthly' },
  { value: 'optionTwo', label: 'Quarterly' },
  { value: 'optionThree', label: 'Annually' },
]

const selected = ref('optionOne')

// derived list from incoming prop
const dataList = computed(() => props.dataCurvas?.data ?? [])

// x-axis categories from name key
const categories = computed(() => dataList.value.map((item: any) => item.name))

console.log("x-axis:", categories.value)

// series arrays from potential_breach and awareness_score
const series = computed(() => [
  {
    name: 'Potential Breach',
    data: dataList.value.map((item: any) => {
      const v = Number(item?.potential_breach ?? 0)
      // convert to percentage and round 2 decimals
      return Number((v * 100).toFixed(2))
    }),
  },
  {
    name: 'Human Security Awareness',
    data: dataList.value.map((item: any) => Number(item?.awareness_score ?? 0)),
  },
])

const chartOptions = ref({
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#FF0000', '#9CB9FF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'straight',
    width: [2, 2],
  },
  markers: {
    size: 0,
  },
  labels: {
    show: false,
    position: 'top',
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
  xaxis: {
    type: 'category',
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
  },
})

// keep categories in chartOptions in sync when prop updates
watch(categories, (newCats) => {
  // replace xaxis with new categories to ensure reactivity
  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      ...(chartOptions.value.xaxis || {}),
      categories: newCats,
    },
  }
})
</script>

<style scoped>
  .area-chart {
    width: 100%;
  }
</style>
