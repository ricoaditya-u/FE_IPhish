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
                    class="no-scrollbar relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
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
                                rows="4"
                                class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            ></textarea>
                        </div>
                        <!-- Checkbox capture_credentials -->
                        <div>
                            <label
                            for="capture_credentials"
                            class="mt-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
                            >
                                <div class="relative">
                                    <input type="checkbox" id="capture_credentials" v-model="capture_credentials" class="sr-only" />
                                    <div
                                    :class="
                                        capture_credentials
                                        ? 'border-brand-500 bg-brand-500'
                                        : 'bg-transparent border-gray-300 dark:border-gray-700'
                                    "
                                    class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                                    >
                                    <span :class="capture_credentials ? '' : 'opacity-0'">
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
                        <!-- <AlertTips class="mt-3"
                        variant="info"
                        title="Tips"
                        message="If the landing page contains a form, submitted input (except passwords) will be captured."
                        :showLink="false" /> -->
                        <!-- ...existing code... -->
                        <!-- Checkbox capture_passwords -->
                        <div v-if="selectedEvent">
                            <label
                            for="capture_passwords"
                            class="mt-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
                            >
                                <div class="relative">
                                    <input type="checkbox" id="capture_passwords" v-model="capture_passwords" class="sr-only" />
                                    <div
                                    :class="
                                        capture_passwords
                                        ? 'border-brand-500 bg-brand-500'
                                        : 'bg-transparent border-gray-300 dark:border-gray-700'
                                    "
                                    class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                                    >
                                    <span :class="capture_passwords ? '' : 'opacity-0'">
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
                            Capture Passwords
                            </label>
                        </div>
                        <AlertTips class="mt-3" v-if="selectedEvent"
                        variant="warning"
                        title="Warning"
                        message="Credentials are currently not encrypted. This means that captured passwords are stored in the database as cleartext. Be careful with this!"
                        :showLink="false" />
                        <!-- ...existing code... -->
                        <div v-if="selectedEvent" class="mt-6">
                            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Redirect To
                            </label>
                            <input
                            v-model="redirect_url"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                            <AlertTips class="mt-3"
                            variant="info"
                            title="Info"
                            message="This options lets you redirect users to a specific URL after credentials are submitted."
                            :showLink="false" />
                        </div>
                        <TipsAI class="mt-3"
                            v-model="generateAI"
                            variant="success"
                            title="Gunakan AI untuk membuat landing page anda secara otomatis"
                            message="Bingung mau buat landing page apa? Gunakan fitur AI untuk membuat landing page secara otomatis."
                        :showLink="false" />
                        <div class="mt-4 flex flex-col gap-4 sm:flex-row" v-if="generateAI">
                            <div class="w-full">
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Instruksi ke AI / Prompt AI
                                </label>
                                <div class="flex gap-2">
                                    <input
                                    v-model="promptAI"
                                    placeholder="Instruksi khusus untuk AI. Contoh: Buat template landing page  yang menekankan urgensi update password."
                                    type="text"
                                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                    <button
                                        @click="postModelArk"
                                        :disabled="isGenerating"
                                        :class="[
                                            'btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-small text-white hover:bg-brand-600 sm:w-50',
                                            isGenerating ? 'opacity-60 cursor-not-allowed hover:bg-brand-500' : ''
                                        ]"
                                    >
                                        <span v-if="!isGenerating">Generate AI</span>
                                        <span v-else class="flex items-center">
                                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                            Generating...
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
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
import AlertTips from '../components/ui/AlertTips.vue'
import TipsAI from '../components/ui/TipsAI.vue'
import TextArea from "@/components/forms/FormElements/TextArea.vue";

// Reactive Variables
const isOpen = ref(false)
const selectedEvent = ref(null)
const datas = ref([])
const id = ref(null)

// Form Data
const pageName = ref('')
const landingPage = ref('')
const redirect_url = ref('')
const capture_credentials = ref(false)
const capture_passwords = ref(false)
const promptAI = ref('')
const generateAI = ref(false)

// Messages
const errorMessage = ref(null)
const feedbackMessage = ref('')

// Loading state
const isGenerating = ref(false)

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
    resetModalFields()
}

const resetModalFields = () => {
    selectedEvent.value = null
    pageName.value = null
    landingPage.value = null
}

const editData = (data) => {
    selectedEvent.value = data
    pageName.value = data.name
    landingPage.value = data.html
    isOpen.value = true
}

const fetchPages = async () => {
    try {
        const token = keycloak.token
        const response = await axios.get('/api/phishing/pages/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

const handleAddOrUpdateEvent = () => {
    if (selectedEvent.value) {
        // Update existing event
        editPage(selectedEvent.value)
    } else {
        // Add new event
        savePage()
    }
    closeModal()
}

const savePage = async () => {
    try {
        const token = keycloak.token
        const body = {
            id: id.value,
            name: pageName.value,
            html: landingPage.value,
            capture_credentials: capture_credentials.value,
            capture_passwords: capture_passwords.value,
            redirect_url: "http://example.com",
            modified_date: new Date().toISOString(),
        }
        await axios.post('/api/phishing/pages/', body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        // Tambahkan notifikasi sukses atau refresh data di sini
        feedbackMessage.value = 'Data saved successfully'
        await fetchPages()
    } catch (error) {
        errorMessage.value = 'Failed to save landing page'
        console.error(error)
    }
}

const editPage = async (data) => {
    try {
        const token = keycloak.token
        const body = {
            id: data.id,
            name: pageName.value,
            html: landingPage.value,
            capture_credentials:data.capture_credentials,
            capture_passwords: data.capture_passwords,
            redirect_url: data.redirect_url,
            modified_date: new Date().toISOString(),
        }
        await axios.put(`/api/phishing/pages/${data.id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        // Tambahkan notifikasi sukses atau refresh data di sini
        feedbackMessage.value = 'Data edited successfully'
        await fetchPages()
    } catch (error) {
        errorMessage.value = 'Failed to edit landing page'
        console.error(error)
    }
}

onMounted(() => {
    fetchPages()
})

const handleDeleteEvent = async (data) => {
    try {
        const token = keycloak.token
        await axios.delete(`/api/phishing/pages/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        feedbackMessage.value = 'Data deleted successfully'
        await fetchPages()
    } catch (error) {
        feedbackMessage.value = 'Failed to delete data'
        console.error(error)
    }
}

const postModelArk = async () => {
    if (!promptAI.value) {
        errorMessage.value = 'Please provide a prompt for AI generation.'
        return
    }
    errorMessage.value = null
    isGenerating.value = true
    try {
        const token = import.meta.env.VITE_API_KEY_MODELARK
        const response = await axios.post('/ark-api/api/v3/chat/completions', 
        {
            model: "seed-1-6-flash-250715",
            messages: [
                {
                    role: "user",
                    content: promptAI.value + " (respon langsung code saja tanpa intro dan closing statement apapun)."
                }
            ]
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const content = response?.data?.choices?.[0]?.message?.content || ''
        landingPage.value = typeof content === 'string' ? content.trim() : ''
        errorMessage.value = null
    } catch (error) {
        errorMessage.value = 'Failed to generate landing page using AI.'
        console.error(error)
    } finally {
        isGenerating.value = false
    }
}
</script>
