<script setup>
import { useState } from '@/composables/Store';
import { useRouter } from 'vue-router';

const { state } = useState();
const router = useRouter();
const addToCart = (product) => {
    state.addToCart = [...state.addToCart, product];
    console.log('product addToCart', state.buyNow);
    router.push('/add-to-cart');
    
};
</script>
<template>
    <div class="">
        <div class="grid grid-cols-3 border-2 p-4 shadow-lg bg-surface-0 dark:bg-surface-900 w-10/12 mx-auto">
            <div class="col-span-1">
                <img :src="state.buyNow.url" class="p-4 bg-cover h-full shadow-xl" alt="" />
            </div>
            <div class="col-span-2 mt-4 py-6">
                <h1 class="text-4xl uppercase leading-10 tracking-wide text-cyan-500 font-bold flex items-center justify-start">{{ state.buyNow.name }}</h1>
                <h1 class="text-2xl font-semibold text-red-600 mt-4">{{ state.buyNow.price }}</h1>
                <p class="">{{ state.buyNow.description }}</p>
                <div class="flex gap-2">
                    <router-link to="/allproduct">
                        <Button label="All Product" severity="info" rounded></Button>
                    </router-link>

                    <Button label="Buy Now" severity="help" rounded @click="addToCart(state.buyNow)"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
