<script setup>
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();

</script>

<template>
  <ul class="breadcrumb">
    <li class="breadcrumb-item"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
    <li class="breadcrumb-item active">{{ }}</li>
  </ul>
</template>