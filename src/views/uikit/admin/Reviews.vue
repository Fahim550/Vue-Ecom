<script setup>
import { db } from '@/database/FirebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { onMounted, reactive } from 'vue';

const state = reactive({
    // name: '',
    // price: 0,
    // image: '',
    // quantity: 0,
    // description: '',
    // productData: [],
    reviewData: [],
    currentId: ''
    // updateData: {
    //     name:"",
    //     price: 0,
    //     url: '',
    //     quantity: 0,
    //     description: '',
    //     productData: []
    // }
});

const reviewDisableRef = async (review) => {
    const docRef = doc(db, 'review', review.id);

    await updateDoc(docRef, {
        status: false
    });
    console.log('updateProducts', docRef);
    const reviewArray = [];
    const querySnapshot = await getDocs(collection(db, 'review'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        reviewArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('allproduct', reviewArray);

    state.reviewData = [...reviewArray];
};
const reviewEnableRef = async (review) => {
    const docRef = doc(db, 'review', review.id);

    await updateDoc(docRef, {
        status: true
    });
    console.log('updateProducts', docRef);
    const reviewArray = [];
    const querySnapshot = await getDocs(collection(db, 'review'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        reviewArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('allproduct', reviewArray);

    state.reviewData = [...reviewArray];
};
onMounted(async () => {
    const reviewArray = [];
    const querySnapshot = await getDocs(collection(db, 'review'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        reviewArray.push({ ...doc.data(), id: doc.id });
    });
    console.log('allproduct', reviewArray);

    state.reviewData = [...reviewArray];
});
</script>
<template>
    <div class="flex flex-col">
        <div class="card">
            <div class="font-semibold text-xl">DataView</div>
            <div v-if="state.reviewData.length > 0">
                {{ state.reviewData }}
                <!-- <template>
                    <div class="flex justify-end">
                        <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                            <template #option="{ option }">
                                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                            </template>
                        </SelectButton>
                    </div>
                </template> -->

                <div class="flex flex-col">
                    <div v-for="(item, index) in state.reviewData" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                            <!-- <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                                    <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                                </div> -->
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.name }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
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
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button severity="danger" icon="pi pi-trash" label="Delete Review" :disabled="!item.status" class="flex-auto md:flex-initial whitespace-nowrap" @click="reviewDisableRef(item)"></Button>
                                        <Button icon="pi pi-star" label="Keep Review" :disabled="item.status" class="flex-auto md:flex-initial whitespace-nowrap" @click="reviewEnableRef(item)"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
