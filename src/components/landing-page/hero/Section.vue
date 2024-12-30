<script setup>
// import { watch } from '@/components/shared/watch.png';
function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>
<template>
    <div
        id="hero"
        class="grid grid-cols-2 pt-6 px-6 lg:px-20 overflow-hidden h-screen gap-2 mt-[80px]"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-10 mt-0 md:mt-6 col-span-2 sm:col-span-1">
            <h1 class="text-[6vw] sm:text-[3vw] font-bold text-gray-900 leading-tight">
                <span class="font-light block">Discover Elegance and Value</span>
                Shop exclusive collections crafted for quality and distinction.
            </h1>
            <p class="font-normal text-[2vw] leading-normal md:mt-4 text-gray-700">
                Explore curated selections: <br />
                <span class="font-medium">"Electronics," "Fashion,"</span> and <span class="font-medium">"Home Essentials"</span>
            </p>
            <Button label="Start Shopping" as="router-link" to="/product" rounded class="text-xl mt-8 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg"></Button>
        </div>
        <div class="flex justify-center md:justify-end col-span-2 sm:col-span-1">
            <img src="../../../components/shared/watch.png" alt="Elegant Watch" class="w-9/12 md:w-full transition ease-linear duration-300 hover:scale-125" />
        </div>
    </div>
</template>
