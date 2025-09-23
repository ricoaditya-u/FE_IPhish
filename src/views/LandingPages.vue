<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <!-- ...existing code... -->
        <div v-if="feedbackMessage" class="mb-4 mt-4">
            <div class="rounded bg-success-100 text-black-700 px-4 py-2 text-sm">
                {{ feedbackMessage }}
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 md:gap-6 mt-6">
            <div class="col-span-12">
                <button
                @click="openModal"
                class="px-5 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition"
            >
                + New Page
                </button>
            </div>
            <div class="col-span-12">
                <LandingPagesTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
            </div>
        </div>

        <!-- Modal -->
        <Modal v-if="isOpen" @close="closeModal = false">
            <template #body>
            <div
                class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
            >
                <h5
                class="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl"
                >
                {{ selectedEvent ? 'Edit Landing Page' : 'New Landing Page' }}
                </h5>

                <div class="mt-8">
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Page Name
                        </label>
                        <input
                        v-model="pageName"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div>
                        <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Landing Page
                        </label>
                        <textarea
                            v-model="landingPage"
                            placeholder="Please input the HTML..."
                            rows="6"
                            class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        ></textarea>
                    </div>
                    <!-- Default Checkbox -->
                    <div>
                        <label
                        for="checkboxLabelOne"
                        class="mt-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
                        >
                            <div class="relative">
                                <input type="checkbox" id="checkboxLabelOne" v-model="checkboxOne" class="sr-only" />
                                <div
                                :class="
                                    checkboxOne
                                    ? 'border-brand-500 bg-brand-500'
                                    : 'bg-transparent border-gray-300 dark:border-gray-700'
                                "
                                class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                                >
                                <span :class="checkboxOne ? '' : 'opacity-0'">
                                    <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                        stroke="white"
                                        stroke-width="1.94437"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    </svg>
                                </span>
                                </div>
                            </div>
                        Capture Submitted Data
                        </label>
                    </div>
                    <!-- ...existing code... -->
                    <div v-if="errorMessage" class="mb-4 mt-4">
                        <div class="rounded bg-error-100 text-error-700 px-4 py-2 text-sm">
                            {{ errorMessage }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                    <button
                        @click="closeModal"
                        class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                    >
                        Close
                    </button>

                    <button
                        @click="handleAddOrUpdateEvent"
                        class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                    >
                        Save Page
                    </button>
                </div>
            </div>
            </template>
        </Modal>
    </admin-layout>
</template>

<script setup>
import Swal from 'sweetalert2'
import AdminLayout from '../components/layout/AdminLayout.vue'
import LandingPagesTable from '../components/landingpage/LandingPageTable.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'
import axios from 'axios'

const currentPageTitle = ref('Landing Pages')
import { ref, onMounted } from 'vue'
import TextArea from "@/components/forms/FormElements/TextArea.vue";

const isOpen = ref(false)
const selectedEvent = ref(null)
const checkboxOne = ref(false)
const pageName = ref('')
const landingPage = ref('')
const feedbackMessage = ref('')
const datas = ref([])

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
    resetModalFields()
}

const resetModalFields = () => {
    eventTitle.value = ''
    eventLevel.value = ''
    selectedEvent.value = null
}

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('/api/pages/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

const savePage = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: selectedEvent.value?.id || Date.now(),
            name: pageName.value,
            html: landingPage.value,
            capture_credentials: true,
            capture_passwords: true,
            redirect_url: "http://example.com",
            modified_date: new Date().toISOString(),
        }
        await axios.post('/api/pages/', body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        // Tambahkan notifikasi sukses atau refresh data di sini
        feedbackMessage.value = 'Data saved successfully'
        await fetchPages()
    } catch (error) {
        errorMessage.value = 'Failed to save page'
        console.error(error)
    }
}

onMounted(() => {
    fetchPages()
})

const handleAddOrUpdateEvent = () => {
    if (selectedEvent.value) {
        // Update existing event
        events.value = events.value.map((event) =>
        event.id === selectedEvent.value.id
            ? {
                ...event,
                title: eventTitle.value,
                start: eventStartDate.value,
                end: eventEndDate.value,
                extendedProps: { calendar: eventLevel.value },
            }
            : event,
        )
    } else {
        // Add new event
        savePage()
    }
    closeModal()
}

const handleDeleteEvent = async (data) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        await axios.delete(`/api/pages/${data.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        feedbackMessage.value = 'Data deleted successfully'
        await fetchPages() // refresh data setelah delete
    } catch (error) {
        feedbackMessage.value = 'Failed to delete data'
        console.error(error)
    }
}
</script>
