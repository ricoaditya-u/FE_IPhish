<template>
    <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
    >
        <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Details</h3>
            </div>
        </div>

        <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="min-w-full">
                <thead>
                    <tr class="border-t border-gray-100 dark:border-gray-800">
                        <th class="py-3 text-left">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Email</p>
                        </th>
                        <th class="py-3 text-left">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
                        </th>
                        <th class="py-3 text-left">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Time</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(group, gIndex) in groupedEvents" :key="gIndex">
                        <tr v-for="(e, i) in group.list" :key="i" class="border-t border-gray-100 dark:border-gray-800">
                            <td v-if="i === 0" :rowspan="group.list.length" class="py-3 whitespace-nowrap">
                                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ group.email }}</p>
                            </td>
                            <td class="py-3 whitespace-nowrap">
                                <span :class="getStatusBadgeClass(e.message)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                    {{ e.message }}
                                </span>
                            </td>
                            <td class="py-3 whitespace-nowrap">
                                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ formatTime(e.time) }}</p>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { defineProps, computed, ref, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['delete'])
const props = defineProps({
    data: Object,
    campaignId: String
})

const timeline = ref([])
const errorMessage = ref('')

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`/api/phishing/campaigns/${props.campaignId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        timeline.value = response.data.timeline
        return response.data
    } catch (error) {
        console.error('Failed to fetch campaign timeline:', error)
        errorMessage.value = 'Failed to load campaign timeline.'
    }
}

// 🔹 Grouping berdasarkan email
const groupedEvents = computed(() => {
    if (!timeline.value || !Array.isArray(timeline.value)) {
        return []
    }
    
    const grouped = timeline.value.reduce((acc, e) => {
        const key = e.email || 'no-email'
        if (!acc[key]) acc[key] = []
        acc[key].push(e)
        return acc
    }, {})

    return Object.entries(grouped).map(([email, list]) => ({
        email,
        list
    }))
})

// 🔹 Format waktu biar lebih mudah dibaca
function formatTime(isoTime) {
    const date = new Date(isoTime)
    return date.toLocaleString()
}

// 🔹 Get badge class berdasarkan status message
function getStatusBadgeClass(message) {
    const status = message.toLowerCase()
    
    if (status.includes('campaign created')) {
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    } else if (status.includes('email sent')) {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    } else if (status.includes('clicked link')) {
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    } else if (status.includes('submitted data')) {
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    } else {
        // Default styling untuk status yang tidak dikenali
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
}

async function confirmDelete(data) {
    const result = await Swal.fire({
        title: 'Yakin mau hapus?',
        text: 'Data ini akan hilang permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6b7280',
        reverseButtons: true,
    })

    if (result.isConfirmed) {
        emit('delete', data)
        // optional notifikasi sukses
        Swal.fire({ icon: 'success', title: 'Terhapus', timer: 1200, showConfirmButton: false })
    }
}

onMounted(async () => {
    if (props.campaignId) {
        await fetchPages()
    }
})
</script>
