<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/Layout/TheHeader.vue'
import TheSideBar from '@/components/Layout/TheSideBar.vue'
import ConfirmDialog from 'primevue/confirmdialog';
</script>

<template>
  <div class="main-wrapper">
    <confirm-dialog />
    <TheHeader />
    <TheSideBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
