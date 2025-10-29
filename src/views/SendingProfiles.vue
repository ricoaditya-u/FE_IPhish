<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div v-if="feedbackMessage" class="mb-4 mt-4">
            <div class="rounded bg-success-100 text-black-700 px-4 py-2 text-sm">
                {{ feedbackMessage }}
            </div>
        </div>
        <!-- Tombol Add Event di atas kalender -->
        <div class="flex justify mb-4 mt-6">
            <button
                @click="openModal"
                class="px-5 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition"
            >
                + New Profile
            </button>
        </div>

        <div class="col-span-12 mb-8">
            <transition name="fade" mode="out-in">
                <SendingProfilesTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
            </transition>
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
                {{ selectedEvent ? 'Edit Sending Profile' : 'New Sending Profile' }}
                </h5>

                <div class="mt-8">
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Profile Name
                        </label>
                        <input
                        v-model="profileName"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Interface Type
                            </label>
                            <input
                            v-model="interfaceType"
                            type="text"
                            placeholder="SMTP"
                            disabled
                            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            SMTP From
                            </label>
                            <input
                            v-model="SMTPFrom"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div class="mt-6">
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Host
                        </label>
                        <input
                        v-model="host"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Username
                            </label>
                            <input
                            v-model="username"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Password
                            </label>
                            <input
                            v-model="password"
                            type="password"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
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
                        Ignore Certificate Errors
                        </label>
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-150">
                            <div class="flex gap-2">
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
                </div>
                <!-- ...existing code... -->
                <div v-if="errorMessage" class="mb-4 mt-4">
                    <div class="rounded bg-error-100 text-error-700 px-4 py-2 text-sm">
                        {{ errorMessage }}
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
                        {{ selectedEvent ? 'Update Profile' : 'Save Profile' }}
                    </button>
                    <!-- <button
                        v-if="selectedEvent"
                        @click="handleDeleteEvent"
                        class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto"
                    >
                        Delete Event
                    </button> -->
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

const currentPageTitle = ref('Sending Profiles')
import { ref, reactive, onMounted } from 'vue'
import Modal from '@/components/profile/Modal.vue'
import SendingProfilesTable from '../components/sendingprofiles/SendingProfilesTable.vue'

const checkboxOne = ref(false)
const selectedEvent = ref(null)

const isOpen = ref(false)
const isOpen2 = ref(false)
const id = ref(null)
const profileName = ref('')
const interfaceType = ref('')
const SMTPFrom = ref('')
const host = ref('')
const username = ref('')
const password = ref('')
const xCustomHeader = ref('')
const datas = ref([])
const errorMessage = ref('')
const feedbackMessage = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const position = ref('')

onMounted(() => {
    getAllSendingProfiles()
})

const openModal = () => {
    isOpen.value = true
}

const openModal2 = () => {
    isOpen2.value = true
}

const closeModal = () => {
    isOpen.value = false
    resetModalFields()
}

const closeModal2 = () => {
    isOpen2.value = false
    resetModalFields2()
}

const resetModalFields = () => {
    profileName.value = ''
    interfaceType.value = ''
    SMTPFrom.value = ''
    host.value = ''
    username.value = ''
    password.value = ''
    checkboxOne.value = false
    xCustomHeader.value = ''
}

const resetModalFields2 = () => {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    position.value = ''
}

const editData = async (data) => {
    selectedEvent.value = data
    profileName.value = data.name
    interfaceType.value = "SMTP"
    SMTPFrom.value = data.from_address
    host.value = data.host
    username.value = data.username
    password.value = data.password
    isOpen.value = true
}

const handleAddOrUpdateEvent = () => {
    if (selectedEvent.value) {
        // Update existing event
        updateSendingProfile()
    } else {
        // Add new event
        saveSendingProfile()
    }
    closeModal()
}

const handleDeleteEvent = async (data) => {
    try {
        await deleteGroupById(data.id)
        closeModal()
    } catch (error) {
        console.error('Failed to delete group', error)
    }
}

const testSendEmail = () => {
    sendTestEmail()
    closeModal2()
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

const getAllSendingProfiles = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get('http://admin.gophish.local:3333/api/smtp/', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch SMTP profile', error)
    }
}

const getSendingProfileById = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`http://admin.gophish.local:3333/api/smtp/${id.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Failed to fetch SMTP profile by ID', error)
        return null
    }
}

const saveSendingProfile = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            name: profileName.value,
            interface_type: "SMTP",
            from_address: SMTPFrom.value,
            host: host.value,
            username: username.value,
            password: password.value,
            ignore_cert_errors: checkboxOne.value,
            modified_date: new Date().toISOString(),
            headers: [
                { key: 'X-Header', value: 'Foo Bar' }
            ]

        }

        const response = await axios.post('http://admin.gophish.local:3333/api/smtp/', body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        feedbackMessage.value = 'Create profile successfully'
        await getAllSendingProfiles() // Refresh the groups list
    } catch (error) {
        console.error('Failed to save SMTP profile', error)
        return null
    }
}

const updateSendingProfile = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: id.value,
            name: profileName.value,
            interface_type: interfaceType.value,
            from_address: SMTPFrom.value,
            host: host.value,
            username: username.value,
            password: password.value,
            ignore_cert_errors: checkboxOne.value,
            modified_date: new Date().toISOString(),
            headers: [
                { key: 'X-Header', value: xCustomHeader.value }
            ]
        }

        const response = await axios.put(`http://admin.gophish.local:3333/api/smtp/${id.value}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        feedbackMessage.value = 'Update profile successfully'
        await getAllSendingProfiles() // Refresh the groups list
    } catch (error) {
        console.error('Failed to update SMTP profile', error)
        return null
    }
}

const deleteGroupById = async (id) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        await axios.delete(`http://admin.gophish.local:3333/api/smtp/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        feedbackMessage.value = 'Delete group successfully'
        await getAllSendingProfiles() // Refresh the groups list
    } catch (error) {
        errorMessage.value = 'Failed to delete group'
        console.error('Failed to delete group:', error)
    }
}

const sendTestEmail = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            position: position.value,
            smtp:{
                from_address: SMTPFrom.value,
                host: host.value,
                username: username.value,
                password: password.value,
                ignore_cert_errors: checkboxOne.value,
                headers: [
                    { key: 'X-Header', value: xCustomHeader.value }
                ]
            }
        }
        const response = await axios.post('/util/send_test_email', body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Failed to send test email', error)
        return null
    }
}
</script>
