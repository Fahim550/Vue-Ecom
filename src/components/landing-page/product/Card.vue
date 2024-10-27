<script setup>
const props = defineProps(['title', 'description', 'price', 'src', 'quantity', 'id']);
</script>
<template>
    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 h-full group ">
        <div style="height: 380px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
            <div className=" shadow-md rounded-md p-2 overflow-hidden">
                
                <img
                    :src="props.src"
                    alt="icecream"
                    className="mx-auto w-full h-64 transition ease-linear 
                duration-200 hover:scale-105"
                />
                <div className=" w-full p-1 ">
                    <h2 className="text-[1.4rem] font-semibold">{{ props.title }}</h2>
                </div>
                <div className="p-4">
                    <p className="text-[1rem] text-gray-700">{{ props.description }}</p>

                    <div className="mt-5 flex items-center justify-between w-full">
                        <h3 className="text-[1.4rem] font-semibold flex items-center gap-[4px]">$13.90</h3>

                        <button className="py-2 px-6 border bg-green-600  text-white text-lg font-semibold rounded-3xl shadow-md translate-x-60 hover:bg-green-500 group-hover:translate-x-0 ease-linear duration-300">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
