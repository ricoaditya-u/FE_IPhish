<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

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
                <EmailTemplatesTable @edit="editGroup" @delete="deleteGroup" />
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
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Template Name 
                        </label>
                        <input
                        v-model="templateName"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-150">
                            <div class="flex gap-2">
                                <button
                                    @click="openModal2"
                                    class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-small text-white hover:bg-brand-600 sm:w-50"
                                >
                                    <MailIcon /> Import Email
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Envelope Sender 
                        </label>
                        <input
                        v-model="envelopeSender"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" placeholder="test@example.com"
                        />
                    </div>
                    <div>
                        <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Subject
                        </label>
                        <input
                        v-model="subject"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" placeholder="email subject"
                        />
                    </div>
                    <div>
                        <label class="mt-6 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Template
                        </label>
                        <textarea
                            v-model="normalDescription"
                            placeholder="Text or HTML..."
                            rows="6"
                            class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        ></textarea>
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
                    <button
                        v-if="selectedEvent"
                        @click="handleDeleteEvent"
                        class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto"
                    >
                        Delete Event
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
import Button from '@/components/ui/Button.vue'

const currentPageTitle = ref('Email Templates')
import { ref } from 'vue'
import TextArea from "@/components/forms/FormElements/TextArea.vue";

const isOpen = ref(false)
const selectedEvent = ref(null)
const eventTitle = ref('')
const eventLevel = ref('')
const events = ref([])

// Tambahkan ref untuk input member
const groupName = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const position = ref('')
const groups = ref([])
const errorMessage = ref('')

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
        const newEvent = {
        id: Date.now().toString(),
        title: eventTitle.value,
        start: eventStartDate.value,
        end: eventEndDate.value,
        allDay: true,
        extendedProps: { calendar: eventLevel.value },
        }
        events.value.push(newEvent)
    }
    closeModal()
    }

    const handleDeleteEvent = () => {
        if (selectedEvent.value) {
            events.value = events.value.filter((event) => event.id !== selectedEvent.value.id)
            closeModal()
        }
    }

// Fungsi untuk menambah member ke tabel modal
function addMember() {
    errorMessage.value = '' // Reset error message
    if (!firstName.value || !lastName.value || !email.value || !position.value) {
        errorMessage.value = 'Please fill all fields!'
        return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Please enter a valid email address!'
        return;
    }
    
    groups.value.push({
        id: Date.now(),
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        position: position.value,
    });

    // Reset input setelah tambah
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    position.value = '';
}

function editGroup(group) {
    selectedEvent.value = group
    groupName.value = group.name
    // ...set other fields if needed...
    openModal()
}

function deleteGroup(id) {
    groups.value = groups.value.filter(g => g.id !== id)
}
</script>
