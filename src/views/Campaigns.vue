<template>
    <AdminLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

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
                <CampaignTable />
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
                        Campaign Title
                        </label>
                        <input
                        v-model="campaignTitle"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>

                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Email Template
                            </label>
                            <select
                            v-model="emailTemplate"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                            >
                                <option disabled value="">Select Email Template</option>
                                <option v-for="template in emailTemplates" :key="template.id" :value="template.name">
                                    {{ template.name }}
                                </option>
                            </select>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Landing Page
                            </label>
                            <select
                            v-model="landingPage"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                            >
                            <option disabled value="">Select Landing Page</option>
                            <option v-for="page in landingPages" :key="page.id" :value="page.name">
                                {{ page.name }}
                            </option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        URL
                        </label>
                        <input
                        v-model="url"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Enter Start Date
                            </label>
                            <input
                            v-model="eventStartDate"
                            type="date"
                            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>

                        <div class="w-full sm:w-1/2">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Enter End Date
                            </label>
                            <input
                            v-model="eventEndDate"
                            type="date"
                            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Sending Profile
                            </label>
                            <div class="flex gap-2">
                                <select
                                v-model="sendingProfile"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                >
                                    <option disabled value="">Select Profile</option>
                                    <option v-for="template in emailTemplates" :key="template.id" :value="template.name">
                                        {{ template.name }}
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
                        Groups
                        </label>
                        <select
                        v-model="group"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        >
                            <option disabled value="">Select Group</option>
                            <option v-for="template in emailTemplates" :key="template.id" :value="template.name">
                                {{ template.name }}
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
                        @click="handleDeleteEvent"
                        class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto"
                    >
                        Delete Event
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
    const eventStartDate = ref('')
    const eventEndDate = ref('')
    const eventLevel = ref('')
    const events = ref([])
    const emailTemplate = ref('')
    const landingPage = ref('')

    const calendarsEvents = reactive({
        Danger: 'danger',
        Success: 'success',
        Primary: 'primary',
        Warning: 'warning',
    })

    // Dummy data, ganti dengan data asli jika ada
    const emailTemplates = ref([
    { id: 1, name: 'Welcome Email' },
    { id: 2, name: 'Phishing Alert' },
    { id: 3, name: 'Security Update' },
    ])
    const landingPages = ref([
    { id: 1, name: 'Login Page' },
    { id: 2, name: 'Survey Page' },
    { id: 3, name: 'Download Page' },
    ])

    onMounted(() => {
    events.value = [
        {
        id: '1',
        title: 'Event Conf.',
        start: new Date().toISOString().split('T')[0],
        extendedProps: { calendar: 'Danger' },
        },
        {
        id: '2',
        title: 'Meeting',
        start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        extendedProps: { calendar: 'Success' },
        },
        {
        id: '3',
        title: 'Workshop',
        start: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        end: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        extendedProps: { calendar: 'Primary' },
        },
    ]
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
    resetModalFields()
    }

    const resetModalFields = () => {
    eventTitle.value = ''
    eventStartDate.value = ''
    eventEndDate.value = ''
    eventLevel.value = ''
    selectedEvent.value = null
    }

    const handleDateSelect = (selectInfo) => {
    resetModalFields()
    eventStartDate.value = selectInfo.startStr
    eventEndDate.value = selectInfo.endStr || selectInfo.startStr
    openModal()
    }

    const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    selectedEvent.value = event
    eventTitle.value = event.title
    eventStartDate.value = event.start?.toISOString().split('T')[0] || ''
    eventEndDate.value = event.end?.toISOString().split('T')[0] || ''
    eventLevel.value = event.extendedProps.calendar
    openModal()
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
</script>
