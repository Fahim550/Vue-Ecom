<script setup>
import { useState } from '@/composables/Store';

const { state } = useState();
</script>
<template>
    <h2>{{ state.addToCart }}</h2>
</template>