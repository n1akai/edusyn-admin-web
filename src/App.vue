<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog';
</script>

<template>
  <div class="main-wrapper">
    <confirm-dialog />
    <RouterView />
  </div>
</template>

<style scoped></style>
