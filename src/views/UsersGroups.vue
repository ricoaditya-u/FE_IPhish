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
                + New Group
                </button>
            </div>
            <div class="col-span-12">
                <UsersAndGroupsTable :datas="datas" @edit="editData" @delete="handleDeleteEvent" />
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
                {{ selectedEvent ? 'Edit Group' : 'New Group' }}
                </h5>

                <div class="mt-8">
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Group Name
                        </label>
                        <input
                        v-model="groupName"
                        type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-150">
                            <div class="flex gap-2">
                                <button
                                    @click="triggerFileUpload"
                                    :disabled="loading"
                                    class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-small text-white hover:bg-brand-600 sm:w-50">
                                    <span v-if="!loading">+ Bulk Import Users</span>
                                    <span v-else>Uploading...</span>
                                </button>
                                <!-- Input file tersembunyi -->
                                <input
                                type="file"
                                ref="fileInput"
                                class="hidden"
                                @change="handleFileUpload"
                                accept=".csv"/>
                                <a href="" class="dark:text-white text-sm mt-3 ml-6">Download CSV Template</a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            First Name
                            </label>
                            <input
                            v-model="first_name"
                            type="text"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                        </div>
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Last Name
                            </label>
                            <input
                                v-model="last_name"
                                type="text"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                        </div>
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Email
                            </label>
                            <input
                                v-model="email"
                                type="text"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                        </div>
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Position
                            </label>
                            <input
                                v-model="position"
                                type="text"
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                        </div>
                        <div class="w-full sm:w-150">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Action
                            </label>
                            <button
                                @click="addMember"
                                class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-small text-white hover:bg-brand-600 sm:w-20"
                            >
                                + Add
                            </button>
                        </div>
                    </div>
                    <!-- ...existing code... -->
                    <div v-if="errorMessage" class="mb-4 mt-4">
                        <div class="rounded bg-error-100 text-error-700 px-4 py-2 text-sm">
                            {{ errorMessage }}
                        </div>
                    </div>
                    <!-- ...existing code... -->
                    <div class="col-span-12 mt-6">
                        <!-- DataTable Users & Groups -->
                        <div class="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">First Name</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Name</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="group in groups" :key="group.id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ group.first_name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ group.last_name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ group.email }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ group.position }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <button @click="deleteGroup(group.id)" class="px-3 py-1 rounded bg-error-500 text-white text-xs hover:bg-error-600">Delete</button>
                                        </td>
                                    </tr>
                                    <tr v-if="groups.length === 0">
                                        <td colspan="4" class="px-6 py-4 text-center text-gray-400">No groups found.</td>
                                    </tr>
                                </tbody>
                            </table>
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
                        {{ selectedEvent ? 'Update Changes' : 'Create Group' }}
                    </button>
                </div>
            </div>
            </template>
        </Modal>
    </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import UsersAndGroupsTable from '../components/usersngroups/UsersAndGroupsTable.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'
import axios from 'axios'

const currentPageTitle = ref('Users & Groups')
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const selectedEvent = ref(null)
const eventTitle = ref('')
const eventLevel = ref('')
const datas = ref([])
const fileInput = ref(null)
const loading = ref(false)
const id = ref(null)

// Messages
const feedbackMessage = ref('')

// Tambahkan ref untuk input member
const groupName = ref('')
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const position = ref('')
const groups = ref([])
const errorMessage = ref('')

// Ketika tombol diklik, buka dialog file
const triggerFileUpload = () => {
    fileInput.value.click()
}

// Tangani file setelah dipilih
const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    loading.value = true

    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.post(
            `${import.meta.env.VITE_SERVICE_API_URL}/api/import/group`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Ganti dengan API key kamu
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        response.data.forEach((user, index) => {
            // Validasi email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(user.email)) {
                errorMessage.value = 'Please enter a valid email address!'
                return;
            }

            groups.value.push({
                id: Date.now(),
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                position: user.position,
            });
            // console.log(`User ${index + 1}: ${user.first_name} ${user.last_name} (${user.email})`)
        })
    } catch (error) {
        console.error('Error upload:', error)
        alert('Gagal mengupload file CSV.')
    } finally {
        loading.value = false
        fileInput.value.value = '' // reset input
    }
}

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
    groupName.value = ''
    groups.value = []
    first_name.value = ''
    last_name.value = ''
    email.value = ''
    position.value = ''
    errorMessage.value = ''
}

const editData = async (data) => {
    selectedEvent.value = data
    groupName.value = data.name
    
    // Load group members/targets
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        // Set the groups data to display in the modal table
        groups.value = response.data.targets || []
        
    } catch (error) {
        console.error('Failed to fetch group details', error)
        errorMessage.value = 'Failed to load group details'
    }
    
    isOpen.value = true
}

const handleAddOrUpdateEvent = async () => {
    if (selectedEvent.value) {
        // Update existing event
        await updateGroup(selectedEvent.value.id)
    } else {
        // Add new event
        await saveGroup()
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

// Fungsi untuk menambah member ke tabel modal
function addMember() {
    errorMessage.value = '' // Reset error message
    if (!first_name.value || !last_name.value || !email.value || !position.value) {
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
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        position: position.value,
    });

    // Reset input setelah tambah
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    position.value = '';
}

function edit(group) {
    selectedEvent.value = group
    groupName.value = group.name
    // ...set other fields if needed...
    openModal()
}

function deleteGroup(id) {
    groups.value = groups.value.filter(g => g.id !== id)
}

const fetchPages = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch groups', error)
    }
}

const getGroups = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch groups', error)
    }
}

onMounted(() => {
    fetchPages()
})

const getGroupById = async (id) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch group by ID', error)
    }
}

const getGroupSummary = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/summary`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch group summary', error)
    }
}

const getGroupSummaryById = async (id) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/${id}/summary`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        datas.value = response.data
    } catch (error) {
        console.error('Failed to fetch group summary by ID', error)
    }
}

const saveGroup = async () => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: id.value,
            name: groupName.value,
            modified_date: new Date().toISOString(),
            targets: [
                // Map groups to the expected target format
                ...groups.value.map(g => ({
                    first_name: g.first_name,
                    last_name: g.last_name,
                    email: g.email,
                    position: g.position,
                }))
            ]
        }
        await axios.post(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        feedbackMessage.value = 'Create group successfully'
        await getGroups() // Refresh the groups list
        
    } catch (error) {
        errorMessage.value = 'Failed to create group'
        console.error('Failed to create group:', error)
    }
}

const updateGroup = async (id) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const body = {
            id: id,
            name: groupName.value,
            modified_date: new Date().toISOString(),
            targets: [
                // Map groups to the expected target format
                ...groups.value.map(g => ({
                    first_name: g.first_name,
                    last_name: g.last_name,
                    email: g.email,
                    position: g.position,
                }))
            ]
        }
        await axios.put(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        feedbackMessage.value = 'Update group successfully'
        await getGroups() // Refresh the groups list
    } catch (error) {
        errorMessage.value = 'Failed to update group'
        console.error('Failed to update group:', error)
    }
}

const deleteGroupById = async (id) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        await axios.delete(`${import.meta.env.VITE_SERVICE_API_URL}/api/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        feedbackMessage.value = 'Delete group successfully'
        await getGroups() // Refresh the groups list
    } catch (error) {
        errorMessage.value = 'Failed to delete group'
        console.error('Failed to delete group:', error)
    }
}

const importGroups = async (file) => {
    try {
        const token = import.meta.env.VITE_API_TOKEN
        const formData = new FormData()
        formData.append('file', file)

        await axios.post(`${import.meta.env.VITE_SERVICE_API_URL}/api/import/group`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        feedbackMessage.value = 'Import groups successfully'
        await getGroups() // Refresh the groups list
    } catch (error) {
        errorMessage.value = 'Failed to import groups'
        console.error('Failed to import groups:', error)
    }
}

</script>
