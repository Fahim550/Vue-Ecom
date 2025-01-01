<script setup>
import { useState } from '@/composables/Store';
import { useRouter } from 'vue-router';
const props = defineProps(['visible', 'productDetails']);
const emit = defineEmits(['update:visible']);
const { state } = useState();
const router = useRouter();
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
    router.push('/add-to-cart');
};
</script>
<template>
    <Dialog v-model:visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>
