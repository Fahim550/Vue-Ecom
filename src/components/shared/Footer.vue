<script setup>
const services = ['Free Shipping', 'Easy Payment Policy', 'Money Return', 'Order Discount'];
</script>

<template>
    <footer class="bg-gray-100 boxShadow text-[12px] md:text-[20px] rounded-xl w-full p-6 sm:p-9">
        <div class="flex mx-auto sm:justify-between gap-[30px] flex-col sm:flex-row flex-wrap w-full">
            <!-- Logo Section -->
            <div class="w-full sm:w-[25%]">
                <img src="https://i.ibb.co/ZHYQ04D/footer-logo.png" alt="logo" class="w-[150px] mb-[20px]" />
                <div class="flex flex-col gap-[20px] text-primary">
                    <span>
                        <a class="text-[0.9rem] flex items-center gap-[8px] cursor-pointer">
                            <i class="pi pi-map-marker text-[1.2rem]" />
                            Habigonj, Sylhet
                        </a>
                    </span>
                    <span>
                        <a class="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                            <i class="pi pi-envelope text-[1.1rem]" />
                            Ecommerce@gmail.com
                        </a>
                    </span>
                    <span>
                        <a class="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                            <i class="pi pi-phone text-[1.1rem]" />
                            +8801305282768
                        </a>
                    </span>
                </div>
            </div>

            <!-- Services Section -->
            <div>
                <h3 class="text-[1.3rem] font-semibold text-text mb-2">Services</h3>
                <div class="flex text-black flex-col gap-[10px]">
                    <p v-for="service in services" :key="service" class="hover:text-primary cursor-pointer transition-all duration-200">
                        {{ service }}
                    </p>
                </div>
            </div>

            <!-- Social Media Section -->
            <div>
                <h3 class="text-[1.2rem] font-semibold text-text mb-2">Our Social Media</h3>
                <div class="flex text-black flex-col gap-[10px]">
                    <a href="">
                        <i class="pi pi-facebook text-blue-600"></i>
                        Facebook
                    </a>
                    <a href="">
                        <i class="pi pi-twitter text-blue-600"></i>
                        Twitter
                    </a>
                    <a href="">
                        <i class="pi pi-instagram text-pink-600"></i>
                        Instagram
                    </a>
                    <a href="">
                        <i class="pi pi-linkedin text-blue-600"></i>
                        Instagram
                    </a>
                </div>
            </div>

            <!-- Newsletter Section -->
            <div class="">
                <h3 class="text-[1.5rem] font-semibold text-text mb-2">Join a Newsletter</h3>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-[0.9rem]">Your Email</label>
                    <input type="email" class="py-3 px-4 pr-[0px] w-full rounded-md border border-primary outline-none" placeholder="Email address" />
                    <button class="px-4 rounded-r-md bg-primary w-[50%] text-white">Submit</button>
                </div>
            </div>
        </div>
    </footer>
</template>
