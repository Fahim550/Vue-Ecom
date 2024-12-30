<script setup>
import { db } from '@/database/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { onMounted, reactive } from 'vue';

const state = reactive({
    orderData: []
});
const localState = reactive({
    addToCart: [],
    nextClicked: false,
    userData: {}
});

onMounted(async () => {
    const orderArray = [];
    const querySnapshot = await getDocs(collection(db, 'order'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        orderArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('order', orderArray);

    state.orderData = [...orderArray];
});
</script>
<template list="state.addToCart">
    <div class="flex flex-col bg-gray-100 shadow-md py-2">
        <div v-for="(order, index) in state.orderData" :key="index" class="col-span-1 w-10/12 bg-gray-200 mx-auto border-2 border-white p-2">
            <div class="flex flex-col sm:flex-row sm:items-center px-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                        <section>
                            <div class="text-lg font-medium mt-2">Name:{{ order?.name }}</div>
                            <div class="text-lg font-medium mt-2">Address:{{ order?.address }}</div>
                            <div class="text-lg font-medium mt-2">Phone:{{ order?.phone }}</div>
                        </section>
                    </div>
                    <div class="justify-center items-start gap-2">
                        <section v-for="product in order?.orderProduct" :key="product" class="grid-cols-6">
                            <div class="col-span-4">
                                <div class="text-lg font-medium mt-2">Name:{{ product?.name }}</div>
                                <div class="text-lg font-medium mt-2">Price:{{ product?.price }}</div>
                                <div class="text-lg font-medium mt-2">Quantity:{{ product?.quantity }}</div>
                            </div>
                            <div class="md:w-40 relative col-span-2">
                                <img class="block xl:block mx-auto rounded w-full" :src="`${product.url}`" :alt="order.name" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
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
