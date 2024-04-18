<script setup>
import { onMounted } from "vue";
import PageHeader from "@/components/Common/PageHeader.vue";
import { useStudentStore } from "@/store/studentStore";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
  title: {
    required: true,
  },
  isEditMode: {
    default: false,
  },
  id: {
    type: String,
  },
});

const studentStore = useStudentStore();
const { student, isLoading } = storeToRefs(studentStore);


if (props.isEditMode) {
  onMounted(async () => {
    studentStore.show(props.id)
  });
}

const submit = async () => {
  const properties = Object.keys(student.value);
  const required_fields = [];
  properties.forEach((p) => {
    if (student.value[p] == "") {
      required_fields.push(p);
    }
  });

  if (required_fields.length > 0) {
    let value = required_fields[0].replaceAll("_", " ");
    value = value.charAt(0).toUpperCase() + value.slice(1);
    toast.error(`${value} is required`);
    return;
  }

  if (!props.isEditMode) {
    if (student.value.password.length < 8) {
      return toast.error("Password has to be at least 8 characters.");
    }

    if (student.value.password != student.value.repeated_password) {
      return toast.error("Password doesn't match");
    }

    if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(student.value.email)) {
      return toast.error("Invalid email");
    }
  }

  if (props.isEditMode) {
    studentStore.update(props.id, student.value);
  } else {
    studentStore.create(student.value);
  }
};
</script>

<template>
  <Dialog v-model:visible="isLoading" modal :style="{ padding: '2rem' }">
    <template #container>
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </template>
  </Dialog>
  <page-wrapper>
    <div class="content container-fluid">
      <page-header :title="props.title" />

      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="row">
                  <div class="col-12">
                    <h5 class="form-title"><span>Basic Details</span></h5>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>First name<span class="login-danger">*</span></label>
                      <input v-model="student.first_name" type="text" class="form-control"
                        placeholder="Enter First Name" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Last name <span class="login-danger">*</span></label>
                      <input v-model="student.last_name" type="text" class="form-control"
                        placeholder="Enter Last Name" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Gender <span class="login-danger">*</span></label>
                      <select v-model="student.gender" class="form-control select">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Date Of Birth
                        <span class="login-danger">*</span></label>
                      <input v-model="student.date_of_birth" class="form-control datetimepicker" type="date"
                        placeholder="DD-MM-YYYY" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Mobile <span class="login-danger">*</span></label>
                      <input v-model="student.phone_number" type="text" class="form-control"
                        placeholder="+212601020304" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Joining Date <span class="login-danger">*</span></label>
                      <input v-model="student.join_date" class="form-control datetimepicker" type="date"
                        placeholder="DD-MM-YYYY" />
                    </div>
                  </div>
                  <div class="col-12">
                    <h5 class="form-title"><span>Login Details</span></h5>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Email ID <span class="login-danger">*</span></label>
                      <input v-model="student.email" type="email" class="form-control" placeholder="Enter Mail Id"
                        :disabled="isEditMode" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Password <span class="login-danger">*</span></label>
                      <input v-model="student.password" type="password" class="form-control"
                        placeholder="Enter Password" :disabled="isEditMode" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Repeat Password
                        <span class="login-danger">*</span></label>
                      <input v-model="student.repeated_password" type="password" class="form-control"
                        placeholder="Repeat Password" :disabled="isEditMode" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="student-submit">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-wrapper>
</template>
