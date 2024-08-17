<script setup>
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
// const db = useFirestore();
import { useCollection } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/database/FirebaseConfig';

const state = reactive({
    name: '',
    price: 0,
    image: '',
    quantity: 0,
    description: ''
});

const todos = useCollection(collection(db, 'todos'));
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        state.data=doc.data()
    });
});
</script>

<template>
    <Fluid>
        <li>{{ state.data.name }}</li>
        <!-- <ul>
            <li v-for="todo in querySnapshot" :key="todo.id">
                <span>{{ todo.name }}</span>
            </li>
        </ul> -->
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-full card">
                <div class="flex flex-col gap-4 w-1/2 justify-center">
                    <div class="font-semibold text-xl">Vertical</div>
                    <div class="flex flex-col gap-2">
                        <label for="name1">Name</label>
                        <InputText id="name1" type="text" v-model="state.name" />
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
                    <Button label="Submit" icon="pi pi-check" iconPos="right" @click="console.log(state)" />
                </div>
            </div>
        </div>
    </Fluid>
</template>
