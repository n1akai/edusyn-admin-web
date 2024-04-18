<script setup>
import "@/assets/plugins/apexchart/apexcharts.min";
import "@/assets/plugins/apexchart/chart-data";
import { RouterLink } from "vue-router";
import { useAdminStore } from "@/store/adminStore";
import { useStudentStore } from "@/store/studentStore";
import { useClassStore } from "@/store/classStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

const adminStore = useAdminStore();
const studentStore = useStudentStore();
const classStore = useClassStore();
const { statistics, isLoading } = storeToRefs(adminStore);

onMounted(async () => {
  adminStore.getAdmin();
  adminStore.getStatistics();
  studentStore.index();
  classStore.index();
});
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
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <div class="page-sub-header">
              <h3 class="page-title">Welcome {{ adminStore.fullName }}!</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card bg-comman w-100">
            <div class="card-body">
              <div class="db-widgets d-flex justify-content-between align-items-center">
                <div class="db-info">
                  <h6>Students</h6>
                  <h3>{{ statistics.students }}</h3>
                </div>
                <div class="db-icon">
                  <img src="@/assets/img/icons/student.png" alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card bg-comman w-100">
            <div class="card-body">
              <div class="db-widgets d-flex justify-content-between align-items-center">
                <div class="db-info">
                  <h6>Teachers</h6>
                  <h3>{{ statistics.teachers }}</h3>
                </div>
                <div class="db-icon">
                  <img src="@/assets/img/icons/teacher.png" alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card bg-comman w-100">
            <div class="card-body">
              <div class="db-widgets d-flex justify-content-between align-items-center">
                <div class="db-info">
                  <h6>Classes</h6>
                  <h3>{{ statistics.classes }}</h3>
                </div>
                <div class="db-icon">
                  <img src="@/assets/img/icons/training.png" alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12 d-flex">
          <div class="card bg-comman w-100">
            <div class="card-body">
              <div class="db-widgets d-flex justify-content-between align-items-center">
                <div class="db-info">
                  <h6>Revenue</h6>
                  <h3>{{ statistics.revenue }}DH</h3>
                </div>
                <div class="db-icon">
                  <img src="@/assets/img/icons/salary.png" alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-md-12 col-lg-6">

          <div class="card card-chart">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-6">
                  <h5 class="card-title">Overview</h5>
                </div>
                <div class="col-6">
                  <ul class="chart-list-out">
                    <li><span class="circle-blue"></span>Teacher</li>
                    <li><span class="circle-green"></span>Student</li>
                    <li class="star-menus"><a href="javascript:;"><i class="fas fa-ellipsis-v"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div id="apexcharts-area"></div>
            </div>
          </div>

        </div>
        <div class="col-md-12 col-lg-6">

          <div class="card card-chart">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-6">
                  <h5 class="card-title">Number of Students</h5>
                </div>
                <div class="col-6">
                  <ul class="chart-list-out">
                    <li><span class="circle-blue"></span>Girls</li>
                    <li><span class="circle-green"></span>Boys</li>
                    <li class="star-menus"><a href="javascript:;"><i class="fas fa-ellipsis-v"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div id="bar"></div>
            </div>
          </div>

        </div>
      </div> -->
      <div class="row">
        <div class="col-xl-6 d-flex">
          <div class="card flex-fill student-space comman-shadow">
            <div class="card-header d-flex align-items-center">
              <h5 class="card-title">Latest Students</h5>
              <ul class="chart-list-out student-ellips">
                <RouterLink :to="{ name: 'Students' }">More</RouterLink>
              </ul>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table star-student table-hover table-center table-borderless table-striped">
                  <thead class="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th class="text-center">Date of birth</th>
                      <th class="text-end">Joining date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="student in studentStore.getLatestStudents" :key="student.student_id">
                      <td class="text-nowrap">
                        <div>{{ student.student_id }}</div>
                      </td>
                      <td class="text-nowrap">
                        {{ student.last_name }} {{ student.first_name }}
                      </td>
                      <td class="text-center">{{ student.date_of_birth }}</td>
                      <td class="text-end">
                        <div>{{ student.join_date }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 d-flex">
          <div class="card flex-fill student-space comman-shadow">
            <div class="card-header d-flex align-items-center">
              <h5 class="card-title">Classes</h5>
              <ul class="chart-list-out student-ellips">
                <RouterLink :to="{ name: 'Classes' }">More</RouterLink>
              </ul>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table star-student table-hover table-center table-borderless table-striped">
                  <thead class="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Class</th>
                      <th>Branch</th>
                      <th class="text-center">Year</th>
                      <th class="text-end">Total of students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="theClass in classStore.getLatestClasses" :key="theClass.class_id">
                      <td class="text-nowrap">
                        <div>{{ theClass.class_id }}</div>
                      </td>
                      <td class="text-nowrap">
                        {{ theClass.class_name }}
                      </td>
                      <td class="text-nowrap">
                        {{ theClass.branch_name }}
                      </td>
                      <td class="text-center">{{ theClass.class_year }}</td>
                      <td class="text-end">
                        <div>{{ theClass.total_students }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-xl-6 d-flex">

          <div class="card flex-fill comman-shadow">
            <div class="card-header d-flex align-items-center">
              <h5 class="card-title ">Student Activity </h5>
              <ul class="chart-list-out student-ellips">
                <li class="star-menus"><a href="javascript:;"><i class="fas fa-ellipsis-v"></i></a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <div class="activity-groups">
                <div class="activity-awards">
                  <div class="award-boxs">
                    <img src="@/assets/img/icons/award-icon-01.svg" alt="Award">
                  </div>
                  <div class="award-list-outs">
                    <h4>1st place in "Chess”</h4>
                    <h5>John Doe won 1st place in "Chess"</h5>
                  </div>
                  <div class="award-time-list">
                    <span>1 Day ago</span>
                  </div>
                </div>
                <div class="activity-awards">
                  <div class="award-boxs">
                    <img src="@/assets/img/icons/award-icon-02.svg" alt="Award">
                  </div>
                  <div class="award-list-outs">
                    <h4>Participated in "Carrom"</h4>
                    <h5>Justin Lee participated in "Carrom"</h5>
                  </div>
                  <div class="award-time-list">
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div class="activity-awards">
                  <div class="award-boxs">
                    <img src="@/assets/img/icons/award-icon-03.svg" alt="Award">
                  </div>
                  <div class="award-list-outs">
                    <h4>Internation conference in "St.John School"</h4>
                    <h5>Justin Leeattended internation conference in "St.John School"</h5>
                  </div>
                  <div class="award-time-list">
                    <span>2 Week ago</span>
                  </div>
                </div>
                <div class="activity-awards mb-0">
                  <div class="award-boxs">
                    <img src="@/assets/img/icons/award-icon-04.svg" alt="Award">
                  </div>
                  <div class="award-list-outs">
                    <h4>Won 1st place in "Chess"</h4>
                    <h5>John Doe won 1st place in "Chess"</h5>
                  </div>
                  <div class="award-time-list">
                    <span>3 Day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> -->
      </div>
    </div>
  </page-wrapper>
</template>
