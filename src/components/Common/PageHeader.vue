<script setup>
import Breadcrumb from './Breadcrumb.vue';

const props = defineProps(['title']);
</script>

<template>
  <div class="page-header">
    <div class="row align-items-center">
      <div class="col">
        <h3 class="page-title">{{ props.title }}</h3>
        <breadcrumb />
      </div>
    </div>
  </div>
</template>