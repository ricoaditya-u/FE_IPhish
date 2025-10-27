<template>
    <LoadingWheel v-if="isLoading" />
    <admin-layout>
        <div class="grid grid-cols-12 gap-4 md:gap-6">
            <div class="col-span-12">
                <h1 class="text-lg font-semibold text-gray-800 dark:text-white/90">Result of "{{ data.name }}"</h1>
            </div>
            <div class="col-span-12">
                <button
                @click="confirmCompleteCampaign(data.id)"
                :disabled="data.status === 'Completed'"
                :class="[
                    'px-6 py-2 rounded-lg font-medium transition',
                    data.status === 'Completed'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-500 text-white hover:bg-brand-600'
                ]"
            >
                    {{ data.status === 'Completed' ? 'Completed' : 'Complete' }}
                </button>
            </div>
            <div class="col-span-12" v-if="flagCompleted">
                <BreachAwarenessMetrics :reportCampaign="reportCampaign" />
            </div>
            <div class="col-span-12" v-if="flagCompleted">
                <ReportCampaign :reportCampaign="reportCampaign"/>
            </div>
            <div class="col-span-12">
                <ecommerce-metrics :summary="summary" />
            </div>
            <div class="col-span-12">
                <DetailCampaignTable :campaignId="campaignId" />
            </div>
        </div>
    </admin-layout>
</template>

<script setup>
import Swal from 'sweetalert2'
import LoadingWheel from '../components/common/LoadingWheel.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import BreachAwarenessMetrics from '../components/ecommerce/BreachAwarenessMetrics.vue'
import DetailCampaignTable from '../components/campaign/DetailCampaignTable.vue'
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ReportCampaign from '@/components/campaign/ReportCampaign.vue'

const data = ref({})
const flagCompleted = ref(false)
const reportCampaign = ref(null)
const detailCampaign = ref({})
const summary = ref(null)
const errorMessage = ref('')
const route = useRoute()
const campaignId = route.params.id
const isLoading = ref(true)

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`/api/campaigns/${campaignId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        data.value = response.data
        return response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

const getCampaignSummary = async (campaignId) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN

        const response = await axios.get(`/api/campaigns/${campaignId}/summary`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    } catch (error) {
        console.error('Failed to fetch campaign summary:', error)
        errorMessage.value = 'Failed to load campaign summary.'
        return null
    }
}

const getReportCampaign = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN

        if (!summary.value?.stats) {
            console.error('Summary data not available')
            return null
        }
        
        const campaignData = {
            "id_user": 1,
            "id_campaign": parseInt(campaignId),
            "name": summary.value.name,
            "opened": summary.value.stats.opened,
            "sent": summary.value.stats.sent,
            "clicked": summary.value.stats.clicked,
            "submitted_data": summary.value.stats.submitted_data,
            "email_reported": summary.value.stats.email_reported
        }

        const response = await axios.post('/gateway-api/campaigns/report', campaignData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log('Report campaign data:', response.data.data)
        return response.data
    } catch (error) {
        console.error('Failed to fetch campaign report:', error)
        errorMessage.value = 'Failed to load campaign report.'
        return null
    }
}

async function confirmCompleteCampaign(data) {
    const result = await Swal.fire({
        title: 'Are you sure to complete this campaign?',
        // text: 'Data ini akan hilang permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6b7280',
        reverseButtons: true,
    })

    if (result.isConfirmed) {
        try {
            const token = import.meta.env.VITE_API_TOKEN
            
            console.log('Completing campaign for ID:', campaignId)

            const response = await axios.get(`/api/campaigns/${campaignId}/complete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            console.log('Campaign completed successfully:', response.data)
            // Refresh campaign data to update status
            await fetchPages()
        } catch (error) {
            console.error('Failed to complete campaign:', error)
            errorMessage.value = 'Failed to complete campaign.'
        }
        // optional notifikasi sukses
        Swal.fire({ icon: 'success', title: 'Completed', timer: 1200, showConfirmButton: false })
    }
}

onMounted(async () => {
    try {
        isLoading.value = true
        data.value = await fetchPages()
        summary.value = await getCampaignSummary(campaignId)
        if (data.value.status === 'Completed') {
            reportCampaign.value = await getReportCampaign()
            flagCompleted.value = true
        }

        // Tunggu data terload dulu
        await nextTick()
    } catch (error) {
        console.error('Error in mounting:', error)
    } finally {
        isLoading.value = false
    }
})
</script>
