<template>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-6">
        <div
            class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
            <div
                class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
            >
                <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 256 241" enable-background="new 0 0 256 241" xml:space="preserve">
                <path d="M254,188V2H2v186h111v29H75v22h106v-22h-38v-29H254z M19,19h217v151H19L19,19z M156.269,42.429
                    c-14.477,0-26.28,11.803-26.28,26.28v15.768H85.451v62.98h68.236v-62.98h-13.186V68.709c0-8.668,7.1-15.768,15.768-15.768
                    c8.668,0,15.768,7.1,15.768,15.768v15.768h10.512V68.709C182.549,54.232,170.746,42.429,156.269,42.429z M127.407,131.688h-15.768
                    l2.121-12.356c-2.859-1.844-4.703-4.979-4.703-8.668c0-5.809,4.703-10.512,10.512-10.512s10.512,4.703,10.512,10.512
                    c0,3.688-1.844,6.824-4.703,8.668L127.407,131.688z"/>
                </svg>
            </div>

            <div class="flex items-end justify-between mt-5">
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Potential Breach (Potensi kebocoran data)</span>
                    <h4 class="mt-2 font-bold text-red-600 text-title-sm dark:text-white/90">{{ potential_breach }} %</h4>
                </div>
            </div>
        </div>

        <div
        class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
            <div
                class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29298 3.29289C2.90246 3.68342 2.90246 4.31658 3.29298 4.70711L4.29298 5.70711C4.68351 6.09763 5.31667 6.09763 5.7072 5.70711C6.09772 5.31658 6.09772 4.68342 5.7072 4.29289L4.7072 3.29289C4.31667 2.90237 3.68351 2.90237 3.29298 3.29289ZM19.293 3.29289C19.6835 2.90237 20.3167 2.90237 20.7072 3.29289C21.0977 3.68342 21.0977 4.31658 20.7072 4.70711L19.7072 5.70711C19.3167 6.09763 18.6835 6.09763 18.293 5.70711C17.9025 5.31658 17.9025 4.68342 18.293 4.29289L19.293 3.29289ZM19.7072 14.2929L20.7072 15.2929C21.0977 15.6834 21.0977 16.3166 20.7072 16.7071C20.3167 17.0976 19.6835 17.0976 19.293 16.7071L18.293 15.7071C17.9025 15.3166 17.9025 14.6834 18.293 14.2929C18.6835 13.9024 19.3167 13.9024 19.7072 14.2929ZM3.29298 16.7071C2.90246 16.3166 2.90246 15.6834 3.29298 15.2929L4.29298 14.2929C4.68351 13.9024 5.31667 13.9024 5.7072 14.2929C6.09772 14.6834 6.09772 15.3166 5.7072 15.7071L4.7072 16.7071C4.31667 17.0976 3.68351 17.0976 3.29298 16.7071ZM20.4142 11C20.9665 11.0001 21.4142 10.5524 21.4142 10.0001C21.4143 9.44781 20.9666 9.00007 20.4143 9.00003L20.0001 9C19.4478 8.99996 19.0001 9.44765 19 9.99993C19 10.5522 19.4477 11 20 11L20.4142 11ZM2 10.2072C2.00004 10.7595 2.44779 11.2072 3.00007 11.2071L3.41428 11.2071C3.96657 11.2071 4.41425 10.7593 4.41421 10.207C4.41417 9.65474 3.96643 9.20705 3.41414 9.20709L2.99993 9.20712C2.44765 9.20716 1.99996 9.65491 2 10.2072ZM15.4366 14.9189C16.9865 13.8341 18 12.0354 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 12.0354 7.0135 13.8341 8.56337 14.9189C8.21123 15.3497 8 15.9002 8 16.5C8 17.7099 8.85949 18.7191 10.0012 18.9502C10.0004 18.9667 10 18.9833 10 19C10 19.5523 10.4477 20 11 20H13C13.5523 20 14 19.5523 14 19C14 18.9833 13.9996 18.9667 13.9988 18.9502C15.1405 18.7191 16 17.7099 16 16.5C16 15.9002 15.7888 15.3497 15.4366 14.9189ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14ZM12 16H11.9146H10.5C10.2239 16 10 16.2239 10 16.5C10 16.7761 10.2239 17 10.5 17H11.9146H12.0854H13.5C13.7761 17 14 16.7761 14 16.5C14 16.2239 13.7761 16 13.5 16H12.0854H12Z" fill="#000000"/>
                </svg>
            </div>

            <div class="flex items-end justify-between mt-5">
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Human Security Awareness</span>
                    <h4 class="mt-2 font-bold text-blue-700 text-title-sm dark:text-white/90">{{ awareness_score }} %</h4>
                </div>
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
    reportCampaign: { type: Object, default: () => ({}) },
})

// // Helpers to safely read nested stats
const potential_breach = (props.reportCampaign.data.potential_breach * 100).toFixed(0)
const awareness_score = props.reportCampaign.data.awareness_score
// const opened = computed(() => stats.value.opened ?? 0)
// const clicked = computed(() => stats.value.clicked ?? 0)
// const submittedData = computed(() => stats.value.submitted_data ?? 0)

// // Percentage of sent over sent, formatted with two decimals and % sign
// const sentPercent = computed(() => {
//     const s = sent.value
//     if (!s || s <= 0) return '0%'
//     const pct = (s / s) * 100
//     return `${pct.toFixed(2)}%`
// })

// // Numeric version for class conditions
// const sentPercentNumber = computed(() => {
//     const s = sent.value
//     if (!s || s <= 0) return 0
//     return 100
// })

// // Percentage of opened over sent, formatted with two decimals and % sign
// const openedPercent = computed(() => {
//     const s = sent.value
//     const o = opened.value
//     if (!s || s <= 0) return '0%'
//     const pct = (o / s) * 100
//     return `${pct.toFixed(2)}%`
// })

// const openedPercentNumber = computed(() => {
//     const s = sent.value
//     const o = opened.value
//     if (!s || s <= 0) return 0
//     return (o / s) * 100
// })

// // Percentage of clicked over sent, formatted with two decimals and % sign
// const clickedPercent = computed(() => {
//     const o = opened.value
//     const c = clicked.value
//     if (!o || o <= 0) return '0%'
//     const pct = (c / o) * 100
//     return `${pct.toFixed(2)}%`
// })

// const clickedPercentNumber = computed(() => {
//     const o = opened.value
//     const c = clicked.value
//     if (!o || o <= 0) return 0
//     return (c / o) * 100
// })

// // Percentage of submitted over sent, formatted with two decimals and % sign
// const submitedPercent = computed(() => {
//     const c = clicked.value
//     const d = submittedData.value
//     if (!c || c <= 0) return '0%'
//     const pct = (d / c) * 100
//     return `${pct.toFixed(2)}%`
// })

// const submitedPercentNumber = computed(() => {
//     const c = clicked.value
//     const d = submittedData.value
//     if (!c || c <= 0) return 0
//     return (d / c) * 100
// })
</script>
