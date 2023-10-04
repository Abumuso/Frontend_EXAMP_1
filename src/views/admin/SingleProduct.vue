<template>
    <div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.params.id);

const getSingleProduct = () => {
    axios.get(`https://fakestoreapi.com/products/${route.params.id}`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}
getSingleProduct()
</script>

<style lang="scss" scoped>

</style>