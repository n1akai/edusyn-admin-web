<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/Layout/TheHeader.vue'
import TheSideBar from '@/components/Layout/TheSideBar.vue'
</script>

<template>
  <TheHeader />
  <TheSideBar />
  <RouterView />
</template>
