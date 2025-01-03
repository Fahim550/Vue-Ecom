<script setup>
import { useState } from '@/composables/Store';
import { db } from '@/database/FirebaseConfig';

import { addDoc, collection } from 'firebase/firestore';

import InputText from 'primevue/inputtext';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { state } = useState();
const router = useRouter();
const localState = reactive({
    addToCart: [],
    nextClicked: false,
    userData: {}
});
const picked = ref(false);

const handleIncrement = (item) => {
    const cartItem = localState.addToCart.find((cartItem) => cartItem.name === item.name);
    localStorage.setItem('cartItems', JSON.stringify(item));
    if (cartItem) {
        cartItem.quantity += 1; // Increment the item's quantity
    }
};

// Function to decrement quantity for a specific cart item
const handleDecrement = (item) => {
    const cartItem = localState.addToCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrement the item's quantity, ensuring it doesn't go below 1
    } else {
        alert("can't give negative value");
    }
};

// Function to handle manual input changes
const handleInputValueChange = (item, event) => {
    const value = Number(event.target.value);
    const cartItem = localState.addToCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem) {
        if (value < 0) {
            alert("you can't give negative value");
        }
        if (value > 0) {
            if (cartItem.totalQuantity >= value) {
                cartItem.quantity = value;
            } else {
                alert(`You can't give a quantity more than ${cartItem.totalQuantity}`);
                cartItem.quantity = cartItem.totalQuantity;
            }
        } else {
            cartItem.quantity = 1;
        }
    }
};

const deleteCartItem = (item) => {
    const index = localState.addToCart.findIndex((cartItem) => cartItem.name === item.name);
    if (index !== -1) {
        localState.addToCart.splice(index, 1); // Remove the item at the found index
    }
};
console.log('addtocart', localState.addToCart);

const next = () => {
    console.log('order', localState.addToCart);
    localState.nextClicked = true;
    const userData = JSON.parse(sessionStorage.getItem('UserData'));
    console.log('userData', userData);
    if (userData.email) {
        localState.userData = userData;
    } else {
        alert('please logged in otherwise you can not order ');
    }
};
const placeOrder = async () => {
    const orderObject = {
        name: localState.userData?.name,
        email: localState.userData?.email,
        phone: localState.userData?.phone,
        address: localState.userData?.address,
        orderProduct: state.addToCart,
        payment: false,
        paymentId: ''
    };
    console.log('orderObject', orderObject);
    try {
        const docRef = await addDoc(collection(db, 'order'), { ...orderObject });
        console.log('order add successfully', docRef);
        state.addToCart = [];
        localState.addToCart = [];
        router.push('/');
    } catch (error) {
        alert('error occurred while creating account');
    }
};
onMounted(() => {
    localState.addToCart = [...state.addToCart];
});
</script>
<template list="state.addToCart">
    <div class="flex flex-col shadow-md py-2">
        <div class="container mx-auto p-6">
            <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
            <table class="w-full border-collapse">
                <thead>
                    <tr class="text-left bg-gray-100">
                        <th class="p-4">Image</th>
                        <th class="p-4">Product Name</th>
                        <th class="p-4">Quantity</th>
                        <th class="p-4">Price</th>
                        <th class="p-4">Total Price</th>
                        <th class="p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in localState.addToCart" :key="product.id" class="border-b hover:bg-gray-50">
                        <!-- Product Image -->
                        <td class="p-4">
                            <img :src="product?.url" :alt="product.name" class="w-16 h-16 object-cover rounded" />
                        </td>

                        <!-- Product Name -->
                        <td class="p-4">
                            <h3 class="text-lg font-semibold">{{ product?.name }}</h3>
                            <p class="text-gray-500">Brand: {{ product?.brand }}</p>
                            <p class="text-gray-500">Size: {{ product?.size }}</p>
                        </td>

                        <!-- Quantity Controls -->
                        <td class="p-4">
                            <button class="p-2.5 bg-gray-50 rounded-l-3xl text-gray-700 text-[1.1rem]" @click="handleDecrement(product)">
                                <span class="font-bold text-xl">-</span>
                            </button>
                            <input
                                type="number"
                                :value="product.quantity"
                                min="1"
                                class="w-12 bg-gray-50 py-2.5 outline-none focus:ring-0 border-none text-center text-[1.1rem]"
                                v-if="product.quantity == 0 ? (product.quantity = 1) : product.quantity"
                                @input="(event) => handleInputValueChange(product, event)"
                            />
                            <button class="p-2.5 bg-gray-50 rounded-r-3xl text-gray-700 text-[1.1rem]" @click="handleIncrement(product)">
                                <span>+</span>
                            </button>
                        </td>

                        <!-- Price -->
                        <td class="p-4">${{ product?.price }}</td>

                        <!-- Total Price -->
                        <td class="p-4">${{ (product?.quantity * product.price)?.toFixed(2) }}</td>

                        <!-- Remove Action -->
                        <td class="p-4">
                            <button @click="deleteCartItem(index)" class="bg-gray-200 hover:bg-gray-300 p-2 rounded text-red-500">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-end mt-6">
                <!-- <h3 class="text-xl font-bold">Total: ${{ totalPrice.toFixed(2) }}</h3> -->
            </div>
        </div>
        <!-- <div v-for="(item, index) in localState.addToCart" :key="index" class="col-span-1 w-10/12 bg-gray-200 mx-auto border-2 border-white p-2">
            <div class="flex flex-col sm:flex-row sm:items-center px-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                <div class="md:w-40 relative">
                    <img class="block xl:block mx-auto rounded w-full" :src="`${item.url}`" :alt="item.name" />
                </div>
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                        <div>
                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            <div class="text-lg font-medium mt-2">{{ item.description }}</div>
                            <div class="text-2xl font-bold text-green-500">${{ item.price }}</div>
                        </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-2">
                        <h1 class="flex mx-auto text-xl font-bold">Quantity ({{ item.totalQuantity }})</h1>
                        <div class="flex items-center mx-auto border border-gray-200 rounded-md">
                            <button class="bg-gray-300 p-2.5 rounded-l-md text-gray-700 text-[1.1rem]" @click="handleDecrement(item)">
                                <span class="font-bold text-xl">-</span>
                            </button>
                            <input
                                type="number"
                                :value="item.quantity"
                                min="1"
                                class="w-[70px] py-2.5 outline-none focus:ring-0 border-none text-center text-[1.1rem]"
                                v-if="item.quantity == 0 ? (item.quantity = 1) : item.quantity"
                                @input="(event) => handleInputValueChange(item, event)"
                            />
                            <button class="bg-gray-300 p-2.5 rounded-r-md text-gray-700 text-[1.1rem]" @click="handleIncrement(item)">
                                <span>+</span>
                            </button>
                        </div>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                            <Button icon="pi pi-trash" label="Delete" severity="danger" @click="() => deleteCartItem(item)" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="flex justify-center gap-2 mr-6 m-2">
            <section class="col-span-1" v-if="localState.nextClicked">
                <p class="my-8 text-3xl font-bold">Shipping details</p>
                <section class="flex">
                    <section class="mx-4">
                        <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                        <InputText id="name" type="text" placeholder="name" class="w-full mb-8" :value="localState.userData.name" readonly />
                    </section>
                    <section class="mx-4">
                        <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="name" type="email" placeholder="email" class="w-full mb-8" :value="localState.userData.email" readonly />
                    </section>
                    <section class="mx-4">
                        <label for="phone" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Phone</label>
                        <InputText id="phone" type="phone" placeholder="phone" class="w-full mb-8" :value="localState.userData.phone" />
                    </section>
                    <section class="mx-4">
                        <label for="address" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Address:</label>
                        <InputText id="address" type="address" placeholder="address" class="w-full mb-8" :value="localState.userData.email" />
                    </section>
                </section>
                <section>
                    <p class="my-8 text-3xl font-bold">Delivery Option</p>
                    <input type="radio" id="Cash" value="cash" v-model="picked" />
                    <label for="Cash" class="mx-4">Cash On Delivery</label>
                    <input type="radio" id="payment" value="payment" v-model="picked" />
                    <label for="payment" class="mx-4">Payment Getway</label>
                </section>
            </section>
        </div>
        <section v-if="localState?.addToCart?.length > 0" class="flex justify-end">
            <Button v-if="!localState.nextClicked" icon="pi pi-check" label="next" @click="() => next()" class="w-fit mr-2 whitespace-nowrap"></Button>
            <Button v-if="picked" icon="pi pi-check" label="Place Order" @click="() => placeOrder()" class="w-fit mr-2 whitespace-nowrap"></Button>
        </section>
    </div>
</template>
