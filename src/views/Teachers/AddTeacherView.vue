<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/Common/PageHeader.vue';
import { create } from '@/services/teachers';
import { toast } from 'vue3-toastify';
import { update } from '@/util/toast';
import { useRoute } from 'vue-router';

const title = ref('Add Teacher');
const data = ref({});
const route = useRoute();

const submit = async () => {
  const id = toast.loading('Please wait...')
  try {
    const res = await create(data.value);
    if (!res.error) {
      update(id, res.error, 'success')
      route.push({ name: 'Teachers' })
    } else {
      update(id, res.message, 'error')
    }
  } catch (error) {
    update(id, error, 'error')
  }

}

</script>

<template>
  <page-wrapper>
    <div class="content container-fluid">
      <page-header :title="title" />

      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-12">
                    <h5 class="form-title"><span>Basic Details</span></h5>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>First name<span class="login-danger">*</span></label>
                      <input v-model="data.first_name" type="text" class="form-control" placeholder="Enter First Name">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Last name <span class="login-danger">*</span></label>
                      <input v-model="data.last_name" type="text" class="form-control" placeholder="Enter Last Name">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Gender <span class="login-danger">*</span></label>
                      <select v-model="data.gender" class="form-control select">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Date Of Birth <span class="login-danger">*</span></label>
                      <input v-model="data.date_of_birth" class="form-control datetimepicker" type="date"
                        placeholder="DD-MM-YYYY">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Mobile <span class="login-danger">*</span></label>
                      <input v-model="data.phone_number" type="text" class="form-control" placeholder="+212601020304">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Joining Date <span class="login-danger">*</span></label>
                      <input v-model="data.joining_date" class="form-control datetimepicker" type="date"
                        placeholder="DD-MM-YYYY">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4 local-forms">
                    <div class="form-group">
                      <label>Qualification <span class="login-danger">*</span></label>
                      <input v-model="data.qualification" class="form-control" type="text"
                        placeholder="Enter Qualification">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Experience <span class="login-danger">*</span></label>
                      <input v-model="data.experience" class="form-control" type="text" placeholder="Enter Experience">
                    </div>
                  </div>
                  <div class="col-12">
                    <h5 class="form-title"><span>Login Details</span></h5>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>CNE <span class="login-danger">*</span></label>
                      <input v-model="data.cne" type="text" class="form-control" placeholder="Enter CNE">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Email ID <span class="login-danger">*</span></label>
                      <input v-model="data.email" type="email" class="form-control" placeholder="Enter Mail Id">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Password <span class="login-danger">*</span></label>
                      <input v-model="data.password" type="text" class="form-control" placeholder="Enter Password">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Repeat Password <span class="login-danger">*</span></label>
                      <input v-model="data.repeated_password" type="text" class="form-control"
                        placeholder="Repeat Password">
                    </div>
                  </div>
                  <div class="col-12">
                    <h5 class="form-title"><span>Address</span></h5>
                  </div>
                  <div class="col-12">
                    <div class="form-group local-forms">
                      <label>Address <span class="login-danger">*</span></label>
                      <input v-model="data.adresse" type="text" class="form-control" placeholder="Enter address">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>City <span class="login-danger">*</span></label>
                      <input v-model="data.city" type="text" class="form-control" placeholder="Enter City">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>State <span class="login-danger">*</span></label>
                      <input v-model="data.state" type="text" class="form-control" placeholder="Enter State">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Zip Code <span class="login-danger">*</span></label>
                      <input v-model="data.zip_code" type="text" class="form-control" placeholder="Enter Zip">
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Country <span class="login-danger">*</span></label>
                      <input v-model="data.country" type="text" class="form-control" placeholder="Enter Country">
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="student-submit">
                      <button @click="submit" type="button" class="btn btn-primary">Submit</button>
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