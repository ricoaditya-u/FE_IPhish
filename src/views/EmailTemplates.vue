<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

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
                + New Template
                </button>
            </div>
            <div class="col-span-12">
                <EmailTemplatesTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
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
                    {{ selectedEvent ? 'Edit Email Template' : 'New Email Template' }}
                    </h5>

                    <div class="mt-8">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Template Name 
                            </label>
                            <input
                            v-model="templateName"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="flex flex-col gap-4 sm:flex-row">
                            <div class="w-full sm:w-1/2">
                                <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Envelope Sender 
                                </label>
                                <input
                                v-model="envelopeSender"
                                type="text"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" placeholder="test@example.com"
                                />
                            </div>
                            <div class="w-full sm:w-1/2">
                                <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Subject
                                </label>
                                <input
                                v-model="subject"
                                type="text"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" placeholder="email subject"
                                />
                            </div>
                        </div>
                        <TipsTextTemplate class="mt-3"
                            v-model="textTemplate"
                            variant="error"
                            title="Masukan template Text secara manual"
                            message="Masukan template (text) email yang anda pilih secara manual."
                        :showLink="false" />
                        <div v-if="textTemplate">
                            <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Text
                            </label>
                            <textarea
                                v-model="emailTextTemplate"
                                placeholder="Text..."
                                rows="6"
                                class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            ></textarea>
                        </div>
                        <TipsHtmlTemplate class="mt-3"
                            v-model="htmlTemplate"
                            variant="warning"
                            title="Masukan template HTML secara manual"
                            message="Masukan kode html template email yang anda pilih secara manual."
                        :showLink="false" />
                        <div v-if="htmlTemplate">
                            <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            HTML
                            </label>
                            <textarea
                                v-model="emailHtmlTemplate"
                                placeholder="HTML..."
                                rows="6"
                                class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            ></textarea>
                        </div>
                        <TipsAI class="mt-3"
                            v-model="generateAI"
                            variant="success"
                            title="Gunakan AI untuk membuat email template anda secara otomatis"
                            message="Bingung mau buat email template seperti apa? Gunakan fitur AI untuk membuat email template secara otomatis."
                        :showLink="false" />
                        <div class="mt-4 flex flex-col gap-4 sm:flex-row" v-if="generateAI">
                            <div class="w-full">
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Prompt ke AI
                                </label>
                                <div class="flex gap-2">
                                    <input
                                    v-model="promptAI"
                                    placeholder="Contoh: Buat email template yang menekankan urgensi update password."
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
                            Save Template
                        </button>
                    </div>
                </div>
            </template>
        </Modal>
    </admin-layout>
</template>

<script setup>
import {
        MailIcon,
    } from "../icons";
import AdminLayout from '../components/layout/AdminLayout.vue'
import EmailTemplatesTable from '../components/emailtemplates/EmailTemplatesTable.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'
import TipsAI from '../components/ui/TipsAI.vue'
import TipsHtmlTemplate from "@/components/ui/TipsHtmlTemplate.vue";
import TipsTextTemplate from "@/components/ui/TipsTextTemplate.vue";
import axios from 'axios'

const currentPageTitle = ref('Email Templates')
const generateAI = ref(false)
const htmlTemplate = ref(false)
const textTemplate = ref(false)
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const selectedEvent = ref(null)
const datas = ref([]) // Data untuk tabel email templates

const feedbackMessage = ref('')

// Tambahkan ref untuk input member
const templateName = ref('')
const subject = ref('')
const envelopeSender = ref('')
const id = ref(null)
const errorMessage = ref('')
const promptAI = ref('')
const emailHtmlTemplate = ref('')
const emailTextTemplate = ref('')
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
    templateName.value = null
    envelopeSender.value = null
    subject.value = null
    emailTextTemplate.value = null
    emailHtmlTemplate.value = null
}

const editData = (data) => {
    selectedEvent.value = data
    templateName.value = data.name
    envelopeSender.value = data.envelope_sender
    subject.value = data.subject
    emailTextTemplate.value = data.text
    emailHtmlTemplate.value = data.html
    isOpen.value = true
}

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/templates/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

onMounted(() => {
    fetchPages()
})

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
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: id.value,
            name: templateName.value,
            envelope_sender: envelopeSender.value,
            subject: subject.value,
            text: emailTextTemplate.value ?? " ",
            html: emailHtmlTemplate.value ?? " ",
            modified_date: new Date().toISOString(),
            attachments: [],
        }
        await axios.post(`${import.meta.env.VITE_SERVICE_API_URL}/api/templates/`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        // Tambahkan notifikasi sukses atau refresh data di sini
        feedbackMessage.value = 'Data saved successfully'
        await fetchPages()
    } catch (error) {
        errorMessage.value = 'Failed to save email template.'
        console.error(error)
    }
}

const editPage = async (data) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: data.id,
            name: templateName.value,
            envelope_sender: envelopeSender.value,
            subject: subject.value,
            text: emailTextTemplate.value,
            html: emailHtmlTemplate.value,
            modified_date: new Date().toISOString(),
            attachments: [],
        }
        await axios.put(`${import.meta.env.VITE_SERVICE_API_URL}/api/templates/${data.id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        // Tambahkan notifikasi sukses atau refresh data di sini
        feedbackMessage.value = 'Data edited successfully'
        await fetchPages()
    } catch (error) {
        errorMessage.value = 'Failed to edit email template.'
        console.error(error)
    }
}

const handleDeleteEvent = async (data) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        await axios.delete(`${import.meta.env.VITE_SERVICE_API_URL}/api/templates/${data.id}`, {
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
        emailHtmlTemplate.value = typeof content === 'string' ? content.trim() : ''
        errorMessage.value = null
    } catch (error) {
        errorMessage.value = 'Failed to generate email template using AI.'
        console.error(error)
    } finally {
        isGenerating.value = false
    }
}
</script>
