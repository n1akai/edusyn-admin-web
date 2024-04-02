<script setup>
const props = defineProps(['headings'])
</script>
<template>
  <div class="table-responsive">
    <table class="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
      <thead class="student-thread">
        <tr>
          <th v-for="h in props.headings" :key="h">{{ h }}</th>
          <th class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>