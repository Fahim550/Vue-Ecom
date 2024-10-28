<script setup>
import { db } from '@/database/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { onMounted, reactive } from 'vue';
import Card from './Card.vue';

const state = reactive({
    productData: []
});
console.log('productData', state.productData);
onMounted(async () => {
    const productArray = [];
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        productArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('allproduct', productArray);

    state.productData = [...productArray];
});
</script>
<template>
    <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-4 justify-center">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Trending Now</div>
                <span class="text-muted-color text-2xl">Placerat in egestas erat...</span>
            </div>

            <Card v-for="product in state.productData" :title="product.name" :description="product.description" :price="product.price" :src="product.url" :id="product.id" :quantity="product.quantity" :product="product" :key="product" />
        </div>
    </div>
</template>
