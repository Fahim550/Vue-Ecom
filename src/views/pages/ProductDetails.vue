<script setup>
import { useState } from '@/composables/Store';
import { useRouter } from 'vue-router';
const props = defineProps(['visible', 'productDetails']);
const emit = defineEmits(['update:visible']);
const { state } = useState();
const router = useRouter();
console.log('productDetails', state?.quickView);
const addToCart = (product) => {
    if (state.addToCart.length !== 0) {
        console.log('product', product);
        console.log('state.addToCart', state.addToCart);
        const findDuplicateProduct = state.addToCart.find((pd) => pd.id === product.id);
        console.log('findDuplicateProduct', findDuplicateProduct);
        if (findDuplicateProduct === undefined) {
            state.addToCart = [...state.addToCart, product];
        }
    } else {
        state.addToCart = [...state.addToCart, product];
        console.log('empty', state.addToCart);
    }
    console.log('product addToCart', state.buyNow);
    // router.push('/add-to-cart');
};
const wishList = (product) => {
    const email = sessionStorage.getItem('UserData');
    if (email) {
        console.log('state', state);
        if (state?.wishList.length !== 0) {
            // console.log('product', product);
            // console.log('state.addToCart', state.addToCart);
            const findDuplicateProduct = state.wishList.find((pd) => pd.id === product.id);
            // console.log('findDuplicateProduct', findDuplicateProduct);
            if (findDuplicateProduct === undefined) {
                state.wishList = [...state.wishList, product];
            }
        } else {
            state.wishList = [...state.wishList, product];
            // console.log('empty', state.addToCart);
        }
    } else {
        alert('login first');
    }
    localStorage.setItem('cartItem', JSON.stringify(state.wishList));
    // console.log('product addToCart', state.addToCart);
};
</script>
<template>
    <div header="Product Details" :class="[state?.quickView ? 'translate-x-[0px] opacity-100' : 'translate-x-[200px] opacity-0', 'w-full']">
        <div class="h-screen p-8 bg-[#eceef6] transition-all duration-300 float-right overflow-y-scroll relative">
            <!-- Content Section -->
            <div class="lg:p-8 flex flex-col items-center justify-center">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <!-- Image Section -->
                    <div class="relative">
                        <div class="flex">
                            <div class="flex items-center justify-center w-[90%] bg-gray-100 overflow-hidden rounded-md">
                                <div class="flex justify-center items-center">
                                    <img
                                        :src="state?.quickView?.url"
                                        alt="Product view"
                                        class="w-full max-w-[300px] h-auto max-h-[400px] object-cover transition ease-linear duration-200 hover:scale-105 sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product Details Section -->
                    <div class="flex flex-col">
                        <!-- Product Title & Price -->
                        <div>
                            <h1 class="text-[1.6rem] lg:text-[2rem] text-gray-800 font-semibold mb-3">{{ state?.quickView?.name }}</h1>
                            <div class="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-1 lg:gap-4 mb-4">
                                <div class="flex items-center">
                                    <span class="text-[1.4rem] font-semibold text-gray-800">{{ state?.quickView?.price }}</span>
                                    <span class="text-gray-400 text-[1rem] line-through ml-2"> ৳{{ (state?.quickView?.price * 1.12).toFixed(2) }} </span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <i class="pi pi-star text-yellow-400 text-[1.1rem]"></i>
                                    <span class="text-gray-800 font-semibold">4.5</span>
                                    <span class="text-gray-500">(1,238 Sold)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Product Description -->
                        <div class="mb-6 border-t-[2px] border-gray-200 border-dashed mt-1 pt-6">
                            <h2 class="text-gray-700 font-semibold mb-2">Description:</h2>
                            <p class="text-[0.9rem] text-gray-600">
                                {{ state?.quickView?.description }}
                                <button class="text-blue-600 hover:underline ml-1">See More...</button>
                            </p>
                        </div>

                        <!-- Add to Cart Button -->
                        <div class="flex flex-row gap-4 mt-auto">
                            <button @click="wishList" class="pi pi-heart grow py-3 px-6 bg-pink-500 hover:bg-pink-600 rounded-md text-white"></button>
                            <button @click="addToCart" class="pi pi-shopping-bag grow py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-md text-white"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
