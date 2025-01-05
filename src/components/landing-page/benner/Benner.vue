<script setup></script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 px-16">
        <!-- First Banner -->
        <div class="relative bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <img
                src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-126800.jpg?t=st=1736088216~exp=1736091816~hmac=55f78242ac515e2847505a16d4267203ce7f2553a102b2e8887a567afbcc3237&w=826"
                alt="Office Dress"
                class="w-full h-64 object-cover "
            />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-6 ">
                <h3 class="text-white text-xl font-bold">Up to <span class="text-red-500">50%</span> Off</h3>
                <p class="text-white text-lg font-medium mt-2">Office Dress</p>
                <button class="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-black">Shop Now</button>
            </div>
        </div>

        <!-- Second Banner -->
        <div class="relative bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <img
                src="https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags-copy-space_23-2148657638.jpg?t=st=1736089185~exp=1736092785~hmac=725035bc832188a429b9b1d57fe36253fcc63d3d4e9bf78ea467dab6823590b9&w=996"
                alt="All Products"
                class="w-full h-64 object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-6">
                <h3 class="text-white text-xl font-bold">Up to <span class="text-red-500">40%</span> Off</h3>
                <p class="text-white text-lg font-medium mt-2">All Products</p>
                <button class="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-black">Shop Now</button>
            </div>
        </div>
    </div>
</template>
