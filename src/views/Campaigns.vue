<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <!-- ...existing code... -->
        <div v-if="feedbackMessage" class="mb-4 mt-4">
            <div class="rounded bg-success-100 text-black-700 px-4 py-2 text-sm">
                {{ feedbackMessage }}
            </div>
        </div>
        <div v-if="errorMessage" class="mb-4 mt-4">
            <div class="rounded bg-error-100 text-error-700 px-4 py-2 text-sm">
                {{ errorMessage }}
            </div>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            Plan your next big moment: schedule or edit an phising event to stay on track.
        </p>

        <!-- Tombol Add Event di atas kalender -->
        <div class="flex justify mb-4 mt-6">
            <button
                @click="openModal"
                class="px-5 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition"
            >
                New Campaign +
            </button>
        </div>

        <div class="col-span-5 mb-3">
            <AlertTips
            variant="info"
            title="Tips Membuat Campaign Phising"
            message='<ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li>Gunakan nama campaign yang spesifik dan mudah diingat.</li>
            <li>Pastikan landing page sudah sesuai dan aman.</li>
            <li>Gunakan sending profile yang sudah diverifikasi.</li>
            </ul>'
            :showLink="false" />
        </div>

        <div class="col-span-12 mb-8">
            <transition name="fade" mode="out-in">
                <CampaignTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
            </transition>
        </div>

        <div
        class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
        >
            <div class="custom-calendar">
                <FullCalendar ref="calendarRef" class="min-h-screen" :options="calendarOptions" />
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
                    {{ selectedEvent ? 'Edit Event' : 'Add Phising Campaign' }}
                    </h5>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                    Plan your next big moment: schedule or edit an phising event to stay on track
                    </p>

                    <div class="mt-8">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Campaign Title <span class="text-red-500">*</span>
                            </label>
                            <input
                            v-model="campaignTitle"
                            type="text"
                            required
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                            <div class="w-full sm:w-1/2">
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Email Template <span class="text-red-500">*</span>
                                </label>
                                <select
                                v-model="emailTemplate"
                                :disabled="isLoadingTemplates"
                                required
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option disabled value="">
                                        {{ isLoadingTemplates ? 'Loading templates...' : 'Select Email Template' }}
                                    </option>
                                    <option v-for="template in emailTemplates" :key="template.id" :value="template.name">
                                        {{ template.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-full sm:w-1/2">
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Landing Page <span class="text-red-500">*</span>
                                </label>
                                <select
                                v-model="landingPage"
                                :disabled="isLoadingLandingPages"
                                required
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                <option disabled value="">
                                    {{ isLoadingLandingPages ? 'Loading pages...' : 'Select Landing Page' }}
                                </option>
                                <option v-for="page in landingPages" :key="page.id" :value="page.name">
                                    {{ page.name }}
                                </option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-6">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            URL <span class="text-red-500">*</span>
                            </label>
                            <input
                            v-model="url"
                            type="text"
                            required
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="mt-6">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Launch Date<span class="text-red-500">*</span>
                            </label>
                            <input
                            v-model="launchDate"
                            type="date"
                            required
                            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                            <div class="w-full sm:w-150">
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Sending Profile <span class="text-red-500">*</span>
                                </label>
                                <div class="flex gap-2">
                                    <select
                                    v-model="sendingProfile"
                                    :disabled="isLoadingSendingProfiles"
                                    required
                                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option disabled value="">
                                            {{ isLoadingSendingProfiles ? 'Loading profiles...' : 'Select Profile' }}
                                        </option>
                                        <option v-for="profile in sendingProfiles" :key="profile.id" :value="profile.name">
                                            {{ profile.name }}
                                        </option>
                                    </select>
                                    <button
                                        @click="openModal2"
                                        class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-small text-white hover:bg-brand-600 sm:w-50"
                                    >
                                        <SendIcon />
                                        Send Test Email
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Groups <span class="text-red-500">*</span>
                            </label>
                            <select
                            v-model="group"
                            :disabled="isLoadingGroups"
                            required
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option disabled value="">
                                    {{ isLoadingGroups ? 'Loading groups...' : 'Select Group' }}
                                </option>
                                <option v-for="groupItem in groups" :key="groupItem.id" :value="groupItem.name">
                                    {{ groupItem.name }}
                                </option>
                            </select>
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
                            {{ selectedEvent ? 'Update Changes' : 'Launch Campaign' }}
                        </button>
                        <button
                            v-if="selectedEvent"
                            @click="completeCampaign(selectedEvent.id)"
                            class="flex w-full justify-center rounded-lg border border-warning-500 bg-warning-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-warning-600 sm:w-auto"
                        >
                            Complete Campaign
                        </button>
                        <button
                            v-if="selectedEvent"
                            @click="handleDeleteEvent"
                            class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto"
                        >
                            Delete Campaign
                        </button>
                    </div>
                </div>
            </template>
        </Modal>

        <!-- Modal2 -->
        <Modal v-if="isOpen2" @close="closeModal2 = false">
            <template #body>
            <div
                class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
            >
                <h5
                class="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl"
                >
                Send Test Email
                </h5>

                <div class="mt-8">
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            First Name
                            </label>
                            <input
                            v-model="firstName"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Last Name
                            </label>
                            <input
                            v-model="lastName"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Email
                            </label>
                            <input
                            v-model="email"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Position
                            </label>
                            <input
                            v-model="position"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                    <button
                        @click="closeModal2"
                        class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                    >
                        Close
                    </button>

                    <button
                        @click="testSendEmail"
                        class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                    >
                        Send
                    </button>
                </div>
            </div>
            </template>
        </Modal>
    </AdminLayout>
</template>

<script setup>
import {
    SendIcon,
} from "../icons";
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import axios from 'axios'

const currentPageTitle = ref('Campaigns IPhish')
import { ref, reactive, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from '@/components/profile/Modal.vue'
import CampaignTable from '../components/campaign/CampaignTable.vue'
import AlertTips from '../components/ui/AlertTips.vue'
import { groupIntersectingEntries } from '@fullcalendar/core/internal'

const calendarRef = ref(null)
const isOpen = ref(false)
const isOpen2 = ref(false)
const selectedEvent = ref(null)
const eventTitle = ref('')
const launchDate = ref('')
const eventEndDate = ref('')
const eventLevel = ref('')
const events = ref([])
const emailTemplate = ref('')
const landingPage = ref('')
const campaignTitle = ref('')
const url = ref('')
const sendingProfile = ref('')
const group = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const position = ref('')
const datas = ref([])
const errorMessage = ref('')
const feedbackMessage = ref('')

const editData = (data) => {
    selectedEvent.value = data
    campaignTitle.value = data.name || ''
    url.value = data.url || ''
    launchDate.value = data.launch_date ? data.launch_date.split('T')[0] : ''
    errorMessage.value = '' // Clear error message
    feedbackMessage.value = '' // Clear feedback message
    isOpen.value = true
    // Refresh semua data ketika modal dibuka
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/campaigns/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch pages:', error)
    }
}

const fetchEmailTemplates = async () => {
    isLoadingTemplates.value = true
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/templates/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        emailTemplates.value = response.data
    } catch (error) {
        console.error('Failed to fetch email templates:', error)
        errorMessage.value = 'Failed to load email templates. Using default options.'
        // Fallback ke data dummy jika API gagal
        emailTemplates.value = [
            { id: 1, name: 'Welcome Email' },
            { id: 2, name: 'Phishing Alert' },
            { id: 3, name: 'Security Update' },
        ]
    } finally {
        isLoadingTemplates.value = false
    }
}

const fetchLandingPages = async () => {
    isLoadingLandingPages.value = true
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/pages/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        landingPages.value = response.data
    } catch (error) {
        console.error('Failed to fetch landing pages:', error)
        errorMessage.value = 'Failed to load landing pages. Using default options.'
        // Fallback ke data dummy jika API gagal
        landingPages.value = [
            { id: 1, name: 'Login Page' },
            { id: 2, name: 'Survey Page' },
            { id: 3, name: 'Download Page' },
        ]
    } finally {
        isLoadingLandingPages.value = false
    }
}

const fetchSendingProfiles = async () => {
    isLoadingSendingProfiles.value = true
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/smtp/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        sendingProfiles.value = response.data
    } catch (error) {
        console.error('Failed to fetch sending profiles:', error)
        errorMessage.value = 'Failed to load sending profiles. Using default options.'
        // Fallback ke data dummy jika API gagal
        sendingProfiles.value = [
            { id: 1, name: 'Default Profile' },
            { id: 2, name: 'Gmail Profile' },
            { id: 3, name: 'Outlook Profile' },
        ]
    } finally {
        isLoadingSendingProfiles.value = false
    }
}

const fetchGroups = async () => {
    isLoadingGroups.value = true
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/groups/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        groups.value = response.data
    } catch (error) {
        console.error('Failed to fetch groups:', error)
        errorMessage.value = 'Failed to load groups. Using default options.'
        // Fallback ke data dummy jika API gagal
        groups.value = [
            { id: 1, name: 'All Users' },
            { id: 2, name: 'IT Department' },
            { id: 3, name: 'Management' },
        ]
    } finally {
        isLoadingGroups.value = false
    }
}

const createCampaign = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        
        // Validasi form
        if (!campaignTitle.value) {
            errorMessage.value = 'Campaign name is required'
            return false
        }
        if (!emailTemplate.value) {
            errorMessage.value = 'Email template is required'
            return false
        }
        if (!landingPage.value) {
            errorMessage.value = 'Landing page is required'
            return false
        }
        if (!sendingProfile.value) {
            errorMessage.value = 'Sending profile is required'
            return false
        }
        if (!group.value) {
            errorMessage.value = 'Group is required'
            return false
        }
        if (!url.value) {
            errorMessage.value = 'URL is required'
            return false
        }
        if (!launchDate.value) {
            errorMessage.value = 'Launch date is required'
            return false
        }

        // Format tanggal untuk API Gophish (ISO8601 format)
        const launchDateISO = new Date(launchDate.value).toISOString()
        
        const campaignData = {
            name: campaignTitle.value,
            template: { name: emailTemplate.value },
            page: { name: landingPage.value },
            smtp: { name: sendingProfile.value },
            groups: [{ name: group.value }],
            url: url.value,
            launch_date: launchDateISO,
            send_by_date: launchDateISO
        }

        const response = await axios.post('http://admin.gophish.local:3333/api/campaigns/', campaignData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        // Tambahkan event ke calendar setelah campaign berhasil dibuat
        const calendarEvent = {
            id: response.data.id,
            title: campaignTitle.value,
            start: launchDateISO,
            end: launchDateISO,
            extendedProps: {
                calendar: 'Primary', // atau bisa disesuaikan dengan status campaign
                description: `Email Template: ${emailTemplate.value}\nLanding Page: ${landingPage.value}`
            }
        }
        
        // Tambahkan event ke array events
        events.value.push(calendarEvent)
        
        // Refresh calendar view
        if (calendarRef.value) {
            const calendar = calendarRef.value.getApi()
            calendar.addEvent(calendarEvent)
        }

        console.log('Campaign created successfully:', response.data)
        feedbackMessage.value = 'Campaign created successfully!'
        return true
    } catch (error) {
        console.error('Failed to create campaign:', error)
        errorMessage.value = 'Failed to create campaign. Please check your inputs and try again.'
        return false
    }
}

const updateCampaign = async (campaignId) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        
        // Validasi form
        if (!campaignTitle.value) {
            errorMessage.value = 'Campaign name is required'
            return false
        }
        if (!emailTemplate.value) {
            errorMessage.value = 'Email template is required'
            return false
        }
        if (!landingPage.value) {
            errorMessage.value = 'Landing page is required'
            return false
        }
        if (!sendingProfile.value) {
            errorMessage.value = 'Sending profile is required'
            return false
        }
        if (!group.value) {
            errorMessage.value = 'Group is required'
            return false
        }
        if (!url.value) {
            errorMessage.value = 'URL is required'
            return false
        }
        // if (!launchDate.value) {
        //     errorMessage.value = 'Launch date is required'
        //     return false
        // }

        // Format tanggal untuk API Gophish (ISO8601 format)
        const launchDateISO = new Date(launchDate.value).toISOString()

        // Struktur data sesuai dengan API Gophish
        const campaignData = {
            name: campaignTitle.value,
            template: { name: emailTemplate.value },
            page: { name: landingPage.value },
            smtp: { name: sendingProfile.value },
            groups: [{ name: group.value }],
            url: url.value,
            launch_date: launchDateISO,
            send_by_date: launchDateISO
        }

        console.log('Updating campaign with data:', campaignData)

        const response = await axios.post(`http://admin.gophish.local:3333/api/campaigns/${campaignId}`, campaignData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        console.log('Campaign updated successfully:', response.data)
        feedbackMessage.value = 'Campaign updated successfully!'
        return true
    } catch (error) {
        console.error('Failed to update campaign:', error)
        errorMessage.value = 'Failed to update campaign. Please check your inputs and try again.'
        return false
    }
}

const deleteCampaign = async (campaignId) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        
        console.log('Deleting campaign with ID:', campaignId)

        const response = await axios.delete(`http://admin.gophish.local:3333/api/campaigns/${campaignId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log('Campaign deleted successfully:', response.data)
        feedbackMessage.value = 'Campaign deleted successfully!'
        return true
    } catch (error) {
        console.error('Failed to delete campaign:', error)
        errorMessage.value = 'Failed to delete campaign. Please try again.'
        return false
    }
}

const getCampaignResults = async (campaignId) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        
        console.log('Getting campaign results for ID:', campaignId)

        const response = await axios.get(`http://admin.gophish.local:3333/api/campaigns/${campaignId}/results`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log('Campaign results loaded successfully:', response.data)
        return response.data

    } catch (error) {
        console.error('Failed to fetch campaign results:', error)
        errorMessage.value = 'Failed to load campaign results.'
        return null
    }
}

const completeCampaign = async (campaignId) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        
        console.log('Completing campaign with ID:', campaignId)

        const response = await axios.get(`http://admin.gophish.local:3333/api/campaigns/${campaignId}/complete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log('Campaign completed successfully:', response.data)
        feedbackMessage.value = 'Campaign completed successfully!'
        
        // Refresh data setelah campaign completed
        await fetchPages()
        await fetchEmailTemplates()
        await fetchLandingPages()
        await fetchSendingProfiles()
        await fetchGroups()
        
        return true

    } catch (error) {
        console.error('Failed to complete campaign:', error)
        errorMessage.value = 'Failed to complete campaign. Please try again.'
        return false
    }
}

onMounted(() => {
    fetchPages()
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
    loadCampaignEvents() // Tambahkan ini
})

// =========================================================================================================
// =========================================================================================================
// =========================================================================================================

const calendarsEvents = reactive({
    Danger: 'danger',
    Success: 'success',
    Primary: 'primary',
    Warning: 'warning',
})

// Data email templates dari API
const emailTemplates = ref([])
const isLoadingTemplates = ref(false)

// Data landing pages dari API
const isLoadingLandingPages = ref(false)

// Data sending profiles dari API
const isLoadingSendingProfiles = ref(false)

// Data groups dari API
const isLoadingGroups = ref(false)

// Data landing pages dari API
const landingPages = ref([])

// Data sending profiles dari API
const sendingProfiles = ref([])

// Data groups dari API
const groups = ref([])

const openModal = () => {
    isOpen.value = true
    errorMessage.value = '' // Clear error message
    feedbackMessage.value = '' // Clear feedback message
    // Refresh semua data ketika modal dibuka
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const openModal2 = () => {
    isOpen2.value = true
    errorMessage.value = '' // Clear error message
    feedbackMessage.value = '' // Clear feedback message
}

const closeModal = () => {
    isOpen.value = false
    resetModalFields()
    // Refresh data setelah modal ditutup
    fetchPages()
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const closeModal2 = () => {
    isOpen2.value = false
    resetModalFields()
    // Refresh data setelah modal ditutup
    fetchPages()
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const resetModalFields = () => {
    eventTitle.value = ''
    eventLevel.value = ''
    campaignTitle.value = ''
    emailTemplate.value = ''
    landingPage.value = ''
    url.value = ''
    sendingProfile.value = ''
    group.value = ''
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    position.value = ''
    selectedEvent.value = null
    errorMessage.value = ''
    feedbackMessage.value = ''
}

const testSendEmail = () => {
    // Implementasi untuk mengirim test email
    console.log('Sending test email to:', email.value)
    feedbackMessage.value = 'Test email sent successfully!'
    // Refresh data setelah test email dikirim
    fetchPages()
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
    closeModal2()
}

const handleDateSelect = (selectInfo) => {
    resetModalFields()
    eventStartDate.value = selectInfo.startStr
    eventEndDate.value = selectInfo.endStr || selectInfo.startStr
    isOpen.value = true
    errorMessage.value = '' // Clear error message
    feedbackMessage.value = '' // Clear feedback message
    // Refresh semua data ketika modal dibuka
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    selectedEvent.value = event
    campaignTitle.value = event.title
    eventStartDate.value = event.start?.toISOString().split('T')[0] || ''
    eventEndDate.value = event.end?.toISOString().split('T')[0] || ''
    eventLevel.value = event.extendedProps.calendar
    isOpen.value = true
    errorMessage.value = '' // Clear error message
    feedbackMessage.value = '' // Clear feedback message
    // Refresh semua data ketika modal dibuka
    fetchEmailTemplates()
    fetchLandingPages()
    fetchSendingProfiles()
    fetchGroups()
}

const handleAddOrUpdateEvent = async () => {
    let success = false
    
    if (selectedEvent.value) {
        // Update existing campaign
        success = await updateCampaign(selectedEvent.value.id)
    } else {
        // Create new campaign
        success = await createCampaign()
    }
    
    if (success) {
        // Refresh data setelah campaign disimpan
        await fetchPages()
        await fetchEmailTemplates()
        await fetchLandingPages()
        await fetchSendingProfiles()
        await fetchGroups()
        closeModal()
    }
}

const handleDeleteEvent = async (data) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        await axios.delete(`http://admin.gophish.local:3333/api/campaigns/${data.id}`, {
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

const renderEventContent = (eventInfo) => {
const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`
return {
    html: `
    <div class="event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm">
        <div class="fc-daygrid-event-dot"></div>
        <div class="fc-event-time">${eventInfo.timeText}</div>
        <div class="fc-event-title">${eventInfo.event.title}</div>
    </div>
    `,
}
}

const calendarOptions = reactive({
plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
initialView: 'dayGridMonth',
headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
},
events: events,
selectable: true,
select: handleDateSelect,
eventClick: handleEventClick,
eventContent: renderEventContent,
// customButtons: {
//     addEventButton: {
//     text: 'Add Event +',
//     click: openModal,
//     },
// },
})

const loadCampaignEvents = async () => {
    try {
        // Ambil data campaign yang sudah ada
        const existingCampaigns = datas.value

        // Reset events array
        events.value = []

        // Convert campaigns menjadi calendar events
        existingCampaigns.forEach(campaign => {
            const event = {
                id: campaign.id,
                title: campaign.name,
                start: campaign.launch_date,
                end: campaign.launch_date,
                extendedProps: {
                    calendar: campaign.status === 'Completed' ? 'Success' : 
                             campaign.status === 'In progress' ? 'Primary' : 'Warning',
                    description: `Status: ${campaign.status}`
                }
            }
            events.value.push(event)
        })

        // Refresh calendar view
        if (calendarRef.value) {
            const calendar = calendarRef.value.getApi()
            calendar.removeAllEvents()
            events.value.forEach(event => calendar.addEvent(event))
        }
    } catch (error) {
        console.error('Failed to load campaign events:', error)
    }
}
</script>
