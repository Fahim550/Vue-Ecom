<script setup>
import Header from '@/components/shared/Header.vue';
</script>
<template>
    <div class="layout-wrapper" :class="containerClass">
        <Header class="" />
        <div class="mt-2">
            <router-view></router-view>
        </div>
    </div>
</template>
