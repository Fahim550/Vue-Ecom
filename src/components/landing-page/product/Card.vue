<script setup>
import { useState } from '@/composables/Store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['title', 'description', 'price', 'src', 'quantity', 'id', 'product']);
const { state } = useState();
const wishlistVisible = ref(false);
const quickViewVisible = ref(false);
const productCardHover = ref(false);
const router = useRouter();
const addToCart = (product) => {
    const email = sessionStorage.getItem('UserData');
    if (email) {
        console.log('state', state);
        if (state?.addToCart.length !== 0) {
            // console.log('product', product);
            // console.log('state.addToCart', state.addToCart);
            const findDuplicateProduct = state.addToCart.find((pd) => pd.id === product.id);
            // console.log('findDuplicateProduct', findDuplicateProduct);
            if (findDuplicateProduct === undefined) {
                state.addToCart = [...state.addToCart, product];
            }
        } else {
            state.addToCart = [...state.addToCart, product];
            // console.log('empty', state.addToCart);
        }
    } else {
        alert('login first');
    }
    localStorage.setItem('cartItem', JSON.stringify(state.addToCart));
    // console.log('product addToCart', state.addToCart);
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

const truncateText = (text) => {
    if (text.length > 50) {
        return text.substring(0, 50) + '...';
    }
    return text;
};
const buyNow = (product) => {
    state.buyNow = product;
    console.log('buyNow', state.buyNow);
    router.push(`/product/details?productId=${product.id}`);
};
</script>
<template>
    <div class="col-span-8 md:col-span-4 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 justify-items-center h-full group">
        <div class="w-full group border border-gray-300 rounded-md p-5" style="height: 350px; padding: 2px; border-radius: 10px">
            <!-- image & action buttons -->
            <div @mouseover="productCardHover = true" @mouseout="productCardHover = false" class="w-full relative cursor-pointer overflow-hidden">
                <img :alt="'product/image'" :src="props?.src" class="w-full max-h-64 transition ease-linear duration-200 hover:scale-105" />

                <div class="absolute bottom-0 left-0 w-full">
                    <!-- quick action buttons -->
                    <div class="flex items-center gap-[15px] justify-center">
                        <div
                            @mouseover="wishlistVisible = true"
                            @mouseout="wishlistVisible = false"
                            @click="wishList(props.product)"
                            class="relative w-max group-hover:translate-y-0 translate-y-[50px] transition-all opacity-0 group-hover:opacity-100 duration-300"
                        >
                            <i class="pi pi-heart rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer"></i>

                            <!-- tooltip -->
                            <p
                                :class="wishlistVisible ? 'opacity-100 z-[100] translate-y-0' : 'opacity-0 z-[-1] translate-y-[20px]'"
                                class="absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200"
                            >
                                Wishlist
                                <!-- arrow -->
                                <span class="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>

                        <div @mouseover="quickViewVisible = true" @mouseout="quickViewVisible = false" class="relative w-max group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-[110px]">
                            <i class="pi pi-eye rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer"> </i>

                            <!-- tooltip -->
                            <p
                                :class="quickViewVisible ? 'opacity-100 z-[100] translate-y-0' : 'opacity-0 z-[-1] translate-y-[20px]'"
                                class="absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200"
                            >
                                Quick View
                                <!-- arrow -->
                                <span class="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>
                    </div>

                    <!-- add to cart -->
                    <div class="w-full flex mt-6 items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 translate-y-[60px] bg-[rgb(0,0,0,0.5)]">
                        <button
                            className="pi pi-cart-arrow-down py-[13px] overflow-hidden before:w-full before:h-full before:bg-[#0FABCA] before:absolute before:top-0 z-0 before:z-[-1] before:translate-x-[-240px] hover:before:translate-x-0 before:transition-all before:duration-300 before:left-0 relative flex items-center justify-center grow text-white"
                            @click="addToCart(props.product)"
                        >
                            <i class="pi pi-shopping-bag"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- product details -->
            <div class="mt-4">
                <!-- review area -->
                <div class="flex items-center justify-center gap-[10px] mt-2">
                    <div class="flex items-center space-x-1">
                        <div v-for="starRating in 5" :key="starRating">
                            <i class="pi pi-star-fill" :class="starRating <= rating ? 'text-yellow-400' : 'text-gray-300'" size="16" style="color: chocolate"></i>
                        </div>
                    </div>
                    <span class="text-[0.9rem] text-gray-500">{{ product?.totalQuantity }}</span>
                </div>

                <h3 class="text-[1.4rem] font-semibold text-center mt-0.5 text-gray-900">{{ props?.title }}</h3>
                <p class="text-2xl font-bold text-center mt-0.5 text-red-500">{{ '৳' + props?.price }}</p>
            </div>
        </div>
        <!-- <div class="" style="height: 380px; padding: 2px; border-radius: 10px">
            <div className=" shadow-md rounded-md px-2 overflow-hidden ">
                <img
                    :src="props.src"
                    :alt="props.title"
                    className="mx-auto w-full h-60 transition ease-linear 
                duration-200 hover:scale-105"
                />
                <div className=" w-full px-1 h-16">
                    <h2 className="text-[1.4rem] font-semibold">{{ props.title }}</h2>
                </div>
                <div className="px-4">
                    <p className="text-[1rem] text-gray-700 ">{{ truncateText(props.description, maxLength) }}</p>

                    <div className=" flex items-center justify-between w-full">
                        <h3 className="text-2xl font-bold flex items-center gap-[4px] text-green-500">{{ props.price }}</h3>

                        <div class="flex flex-col">
                            <button
                                @click="addToCart(props.product)"
                                className="pi pi-heart-fill py-2 px-4 border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white text-lg font-semibold rounded-3xl shadow-md translate-x-60  group-hover:translate-x-0 ease-linear duration-300"
                            >
                                {{ ' ' }}Cart
                            </button>
                            <button
                                @click="buyNow(props.product)"
                                className="pi pi-shopping-cart py-2 px-4 border bg-gradient-to-r from-cyan-500 to-blue-500  text-white text-lg font-semibold rounded-3xl shadow-md translate-x-60  group-hover:translate-x-0 ease-linear duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
