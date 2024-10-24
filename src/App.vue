<script setup>
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from './database/FirebaseConfig';

const router = useRouter();
onMounted(async () => {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));

    let flag = false;
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            flag = true;
        });
    }
    if (flag) {
        router.push('/');
    } else {
        router.push('/auth/login');
    }
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
