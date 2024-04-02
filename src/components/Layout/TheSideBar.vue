<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>

  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <li class="menu-title">
            <span>Main Menu</span>
          </li>
          <li class="submenu active">
            <router-link :to="{ name: 'Dashboard' }"><i class="feather-grid"></i> <span> Dashboard</span></router-link>
          </li>
          <li class="submenu">
            <router-link :to="{ name: 'Teachers' }"><i class="fas fa-chalkboard-teacher"></i> <span>
                Teachers</span></router-link>
          </li>
          <li class="submenu">
            <router-link :to="{ name: 'Students' }"><i class="fas fa-graduation-cap"></i> <span>
                Students</span></router-link>
          </li>

        </ul>
      </div>
    </div>
  </div>

</template>