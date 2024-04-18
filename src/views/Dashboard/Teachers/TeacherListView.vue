<script setup>
import { onMounted, ref } from 'vue';
import DataTable from '@/components/Common/DataTable.vue'
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useTeacherStore } from '@/store/teacherStore';
import { storeToRefs } from 'pinia';

// Stores
const teacherStore = useTeacherStore();
const { teachers, isLoading, filter } = storeToRefs(teacherStore);

// Router
const router = useRouter();

// Refs
const pageTitle = ref("Teacher");
const tableHeadings = ref(['ID', 'Full name', 'Email', 'Phone number', 'Created at', 'Last upated at']);

onMounted(async () => {
  teacherStore.index();
})

// Methods
const add = () => {
  router.push({ name: 'AddTeacher' });
}

const edit = (id) => {
  router.push({ name: 'EditTeacher', params: { id } })
}

const confirm = useConfirm();
const del = (id) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      teacherStore.destroy(id);
    }
  })
}
</script>

<template>
  <h1>Hello world</h1>
  <DataTable :name="pageTitle" :isLoading="isLoading" :headings="tableHeadings" @add="add">
    <template #header>
      <div class="student-group-form">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="filter.id" placeholder="Search by ID ...">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="filter.name" placeholder="Search by Name ...">
            </div>
          </div>
          <div class="col-lg-4 col-md-12">
            <div class="form-group">
              <input type="text" class="form-control" v-model="filter.phone" placeholder="Search by Phone ...">
            </div>
          </div>
        </div>
      </div>
    </template>
    <template>
      <tr v-for="teacher in teacherStore.filteredTeachers" :key="teacher.teacher_id">
        <td>{{ teacher.teacher_id }}</td>
        <td>
          {{ teacher.first_name }} {{ teacher.last_name }}
        </td>
        <td>{{ teacher.email }}</td>
        <td>{{ teacher.phone_number }}</td>
        <td>{{ teacher.created_at }}</td>
        <td>{{ teacher.updated_at }}</td>
        <td class="text-end">
          <div class="actions">
            <a @click="edit(teacher.teacher_id)" class="btn btn-sm bg-danger-light me-2">
              <i class="feather-edit"></i>
            </a>
            <a @click="del(teacher.teacher_id)" class="btn btn-sm bg-danger-light">
              <i class="feather-trash-2"></i>
            </a>
          </div>
        </td>
      </tr>
    </template>
  </DataTable>
</template>