<script setup>
import { onMounted, ref } from 'vue';
import TheTable from '@/components/Admin/TheTable.vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useStudentStore } from '@/store/studentStore';
import { useClassStore } from '@/store/classStore';
import { storeToRefs } from 'pinia';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

// Stores
const studentStore = useStudentStore();
const classStore = useClassStore();
const { isLoading, filter } = storeToRefs(studentStore);
const { classes } = storeToRefs(classStore);

// Router
const router = useRouter();

// Refs
const pageTitle = ref("Student");
const tableHeadings = ref(['Full name', 'Class', 'Date of birth', 'Email', 'Phone number', 'Joined at']);

onMounted(async () => {
  studentStore.index();
  classStore.index();
})

// Methods
const add = () => {
  router.push({ name: 'AddStudent' });
}

const edit = (id) => {
  router.push({ name: 'EditStudent', params: { id } })
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
      studentStore.destroy(id);
    }
  })
}
</script>

<template>
    <Dialog v-model:visible="isLoading" modal :style="{ padding: '2rem' }">
    <template #container>
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </template>
  </Dialog>
  <the-table :name="pageTitle" :headings="tableHeadings" @add="add">
    <template #header>
      <div class="student-group-form">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <select type="text" class="form-control" v-model="filter.classId" placeholder="Class ...">
                <option v-for="theClass in classes" :value="theClass.class_id" :key="theClass.class_id">{{ theClass.class_name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="filter.name" placeholder="Search by Name ...">
            </div>
          </div>
        </div>
      </div>
    </template>

    <tr v-for="student in studentStore.filteredStudents" :key="student.student_id">
        <td>{{ student.last_name.toUpperCase() }} {{ student.first_name.toUpperCase() }}</td>
        <td>{{ student.class_name.toUpperCase() }}</td>
        <td>{{ student.date_of_birth }}</td>
        <td>{{ student.email.toUpperCase() }}</td>
        <td>{{ student.phone_number }}</td>
        <td>{{ student.join_date }}</td>
        <td class="text-end">
          <div class="actions">
            <a @click="edit(student.student_id)" class="btn btn-sm bg-danger-light me-2">
              <i class="feather-edit"></i>
            </a>
            <a @click="del( student.student_id)" class="btn btn-sm bg-danger-light">
              <i class="feather-trash-2"></i>
            </a>
          </div>
        </td>
      </tr>
  </the-table>
</template>