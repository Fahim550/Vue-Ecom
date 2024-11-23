<script setup>
import { useState } from '@/composables/Store';
import { useRouter } from 'vue-router';

const props = defineProps(['title', 'description', 'price', 'src', 'quantity', 'id', 'product']);
const { state } = useState();
const router = useRouter();
const addToCart = (product) => {
    if (state.addToCart.length !== 0) {
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
    // console.log('product addToCart', state.addToCart);
    // const sessionProduct = JSON.parse(sessionStorage.getItem('cartProduct'));
    // console.log('sessionProduct', sessionProduct);
    // const productArray = sessionProduct ? [...sessionProduct] : [];
    // if (sessionProduct && sessionProduct.length > 0) {
    //     productArray.push(product);
    //     sessionStorage.setItem('cartProduct', JSON.stringify(productArray));
    // } else {
    //     sessionStorage.setItem('cartProduct', JSON.stringify([product]));
    //     console.log('add product', product);
    // }
};
const buyNow = (product) => {
    state.buyNow = product;
    console.log('buyNow', state.buyNow);
    router.push(`/product/details?productId=${product.id}`);
};
</script>
<template>
    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 h-full group">
        <div style="height: 380px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
            <div className=" shadow-md rounded-md p-2 overflow-hidden">
                <img
                    :src="props.src"
                    alt="icecream"
                    className="mx-auto w-full h-64 transition ease-linear 
                duration-200 hover:scale-105"
                />
                <div className=" w-full p-1 ">
                    <h2 className="text-[1.4rem] font-semibold">{{ props.title }}</h2>
                </div>
                <div className="p-4">
                    <p className="text-[1rem] text-gray-700">{{ props.description }}</p>

                    <div className="mt-5 flex items-center justify-between w-full">
                        <h3 className="text-[1.4rem] font-semibold flex items-center gap-[4px]">$13.90</h3>

                        <div>
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
        </div>
    </div>
</template>
