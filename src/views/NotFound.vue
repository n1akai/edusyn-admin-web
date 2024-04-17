<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="error-page">
    <div class="main-wrapper">
    <div class="error-box">
      <h1>404</h1>
      <h3 class="h2 mb-3"><i class="fas fa-exclamation-triangle"></i> Oops! Page not found!</h3>
      <p class="h4 font-weight-normal">The page you requested was not found.</p>
      <RouterLink :to="{ name: 'Dashboard' }" class="btn btn-primary">Back to Home</RouterLink>
    </div>
  </div>
  </div>

</template>

<style scoped>
.error-page {
  height: 100%;
}
</style>