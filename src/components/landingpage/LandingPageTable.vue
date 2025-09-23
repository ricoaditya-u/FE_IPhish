    <template>
    <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
    >
        <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Table Landing Pages</h3>
            </div>
        </div>

        <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
            <thead>
                <tr class="border-t border-gray-100 dark:border-gray-800">
                    <th class="py-3 text-left">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Name</p>
                    </th>
                    <th class="py-3 text-left">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Modified Date</p>
                    </th>
                    <th class="py-3 text-left">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(data, index) in props.datas"
                    :key="index"
                    class="border-t border-gray-100 dark:border-gray-800"
                >
                    <td class="py-3 whitespace-nowrap">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ data.name }}</p>
                    </td>
                    <td class="py-3 whitespace-nowrap">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ data.modified_date }}</p>
                    </td>
                    <td class="py-3 whitespace-nowrap">
                        <button
                            class="mr-2 px-3 py-1 rounded bg-brand-500 text-white text-xs hover:bg-brand-600"
                            @click="$emit('edit', data)"
                        >
                            Edit
                        </button>
                        <button
                            class="px-3 py-1 rounded bg-error-500 text-white text-xs hover:bg-error-600"
                            @click="confirmDelete(data)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    </template>

<script setup>
    import Swal from 'sweetalert2'

    const emit = defineEmits(['edit', 'delete'])
    const props = defineProps({
        datas: { type: Array, default: () => [] },
    })

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
</script>
