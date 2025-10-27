<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg 
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.98481 2.44399C3.11333 1.57147 1.15325 3.46979 1.96543 5.36824L3.82086 9.70527C3.90146 9.89367 3.90146 10.1069 3.82086 10.2953L1.96543 14.6323C1.15326 16.5307 3.11332 18.4291 4.98481 17.5565L16.8184 12.0395C18.5508 11.2319 18.5508 8.76865 16.8184 7.961L4.98481 2.44399ZM3.34453 4.77824C3.0738 4.14543 3.72716 3.51266 4.35099 3.80349L16.1846 9.32051C16.762 9.58973 16.762 10.4108 16.1846 10.68L4.35098 16.197C3.72716 16.4879 3.0738 15.8551 3.34453 15.2223L5.19996 10.8853C5.21944 10.8397 5.23735 10.7937 5.2537 10.7473L9.11784 10.7473C9.53206 10.7473 9.86784 10.4115 9.86784 9.99726C9.86784 9.58304 9.53206 9.24726 9.11784 9.24726L5.25157 9.24726C5.2358 9.20287 5.2186 9.15885 5.19996 9.11528L3.34453 4.77824Z"
            fill=""
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Email Sent</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ sent }}</h4>
        </div>

        <span
          :class="[
            'flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium',
            sentPercentNumber >= 100
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          ]"
          id="precentage_sent"
        >
          {{ sentPercent }}
        </span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.5 19.75C19.5 20.9926 18.4926 22 17.25 22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V9.62105C4.5 9.02455 4.73686 8.45247 5.15851 8.03055L10.5262 2.65951C10.9482 2.23725 11.5207 2 12.1177 2H17.25C18.4926 2 19.5 3.00736 19.5 4.25V19.75ZM17.25 20.5C17.6642 20.5 18 20.1642 18 19.75V4.25C18 3.83579 17.6642 3.5 17.25 3.5H12.248L12.2509 7.49913C12.2518 8.7424 11.2442 9.75073 10.0009 9.75073H6V19.75C6 20.1642 6.33579 20.5 6.75 20.5H17.25ZM7.05913 8.25073L10.7488 4.55876L10.7509 7.5002C10.7512 7.91462 10.4153 8.25073 10.0009 8.25073H7.05913ZM8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75H15C15.4142 13.75 15.75 14.0858 15.75 14.5C15.75 14.9142 15.4142 15.25 15 15.25H9C8.58579 15.25 8.25 14.9142 8.25 14.5ZM8.25 17.5C8.25 17.0858 8.58579 16.75 9 16.75H12C12.4142 16.75 12.75 17.0858 12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25H9C8.58579 18.25 8.25 17.9142 8.25 17.5Z"
            fill=""
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Email Opened</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ opened }}</h4>
        </div>

        <span
          :class="[
            'flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium',
            openedPercentNumber >= 100
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          ]"
          id="precentage_opened"
        >
          {{ openedPercent }}
        </span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.064 18.6L11.054 12.465C10.9636 12.0699 11.0827 11.656 11.3693 11.3694C11.656 11.0827 12.0698 10.9636 12.465 11.054L18.6 13.064C18.82 13.0971 18.9899 13.2746 19.0134 13.4959C19.0369 13.7171 18.9081 13.9264 18.7 14.005L15.816 15.317C15.5898 15.4163 15.4092 15.5969 15.31 15.823L14 18.707C13.9213 18.9151 13.7121 19.044 13.4908 19.0205C13.2696 18.9969 13.0921 18.827 13.059 18.607L13.064 18.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.552 11.957C6.96621 11.957 7.302 11.6212 7.302 11.207C7.302 10.7928 6.96621 10.457 6.552 10.457V11.957ZM5 10.457C4.58579 10.457 4.25 10.7928 4.25 11.207C4.25 11.6212 4.58579 11.957 5 11.957V10.457ZM11.958 5C11.958 4.58579 11.6222 4.25 11.208 4.25C10.7938 4.25 10.458 4.58579 10.458 5H11.958ZM10.458 6.552C10.458 6.96621 10.7938 7.302 11.208 7.302C11.6222 7.302 11.958 6.96621 11.958 6.552H10.458ZM16.1273 7.34833C16.4202 7.05544 16.4202 6.58056 16.1273 6.28767C15.8344 5.99478 15.3596 5.99478 15.0667 6.28767L16.1273 7.34833ZM13.9667 7.38767C13.6738 7.68056 13.6738 8.15544 13.9667 8.44833C14.2596 8.74122 14.7344 8.74122 15.0273 8.44833L13.9667 7.38767ZM8.44533 15.0303C8.73822 14.7374 8.73822 14.2626 8.44533 13.9697C8.15244 13.6768 7.67756 13.6768 7.38467 13.9697L8.44533 15.0303ZM6.28467 15.0697C5.99178 15.3626 5.99178 15.8374 6.28467 16.1303C6.57756 16.4232 7.05244 16.4232 7.34533 16.1303L6.28467 15.0697ZM7.34533 6.29067C7.05244 5.99778 6.57756 5.99778 6.28467 6.29067C5.99178 6.58356 5.99178 7.05844 6.28467 7.35133L7.34533 6.29067ZM7.38467 8.45133C7.67756 8.74422 8.15244 8.74422 8.44533 8.45133C8.73822 8.15844 8.73822 7.68356 8.44533 7.39067L7.38467 8.45133ZM6.552 10.457H5V11.957H6.552V10.457ZM10.458 5V6.552H11.958V5H10.458ZM15.0667 6.28767L13.9667 7.38767L15.0273 8.44833L16.1273 7.34833L15.0667 6.28767ZM7.38467 13.9697L6.28467 15.0697L7.34533 16.1303L8.44533 15.0303L7.38467 13.9697ZM6.28467 7.35133L7.38467 8.45133L8.44533 7.39067L7.34533 6.29067L6.28467 7.35133Z"
            fill=""
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Clicked Link</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ clicked }}</h4>
        </div>

        <span
          :class="[
            'flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium',
            clickedPercentNumber >= 100
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          ]"
        >
          {{ clickedPercent }}
        </span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          class="fill-gray-800 dark:fill-white/90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2996 1.12891C11.4713 1.12891 10.7998 1.80033 10.7996 2.62867L10.7996 3.1264V3.12659L10.7997 4.87507H6.14591C3.6031 4.87507 1.54175 6.93642 1.54175 9.47923V14.3207C1.54175 15.4553 2.46151 16.3751 3.5961 16.3751H6.14591H10.0001H16.2084C17.4511 16.3751 18.4584 15.3677 18.4584 14.1251V10.1251C18.4584 7.22557 16.1079 4.87507 13.2084 4.87507H12.2997L12.2996 3.87651H13.7511C14.5097 3.87651 15.1248 3.26157 15.1249 2.50293C15.125 1.74411 14.5099 1.12891 13.7511 1.12891H12.2996ZM3.04175 9.47923C3.04175 7.76485 4.43153 6.37507 6.14591 6.37507C7.8603 6.37507 9.25008 7.76485 9.25008 9.47923V14.8751H6.14591H3.5961C3.28994 14.8751 3.04175 14.6269 3.04175 14.3207V9.47923ZM10.7501 9.47923V14.8751H16.2084C16.6226 14.8751 16.9584 14.5393 16.9584 14.1251V10.1251C16.9584 8.054 15.2795 6.37507 13.2084 6.37507H9.54632C10.294 7.19366 10.7501 8.28319 10.7501 9.47923Z"
            fill=""
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Submitted Data</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ submittedData }}</h4>
        </div>

        <span
          :class="[
            'flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium',
            submitedPercentNumber >= 100
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          ]"
        >
          {{ submitedPercent }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

// Accept summary data from parent (e.g., sent, opened, clicked, submitted counts)
// Structure depends on API; parent just passes the raw object.
// You can later replace the hardcoded numbers below to use fields from `summary`.
// Example: const totalSent = computed(() => props.summary?.sent || 0)
const props = defineProps({
  summary: {
    type: [Object, null],
    default: null,
  },
})

// Helpers to safely read nested stats
const stats = computed(() => (props.summary && props.summary.stats) ? props.summary.stats : {})

const sent = computed(() => stats.value.sent ?? 0)
const opened = computed(() => stats.value.opened ?? 0)
const clicked = computed(() => stats.value.clicked ?? 0)
const submittedData = computed(() => stats.value.submitted_data ?? 0)

// Percentage of sent over sent, formatted with two decimals and % sign
const sentPercent = computed(() => {
  const s = sent.value
  if (!s || s <= 0) return '0%'
  const pct = (s / s) * 100
  return `${pct.toFixed(2)}%`
})

// Numeric version for class conditions
const sentPercentNumber = computed(() => {
  const s = sent.value
  if (!s || s <= 0) return 0
  return 100
})

// Percentage of opened over sent, formatted with two decimals and % sign
const openedPercent = computed(() => {
  const s = sent.value
  const o = opened.value
  if (!s || s <= 0) return '0%'
  const pct = (o / s) * 100
  return `${pct.toFixed(2)}%`
})

const openedPercentNumber = computed(() => {
  const s = sent.value
  const o = opened.value
  if (!s || s <= 0) return 0
  return (o / s) * 100
})

// Percentage of clicked over sent, formatted with two decimals and % sign
const clickedPercent = computed(() => {
  const o = opened.value
  const c = clicked.value
  if (!o || o <= 0) return '0%'
  const pct = (c / o) * 100
  return `${pct.toFixed(2)}%`
})

const clickedPercentNumber = computed(() => {
  const o = opened.value
  const c = clicked.value
  if (!o || o <= 0) return 0
  return (c / o) * 100
})

// Percentage of submitted over sent, formatted with two decimals and % sign
const submitedPercent = computed(() => {
  const c = clicked.value
  const d = submittedData.value
  if (!c || c <= 0) return '0%'
  const pct = (d / c) * 100
  return `${pct.toFixed(2)}%`
})

const submitedPercentNumber = computed(() => {
  const c = clicked.value
  const d = submittedData.value
  if (!c || c <= 0) return 0
  return (d / c) * 100
})
</script>
