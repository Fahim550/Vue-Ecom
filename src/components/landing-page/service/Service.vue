<script setup></script>

<template>
    <div class="grid grid-cols-4 gap-4 justify-around my-12 py-6 mx-16">
        <!-- Free Shipping -->
        <div class="col-span-4 sm:col-span-2 md:col-span-1 flex items-center space-x-4 mb-4 md:mb-0">
            <i class="pi pi-truck text-xl text-gray-700 transition ease-linear duration-200 hover:scale-125" style="font-size: 2.5rem"></i>
            <div>
                <h3 class="text-xl font-bold text-gray-800">FREE SHIPPING</h3>
                <p class="text-lg text-gray-600">Free shipping on all orders</p>
            </div>
        </div>

        <!-- Easy Payment Policy -->
        <div class="col-span-4 sm:col-span-2 md:col-span-1 flex items-center space-x-4 mb-4 md:mb-0">
            <i class="pi pi-wallet text-3xl text-gray-700 transition ease-linear duration-200 hover:scale-125" style="font-size: 2.5rem"></i>
            <div>
                <h3 class="text-xl font-bold text-gray-800">Easy Payment Policy</h3>
                <p class="text-lg text-gray-600">Multiple payment options for your convenience</p>
            </div>
        </div>

        <!-- Money Return -->
        <div class="col-span-4 sm:col-span-2 md:col-span-1 flex items-center space-x-4 mb-4 md:mb-0">
            <i class="pi pi-dollar text-3xl text-gray-700 transition ease-linear duration-200 hover:scale-125" style="font-size: 2.5rem"></i>
            <div>
                <h3 class="text-xl font-bold text-gray-800">MONEY RETURN</h3>
                <p class="text-lg text-gray-600">Back guarantee under 5 days</p>
            </div>
        </div>

        <!-- Order Discount -->
        <div class="col-span-4 sm:col-span-2 md:col-span-1 flex items-center space-x-4">
            <i class="pi pi-tag text-3xl text-gray-700 transition ease-linear duration-200 hover:scale-125" style="font-size: 2.5rem"></i>
            <div>
                <h3 class="text-xl font-bold text-gray-800">ORDER DISCOUNT</h3>
                <p class="text-lg text-gray-600">On every order over $150</p>
            </div>
        </div>
    </div>
</template>
