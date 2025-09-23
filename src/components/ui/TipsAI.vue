<template>
    <div :class="['rounded-xl border p-4', variantClasses[variant].container]">
        <div class="flex items-start gap-3">
            <!-- Default Checkbox -->
            <div :class="['-mt-0.5', variantClasses[variant].icon]">
                <input type="checkbox" id="generateLandingAI" v-model="localValue" class="sr-only" />
            </div>
            <div>
                <label
                for="generateLandingAI"
                class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
                >
                    <div class="relative">
                        <div
                        :class="
                            localValue
                            ? 'border-brand-500 bg-brand-500'
                            : 'bg-transparent border-gray-300 dark:border-gray-700'
                        "
                        class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                        >
                            <span :class="localValue ? '' : 'opacity-0'">
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
                    <Message2Line />  <b>Generate dengan AI (Rekomendasi)</b>
                </label>
                <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 ">
                        <span v-html="message"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
    import { SuccessIcon, ErrorIcon, WarningIcon, InfoCircleIcon } from '@/icons'
    import Message2Line from '@/icons/Message2Line.vue'

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
    }>()

    interface AlertProps {
        variant: 'success' | 'error' | 'warning' | 'info'
        title: string
        message: string
        showLink?: boolean
        linkHref?: string
        linkText?: string
        modelValue?: boolean
    }

    const props = withDefaults(defineProps<AlertProps>(), {
        showLink: false,
        linkHref: '#',
        linkText: 'Learn more',
        modelValue: false,
    })

    const localValue = ref<boolean>(props.modelValue)

    watch(
        () => props.modelValue,
        (newVal) => {
            if (newVal !== localValue.value) {
                localValue.value = newVal
            }
        }
    )

    watch(localValue, (val) => {
        emit('update:modelValue', val)
    })

    const variantClasses = {
    success: {
        container: 'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
        icon: 'text-success-500',
    },
    error: {
        container: 'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
        icon: 'text-error-500',
    },
    warning: {
        container: 'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
        icon: 'text-warning-500',
    },
    info: {
        container:
        'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15',
        icon: 'text-blue-light-500',
    },
    }

    const icons = {
        success: SuccessIcon,
        error: ErrorIcon,
        warning: WarningIcon,
        info: InfoCircleIcon,
    }
</script>
