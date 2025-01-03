<script setup>
import { useState } from '@/composables/Store';
import { reactive, ref, watch } from 'vue';

const props = defineProps(['visible', 'wishList']);
const emit = defineEmits(['update:visible']);
const { state } = useState();
const localState = reactive({
    addToCart: [],
    wishList: []
});

console.log('props', props.wishList);
const cartItems = ref([...props.wishList]);
watch(
    () => props.wishList,
    (newWishList) => {
        cartItems.value = [...newWishList];
        console.log('Updated cartItems:', cartItems.value);
    }
);
const toggleModal = () => {
    emit('update:visible', false); // Notify the parent to hide the modal
    console.log('Modal visibility updated:', props.visible);
};
console.log('cartItems', cartItems);

const addToCart = (product) => {
    const email = sessionStorage.getItem('UserData');
    if (email) {
        console.log('state', state);
        if (state?.addToCart.length !== 0) {
            // console.log('product', product);
            // console.log('state.addToCart', state.addToCart);
            const findDuplicateProduct = state.addToCart.find((pd) => pd.id === product.id);
            // console.log('findDuplicateProduct', findDuplicateProduct);
            if (findDuplicateProduct === undefined) {
                state.addToCart = [...state.addToCart, product];
            }
        } else {
            state.addToCart = [...state.addToCart, product];
            // console.log('empty', state.addToCart);
        }
    } else {
        alert('login first');
    }
    localStorage.setItem('cartItem', JSON.stringify(state.addToCart));
    // console.log('product addToCart', state.addToCart);
};
const removeItem = (item) => {
    const index = cartItems.value.findIndex((cartItem) => cartItem.name === item.name);
    if (index !== -1) {
        cartItems.value.splice(index, 1); // Reactive removal
        state.wishList.splice(index, 1); // Sync with localState if necessary
        console.log('Item removed:', item);
    }
};
// onMounted(() => {
//     cartItems;
// });
// const op = ref();
// const products = ref();
// const selectedProduct = ref();

// const displayProduct = (product) => {
//     op.value.hide();

//     if (selectedProduct.value?.id === product.id) {
//         selectedProduct.value = null;
//     } else {
//         selectedProduct.value = product;

//         nextTick(() => {
//             op.value.show(event);
//         });
//     }
// };
// console.log(selectedProduct);
// const hidePopover = () => {
//     op.value.hide();
// };

// const getSeverity = (product) => {
//     switch (product.inventoryStatus) {
//         case 'INSTOCK':
//             return 'success';

//         case 'LOWSTOCK':
//             return 'warn';

//         case 'OUTOFSTOCK':
//             return 'danger';

//         default:
//             return null;
//     }
// };
</script>
<template>
    <div :class="[props.visible ? 'translate-x-[0px] opacity-100' : 'translate-x-[200px] opacity-0', 'overflow-y-scroll zenUIRightModal w-[60%] h-screen bg-[#eceef6] transition-all duration-300 float-right']">
        <!-- Close Button -->
        <div class="w-full flex items-end p-4 justify-end">
            <i class="pi pi-times p-2 w-fit bg-green-300 text-[2.5rem] hover:bg-green-500 rounded-full transition-all duration-300 cursor-pointer" @click="toggleModal" />
        </div>

        <!-- Modal Content -->
        <div class="flex items-start flex-col p-12 justify-between gap-8">
            <!-- Cart Steps -->
            <div class="bg-[#fff] min-h-screen rounded-md p-6 w-full">
                <div class="flex items-center md:flex-row flex-col justify-between w-full border-b border-[#d1d1d1]">
                    <div class="flex items-center gap-5">
                        <span class="text-[2.5rem] font-[500] text-primary border-b border-primary pb-3"> Wishlist Product </span>
                    </div>
                </div>

                <!-- Products -->

                <div class="card">
                    <DataTable :value="cartItems" rows="10" paginator tableStyle="min-width: 50rem">
                        <Column field="id" header="Id" class="w-1/6"></Column>
                        <Column field="name" header="Name" class="w-1/6" bodyClass="whitespace-nowrap"></Column>
                        <Column field="price" header="Price" sortable class="w-1/6">
                            <template #body="slotProps"> $ {{ slotProps.data.price }} </template>
                        </Column>
                        <Column header="Image" class="w-1/6">
                            <template #body="slotProps">
                                <img :src="slotProps.data.url" :alt="slotProps.data.image" class="w-16 shadow-sm" />
                            </template>
                        </Column>
                        <Column header="Details" class="w-1/6">
                            <template #body="slotProps">
                                <Button type="button" @click="displayProduct(slotProps.data)" icon="pi pi-eye" severity="secondary" rounded></Button>
                            </template>
                        </Column>
                        <Column header="Remove" class="w-1/6">
                            <template #body="slotProps">
                                <Button @click="removeItem(slotProps.data)" type="button" icon="pi pi-trash" severity="danger" rounded></Button>
                            </template>
                        </Column>
                        <Column header="Action" class="w-1/6">
                            <template #body="slotProps">
                                <Button @click="addToCart(slotProps.data)" type="button" icon="pi pi-shopping-bag" severity="contrast" rounded></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- <Popover ref="op">
                        <div v-if="selectedProduct" class="rounded flex flex-col">
                            <div class="flex justify-center rounded">
                                <div class="relative mx-auto">
                                    <img class="rounded w-44 sm:w-64" :src="`https://primefaces.org/cdn/primevue/images/product/${selectedProduct.image}`" :alt="selectedProduct.name" />
                                    <Tag :value="selectedProduct.inventoryStatus" :severity="getSeverity(selectedProduct)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                                </div>
                            </div>
                            <div class="pt-4">
                                <div class="flex flex-row justify-between items-start gap-2 mb-4">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ selectedProduct.category }}</span>
                                        <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
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
                                            <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <Button icon="pi pi-shopping-cart" :label="`Buy Now | \$${selectedProduct.price}`" :disabled="selectedProduct.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap" @click="hidePopover"></Button>
                                    <Button icon="pi pi-heart" outlined @click="hidePopover"></Button>
                                </div>
                            </div>
                        </div>
                    </Popover> -->
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
<!-- <div v-for="(item, index) in cartItems" :key="index" class="mt-12 flex items-start border-b border-[#d1d1d1] pb-6 justify-between w-full">
                    <div class="flex items-start gap-5">
                        <img :src="item?.url" :alt="item.name" class="w-[90px] h-[60px] object-cover rounded-md" />
                        <div>
                            <h2 class="text-[1.2rem] font-[600] text-primary">
                                {{ item?.name }}
                            </h2>
                            <p class="text-[1rem] font-[500] text-text">items</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-12">
                        <h3 class="text-[1.2rem] font-[600] text-[#6d6d6d]">
                            ৳{{ item?.price }} <span class="text-primary pl-1">{{ item.discountedPrice }}</span>
                        </h3>
                        <i class="pi pi-times text-[#6d6d6d] cursor-pointer" @click="removeItem(item)" />
                    </div>
                </div> -->
