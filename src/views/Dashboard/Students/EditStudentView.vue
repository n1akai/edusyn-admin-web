<script setup>
import StudentForm from "@/components/Admin/StudentForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = "Edit Teacher";
const id = route.params.id;

</script>

<template>
  <student-form :title="title" :isEditMode="true" :id="id" />
</template>