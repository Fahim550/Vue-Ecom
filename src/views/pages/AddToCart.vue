<script setup>
import { useState } from '@/composables/Store';

const { state } = useState();
const handleIncrement = (item) => {
    const cartItem = state.addToCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem) {
        cartItem.quantity += 1; // Increment the item's quantity
    }
};

// Function to decrement quantity for a specific cart item
const handleDecrement = (item) => {
    const cartItem = state.addToCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrement the item's quantity, ensuring it doesn't go below 1
    }
};

// Function to handle manual input changes
const handleInputValueChange = (item, event) => {
    const value = Number(event.target.value);
    const cartItem = state.addToCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem) {
        cartItem.quantity = value > 0 ? value : 1; // Ensure the quantity is positive
    }
};

const deleteCartItem = (item) => {
    const index = state.addToCart.findIndex((cartItem) => cartItem.name === item.name);
    if (index !== -1) {
        state.addToCart.splice(index, 1); // Remove the item at the found index
    }
};

console.log('addtocart', state.addToCart);
</script>
<template list="state.addToCart">
    <div class="flex flex-col bg-gray-100 shadow-md py-4">
        <div v-for="(item, index) in state.addToCart" :key="index" class="w-10/12 bg-gray-200 mx-auto border-2 border-white p-2">
            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                <div class="md:w-40 relative">
                    <img class="block xl:block mx-auto rounded w-full" :src="`${item.url}`" :alt="item.name" />
                </div>
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                        <div>
                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            <div class="text-lg font-medium mt-2">{{ item.description }}</div>
                            <div class="text-xl font-semibold">${{ item.price }}</div>
                        </div>
                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                            <div
                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                style="
                                    border-radius: 30px;
                                    box-shadow:
                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                "
                            >
                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                        <div class="flex items-center mx-auto border border-gray-200 rounded-md">
                            <button class="bg-gray-300 p-[15px] rounded-l-md text-gray-700 text-[1.1rem]" @click="handleDecrement(item)">
                                <span class="font-bold text-xl">-</span>
                            </button>
                            <input type="number" :value="item.quantity" class="w-[70px] py-2.5 outline-none focus:ring-0 border-none text-center text-[1.1rem]" @input="(event) => handleInputValueChange(item, event)" />
                            <button class="bg-gray-300 p-[15px] rounded-r-md text-gray-700 text-[1.1rem]" @click="handleIncrement(item)">
                                <span>+</span>
                            </button>
                        </div>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                            <Button icon="pi pi-trash" label="Delete" severity="danger" @click="() => deleteCartItem(item)" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-end gap-2 mr-6 m-2">
            <Button icon="pi pi-check" label="Order" @click="() => deleteCartItem(item)" class="justify-center whitespace-nowrap"></Button>
        </div>
    </div>
</template>
