<template>
    <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
    >
        <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Report Campaign</h3>
            </div>
        </div>

        <div class="grid gap-6">
            <!-- Campaign Info -->
            <div class="space-y-4">
                <h4 class="text-md font-semibold text-gray-800 dark:text-white/90">Campaign Information</h4>
                <div class="space-y-3">
                    <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Awareness Status </label>
                        <span
                            :class="{
                                'inline-flex rounded-full px-2 py-1 text-xs font-medium': true,
                                'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500':
                                    awareness_status === 'sadar',
                                'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500':
                                    awareness_status === 'waspada', 
                                'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500':
                                    awareness_status === 'rentan',
                            }"
                        >
                            {{ awareness_status || 'N/A' }}
                        </span>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Deskripsi</label>
                        <p class="text-gray-800 dark:text-white/90">{{ deskripsi }}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Rekomendasi Solusi</label>
                        <ul class="list-disc pl-5 space-y-2 mt-2">
                            <li v-for="(item, index) in solusi" :key="index" class="text-gray-800 dark:text-white/90">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const emit = defineEmits(['delete'])
const props = defineProps({
    reportCampaign: { type: Object, default: () => ({}) },
})

const awareness_status = props.reportCampaign.data.awareness
const deskripsi = props.reportCampaign.data.description
const solusi = props.reportCampaign.data.solution

</script>
