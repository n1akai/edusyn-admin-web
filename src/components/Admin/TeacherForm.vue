<script setup>
import { ref, onMounted } from "vue";
import PageHeader from "@/components/Common/PageHeader.vue";
import { create, show, update as updateApi } from "@/services/teachers";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { update } from "@/util/toast";

const props = defineProps({
  title: {
    required: true,
  },
  isEditMode: {
    default: false,
  },
  teacherId: {
    type: String,
  },
});

const data = ref({
  first_name: "",
  last_name: "",
  gender: "Male",
  date_of_birth: "",
  phone_number: "",
  joining_date: "",
  qualification: "",
  experience: "",
  cne: "",
  email: "",
  password: "",
  repeated_password: "",
  adresse: "",
  city: "",
  zip_code: "",
});
const router = useRouter();

if (props.isEditMode) {
  onMounted(async () => {
    const res = await show(props.teacherId);
    data.value = res.data;
  });
}

const submit = async () => {
  const properties = Object.keys(data.value);
  const required_fields = [];
  properties.forEach((p) => {
    if (data.value[p] == "") {
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
    if (data.value.password.length < 8) {
      return toast.error("Password has to be at least 8 characters.");
    }

    if (data.value.password != data.value.repeated_password) {
      return toast.error("Password doesn't match");
    }

    if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.value.email)) {
      return toast.error("Invalid email");
    }
  }

  const id = toast.loading("Please wait...");
  if (props.isEditMode) {
    await updateApi(props.teacherId, data.value);
    update(id, "Updated Successfully", "success");
    router.push({ name: "Teachers" });
  } else {
    await create(data.value);
    update(id, "Added Successfully", "success");
    router.push({ name: "Teachers" });
  }
};
</script>

<template>
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
                      <label
                        >First name<span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.first_name"
                        type="text"
                        class="form-control"
                        placeholder="Enter First Name"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Last name <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.last_name"
                        type="text"
                        class="form-control"
                        placeholder="Enter Last Name"
                      />
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
                      <label
                        >Date Of Birth
                        <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.date_of_birth"
                        class="form-control datetimepicker"
                        type="date"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>Mobile <span class="login-danger">*</span></label>
                      <input
                        v-model="data.phone_number"
                        type="text"
                        class="form-control"
                        placeholder="+212601020304"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Joining Date <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.joining_date"
                        class="form-control datetimepicker"
                        type="date"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4 local-forms">
                    <div class="form-group">
                      <label
                        >Qualification
                        <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.qualification"
                        class="form-control"
                        type="text"
                        placeholder="Enter Qualification"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Experience <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.experience"
                        class="form-control"
                        type="text"
                        placeholder="Enter Experience"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <h5 class="form-title"><span>Login Details</span></h5>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>CNE <span class="login-danger">*</span></label>
                      <input
                        v-model="data.cne"
                        type="text"
                        class="form-control"
                        placeholder="Enter CNE"
                        :disabled="isEditMode"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Email ID <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.email"
                        type="email"
                        class="form-control"
                        placeholder="Enter Mail Id"
                        :disabled="isEditMode"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Password <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.password"
                        type="password"
                        class="form-control"
                        placeholder="Enter Password"
                        :disabled="isEditMode"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Repeat Password
                        <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.repeated_password"
                        type="password"
                        class="form-control"
                        placeholder="Repeat Password"
                        :disabled="isEditMode"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <h5 class="form-title"><span>Address</span></h5>
                  </div>
                  <div class="col-12  col-sm-4">
                    <div class="form-group local-forms">
                      <label>Address <span class="login-danger">*</span></label>
                      <input
                        v-model="data.adresse"
                        type="text"
                        class="form-control"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label>City <span class="login-danger">*</span></label>
                      <input
                        v-model="data.city"
                        type="text"
                        class="form-control"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-4">
                    <div class="form-group local-forms">
                      <label
                        >Zip Code <span class="login-danger">*</span></label
                      >
                      <input
                        v-model="data.zip_code"
                        type="text"
                        class="form-control"
                        placeholder="Enter Zip"
                      />
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
