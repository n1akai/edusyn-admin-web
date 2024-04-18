<script setup>
import DataTable from '@/components/Common/DataTable.vue'
import { useTeacherStore } from '@/store/teacherStore';
import { storeToRefs } from 'pinia';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';


// Props 
const props = defineProps(["name", "headings", "isLoading"])

// Emit
const emit = defineEmits(["add"])

const teacherStore = useTeacherStore();
const { teachers, isLoading, filter } = storeToRefs(teacherStore);

const add = () => {
  emit("add");
}

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
      <page-header :title="props.name" />

      <slot name="header"></slot>


      <div class="row">
        <div class="col-sm-12">
          <div class="card card-table">
            <div class="card-body">

              <div class="page-header">
                <div class="row align-items-center">
                  <div class="col">
                    <h3 class="page-title">{{ props.name }}</h3>
                  </div>
                  <div class="col-auto text-end float-end ms-auto download-grp">
                    <!-- <a href="teachers.html" class="btn btn-outline-gray me-2 active"><i class="feather-list"></i></a>
                    <a href="teachers-grid.html" class="btn btn-outline-gray me-2"><i class="feather-grid"></i></a>
                    <a href="#" class="btn btn-outline-primary me-2"><i class="fas fa-download"></i> Download</a> -->
                    <a @click="add" class="btn btn-primary"><i class="fas fa-plus"></i></a>
                  </div>
                </div>
              </div>

              <data-table :headings="tableHeadings">
                <slot></slot>
              </data-table>

            </div>
          </div>
        </div>
      </div>
    </div>

  </page-wrapper>
</template>