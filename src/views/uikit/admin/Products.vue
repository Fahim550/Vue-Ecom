<script setup>
import { onMounted, reactive } from 'vue';
// const db = useFirestore();
import { db } from '@/database/FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import Card from 'primevue/card';
import { ref } from 'vue';

const visible = ref(false);

const state = reactive({
    name: '',
    price: 0,
    image: '',
    quantity: 0,
    description: '',
    productData: [],
    currentId: '',
    updateData: {
        name: '',
        price: 0,
        url: '',
        quantity: 0,
        description: '',
        productData: []
    }
});

// const todos = useCollection(collection(db, 'todos'));
const addProducts = async () => {
    const docRef = await addDoc(collection(db, 'products'), {
        name: state.name,
        price: state.price,
        url: state.image,
        quantity: state.quantity,
        description: state.description
    });
    console.log('addProducts', docRef.id);

    (state.name = ''), (state.price = 0), (state.image = ''), (state.quantity = 0), (state.description = '');

    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        productArray.push(doc.data());
    });
    state.productData = productArray.reverse();
};

const deleteProducts = async (product) => {
    await deleteDoc(doc(db, 'products', product.id));
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        productArray.push(doc.data());
    });
};
const editProducts = (product) => {
    console.log('updated product', product);
    (state.updateData.name = product.name),
        (state.updateData.price = product.price),
        (state.updateData.url = product.url),
        (state.updateData.quantity = product.quantity),
        (state.updateData.description = product.description),
        (state.currentId = product.id);
};
const updateProducts = async (product) => {
    console.log('updated product', product);
    try {
        const docRef = doc(db, 'products', state.currentId);

        await updateDoc(docRef, product);
        alert('Document successfully updated!');
        console.log('updateProducts', docRef);
    } catch (error) {
        console.error(error);
    }
};
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
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-full card flex gap-8 ">
                <div class="flex flex-col gap-4 w-1/2">
                    <div v-if="state.productData.length > 0">
                        <p class="text-green-500 font-bold">Your product list in your inventory</p>
                        <div v-for="product in state.productData" :key="product">
                            <Card style="width: 25rem; overflow: hidden" class="mt-4">
                                <template #header>
                                    <img alt="user header" :src="product?.url" class="w-full" />
                                </template>
                                <template #title>{{ product?.name }}</template>
                                <template #content>
                                    <p class="m-0">{{ product?.description }}</p>
                                    <p class="m-0">Price : {{ product?.price }} tk - Quantity : {{ product?.quantity }}</p>
                                </template>
                                <template #footer>
                                    <div class="flex gap-4 mt-1">
                                        <Button label="Delete" severity="danger" outlined class="w-full bg-red-500" @click="deleteProducts(product)" />
                                        <Button
                                            label="Update"
                                            class="w-full"
                                            @click="
                                                visible = true;
                                                editProducts(product);
                                            "
                                        />

                                        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
                                            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                                            <div class="flex items-center gap-4 mb-4">
                                                <label for="username" class="font-semibold w-24">Username</label>
                                                <InputText id="username" class="flex-auto" autocomplete="off" v-model="state.updateData.name" />
                                            </div>
                                            <div class="flex items-center gap-4 mb-4">
                                                <label for="price" class="font-semibold w-24">Price</label>
                                                <InputText id="price" class="flex-auto" autocomplete="off" v-model="state.updateData.price" />
                                            </div>
                                            <div class="flex items-center gap-4 mb-4">
                                                <label for="imageurl" class="font-semibold w-24">Image Url</label>
                                                <InputText id="imageurl" class="flex-auto" autocomplete="off" v-model="state.updateData.url" />
                                            </div>
                                            <div class="flex items-center gap-4 mb-8">
                                                <label for="quantity" class="font-semibold w-24">Quantity</label>
                                                <InputText id="quantity" class="flex-auto" autocomplete="off" v-model="state.updateData.quantity" />
                                            </div>
                                            <div class="flex items-center gap-4 mb-8">
                                                <label for="description" class="font-semibold w-24">Description</label>
                                                <InputText id="description" class="flex-auto" autocomplete="off" v-model="state.updateData.description" />
                                            </div>
                                            <div class="flex justify-end gap-2">
                                                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                                                <Button
                                                    type="button"
                                                    label="Save"
                                                    @click="
                                                        visible = false;
                                                        updateProducts((product = state.updateData));
                                                    "
                                                ></Button>
                                            </div>
                                        </Dialog>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                    <div v-else="">
                        <p class="text-red-500">You have no product in your inventory</p>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-1/2 ">
                    <div class="flex flex-col gap-2">
                        <label for="name1">Name</label>
                        <InputText id="name1" type="text" v-model="state.name0" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="price">Price</label>
                        <InputText id="price" type="number" min="0" v-model="state.price" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="image">Image Url</label>
                        <InputText id="image" type="url" v-model="state.image" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="quantity">Quantity</label>
                        <InputText id="quantity" type="number" min="0" v-model="state.quantity" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="description">Description</label>
                        <InputText id="description" type="text" class="border-2" v-model="state.description" />
                    </div>
                    <Button label="Submit" icon="pi pi-check" iconPos="right" @click="addProducts()" />
                </div>
            </div>
        </div>
    </Fluid>
</template>
