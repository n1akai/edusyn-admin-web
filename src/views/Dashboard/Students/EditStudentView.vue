<script setup>
import TeacherForm from "@/components/Admin/TeacherForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = "Edit Teacher";
const id = route.params.id;

</script>

<template>
  <teacher-form :title="title" :isEditMode="true" :teacherId="id" />
</template>