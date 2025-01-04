<script setup>
import { useState } from '@/composables/Store';
import { db } from '@/database/FirebaseConfig';

import { addDoc, collection } from 'firebase/firestore';

import InputText from 'primevue/inputtext';
import { computed, onMounted, reactive, ref } from 'vue';
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
    console.log('addtocart', localState.addToCart);
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
        state.addToCart.splice(index, 1);
    }
};
const totalPrice = computed(() => {
    return localState.addToCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

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
<template>
    <div class="flex flex-col shadow-md py-2">
        <div class="container mx-auto p-6">
            <h1 class="text-2xl font-bold mb-4 text-center sm:text-left">Shopping Cart</h1>

            <!-- Responsive Table -->
            <div class="overflow-x-auto">
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
                            <td class="p-4">
                                <img :src="product?.url" :alt="product.name" class="w-16 h-16 object-cover rounded" />
                            </td>
                            <td class="p-4">
                                <h3 class="text-lg font-semibold">{{ product?.name }}</h3>
                                <p v-if="product?.brand" class="text-gray-500">Brand: {{ product?.brand }}</p>
                                <p v-if="product?.size" class="text-gray-500">Size: {{ product?.size }}</p>
                            </td>
                            <td class="p-4 flex items-center">
                                <button class="p-2.5 bg-gray-50 rounded-l-md text-gray-700 text-[1.1rem]" @click="handleDecrement(product)">
                                    <span class="font-bold text-xl">-</span>
                                </button>
                                <input type="number" :value="product.quantity" min="1" class="w-12 bg-gray-50 py-2 outline-none text-center text-[1.1rem]" @input="(event) => handleInputValueChange(product, event)" />
                                <button class="p-2.5 bg-gray-50 rounded-r-md text-gray-700 text-[1.1rem]" @click="handleIncrement(product)">
                                    <span>+</span>
                                </button>
                            </td>
                            <td class="p-4 text-xl font-semibold">৳{{ product?.price }}</td>
                            <td class="p-4 text-xl font-semibold">৳{{ (product?.quantity * product?.price)?.toFixed(2) }}</td>
                            <td class="p-4">
                                <Button @click="deleteCartItem(product)" type="button" icon="pi pi-trash" severity="danger" rounded />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Total Price -->
            <div class="flex flex-col items-end mt-6 p-4 bg-gray-100 rounded shadow-lg w-full">
                <h3 class="text-xl font-bold">Subtotal: {{ totalPrice.toFixed(2) }} ৳</h3>
                <h3 class="text-xl font-bold">Shipping: {{ 120 }} ৳</h3>
                <h3 class="text-xl font-bold">Total: {{ (totalPrice + 120).toFixed(2) }} ৳</h3>
            </div>
        </div>

        <!-- Shipping Details -->
        <div class="flex flex-col items-center sm:flex-row sm:justify-center gap-4 mt-8">
            <section v-if="localState.nextClicked" class="w-full sm:w-auto">
                <h2 class="my-8 text-2xl font-bold text-center sm:text-left">Shipping Details</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="name" class="block text-lg font-medium mb-2"> Name </label>
                        <InputText id="name" type="text" placeholder="Name" class="w-full" :value="localState.userData.name" readonly />
                    </div>
                    <div>
                        <label for="email" class="block text-lg font-medium mb-2"> Email </label>
                        <InputText id="email" type="email" placeholder="Email" class="w-full" :value="localState.userData.email" readonly />
                    </div>
                    <div>
                        <label for="phone" class="block text-lg font-medium mb-2"> Phone </label>
                        <InputText id="phone" type="tel" placeholder="Phone" class="w-full" :value="localState.userData.phone" />
                    </div>
                    <div>
                        <label for="address" class="block text-lg font-medium mb-2"> Address </label>
                        <InputText id="address" type="text" placeholder="Address" class="w-full" :value="localState.userData.address" />
                    </div>
                </div>
                <section>
                    <p class="my-8 text-3xl font-bold">Delivery Option</p>
                    <input type="radio" id="Cash" value="cash" v-model="picked" />
                    <label for="Cash" class="mx-4">Cash On Delivery</label>
                    <input type="radio" id="payment" value="payment" v-model="picked" />
                    <label for="payment" class="mx-4">Payment Getway</label>
                </section>
            </section>
        </div>

        <!-- Buttons -->
        <div v-if="localState?.addToCart?.length > 0" class="flex justify-end gap-4 mt-6">
            <Button v-if="!localState.nextClicked" icon="pi pi-check" label="Next" @click="() => next()" class="w-fit" />
            <Button v-if="picked" icon="pi pi-check" label="Place Order" @click="() => placeOrder()" class="w-fit" />
        </div>
    </div>
</template>
