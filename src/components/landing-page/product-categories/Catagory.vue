<script setup>
defineProps(['name', 'totalVacancy']);
</script>
<template>
    <button
        class="px-2 py-1 sm:px-6 sm:py-3 border text-[#323232] hover:bg-gradient-to-r from-cyan-400 to-blue-500 m-1 rounded-xl hover:text-white text-base font-r-semibold transform ease duration-200 hover:scale-[1.02] sm:text-[16px] text-[10px]"
        type="button"
    >
        {{ name ? `${name} ` : 'Submit' }}
    </button>
</template>
