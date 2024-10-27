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
        class="grid grid-cols-2 pt-6 px-6 lg:px-20 overflow-hidden h-screen gap-2"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-20 mt-0 md:mt-6">
            <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">Shop Quality, Style & Deals!</span>Find exclusive items at unbeatable prices.</h1>
            <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">"Shop Electronics" | "Shop Fashion" | "Shop Home Goods"</p>
            <Button label="Shop Now" as="router-link" to="/product" rounded class="!text-xl mt-8 !px-4"></Button>
        </div>
        <div class="flex justify-center md:justify-end">
            <img src="../../../components/shared/watch.png" alt="Hero Image" class="w-9/12 md:w-full" />
        </div>
    </div>
   
</template>
