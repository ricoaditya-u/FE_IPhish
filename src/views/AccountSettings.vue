<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    
    <div class="grid grid-cols-12 gap-4 md:gap-6 mt-6">
      <div class="col-span-12">
        <div class="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
          <p class="text-gray-600 dark:text-gray-400">
            Account Settings page - Coming soon
          </p>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref } from 'vue'

const currentPageTitle = ref('Account Settings')
</script>

