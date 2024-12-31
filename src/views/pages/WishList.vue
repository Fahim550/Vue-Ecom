<script setup>
import { reactive, ref } from 'vue';

const props = defineProps(['visible', 'wishList']);
const localState = reactive({
    addToCart: [],
    wishList: []
});

const toggleModal = () => {
    console.log('is', props.visible);
    this.$emit('update-visibility', !this.visible);
};
console.log('props', props.wishList);
const cartItems = ref([...props.wishList]);
const removeItem = (item) => {
    const index = localState.wishList.findIndex((cartItem) => cartItem.name === item.name);
    if (index !== -1) {
        localState.wishList.splice(index, 1); // Remove the item at the found index
    }
};
</script>
<template>
    <div :class="[props.visible ? 'translate-x-[0px] opacity-100' : 'translate-x-[200px] opacity-0', 'overflow-y-scroll zenUIRightModal w-[60%] h-screen bg-[#eceef6] transition-all duration-300 float-right']">
        <!-- Close Button -->
        <div class="w-full flex items-end p-4 justify-end">
            <i class="pi pi-times p-2 w-fit text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer" @click="toggleModal" />
        </div>

        <!-- Modal Content -->
        <div class="flex items-start flex-col p-12 justify-between gap-8">
            <!-- Cart Steps -->
            <div class="bg-[#fff] min-h-screen rounded-md p-6 w-full">
                <div class="flex items-center md:flex-row flex-col justify-between w-full border-b border-[#d1d1d1]">
                    <div class="flex items-center gap-5">
                        <span class="text-[1rem] font-[500] text-primary border-b border-primary pb-3"> 1. Cart </span>
                        <span class="text-[1rem] font-[500] text-text pb-3"> 2. Shipping & Payment </span>
                        <span class="text-[1rem] font-[500] text-text pb-3"> 3. Confirmation </span>
                    </div>
                    <a href="#" class="underline text-primary font-[500] pb-3"> Why is subscribing better? </a>
                </div>

                <!-- Products -->
                <div v-for="(item, index) in cartItems" :key="index" class="mt-12 flex items-start border-b border-[#d1d1d1] pb-6 justify-between w-full">
                    <div class="flex items-start gap-5">
                        <img :src="item?.url" :alt="item.name" class="w-[90px] h-[60px] object-cover rounded-md" />
                        <div>
                            <h2 class="text-[1.2rem] font-[600] text-primary">
                                {{ item?.name }}
                            </h2>
                            <!-- <p class="text-[1rem] font-[500] text-text">items</p> -->
                        </div>
                    </div>
                    <div class="flex items-center gap-12">
                        <h3 class="text-[1.2rem] font-[600] text-[#6d6d6d]">
                            ৳{{ item?.price }} <span class="text-primary pl-1">{{ item.discountedPrice }}</span>
                        </h3>
                        <i class="pi pi-times text-[#6d6d6d] cursor-pointer" @click="removeItem(item)" />
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <!-- <div class="w-full mr-8">
                <div class="bg-[#fff] rounded-md p-6">
                    <h3 class="text-[1rem] text-primary font-[500] border-b border-[#d1d1d1] pb-4 text-center">Order Summary</h3>
                    <div class="flex flex-col gap-5 mt-4">
                        <div class="flex items-center justify-between w-full">
                            <h4 class="text-[1rem] font-[500] text-primary">Item Total</h4>
                            <span class="text-text font-[500]">${{ orderSummary?.total }}</span>
                        </div>
                        <div class="flex items-center justify-between w-full">
                            <h4 class="text-[1rem] font-[500] text-primary">Subscription savings (15% off)</h4>
                            <span class="text-primary font-[500]">- ${{ orderSummary?.savings }}</span>
                        </div>
                        <div class="flex items-center justify-between w-full">
                            <h4 class="text-[1rem] font-[500] text-primary">Shipping</h4>
                            <span class="text-primary font-[500]">free</span>
                        </div>
                        <div class="flex items-center justify-between w-full border-t border-[#d1d1d1] pt-4">
                            <h4 class="text-[1rem] font-[500] text-text">Order Total</h4>
                            <span class="text-text font-[500]">${{ orderSummary?.finalTotal }}</span>
                        </div>
                    </div>
                </div>
                <button class="w-full py-2 px-6 mt-6 tracking-widest bg-primary rounded-md text-[#fff]">Checkout</button>
            </div> -->
        </div>
    </div>
</template>
