<script setup>
import { onMounted, ref } from 'vue';
import DataTable from '@/components/Common/DataTable.vue'
import { fetchTeachers, destroy } from '@/services/teachers'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { update } from '@/util/toast';
import { useConfirm } from "primevue/useconfirm";



const router = useRouter();

const pageTitle = ref("Teacher");
const tableHeadings = ref(['ID', 'Full name', 'Email', 'Phone number', 'Created at', 'Last upated at']);
const teachers = ref([]);

onMounted(async () => {
  const res = await fetchTeachers();
  teachers.value = res.data.teachers;
})

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
      const toastId = toast.loading("Please wait...");
      try {
        const res = await destroy(id);
        if (!res.data.error) {
          update(toastId, "Deleted Successfully", "success");
          teachers.value = teachers.value.filter(e => e.teacher_id != id)
        } else {
          update(toastId, "Something went wrong!", "error")
        }
      } catch (error) {
        update(toastId, error, "error")
      }
    }
  })
}
</script>

<template>
  <page-wrapper>
    <div class="content container-fluid">
      <page-header :title="pageTitle" />

      <div class="student-group-form">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search by ID ...">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search by Name ...">
            </div>
          </div>
          <div class="col-lg-4 col-md-12">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search by Phone ...">
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="card card-table">
            <div class="card-body">

              <div class="page-header">
                <div class="row align-items-center">
                  <div class="col">
                    <h3 class="page-title">{{ pageTitle }}</h3>
                  </div>
                  <div class="col-auto text-end float-end ms-auto download-grp">
                    <a href="teachers.html" class="btn btn-outline-gray me-2 active"><i class="feather-list"></i></a>
                    <a href="teachers-grid.html" class="btn btn-outline-gray me-2"><i class="feather-grid"></i></a>
                    <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download"></i> Download</a>
                    <router-link :to="{ name: 'AddTeacher' }" class="btn btn-primary"><i
                        class="fas fa-plus"></i></router-link>
                  </div>
                </div>
              </div>

              <data-table :headings="tableHeadings">
                <tr v-for="teacher in teachers" :key="teacher.teacher_id">
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
              </data-table>

            </div>
          </div>
        </div>
      </div>
    </div>

  </page-wrapper>
</template>