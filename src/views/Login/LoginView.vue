<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { authAdmin } from '@/services/auth'

const email = ref("");
const password = ref("");

const router = useRouter();

const submit = async () => {
  const res = await authAdmin(email.value, password.value);
  const data = res.data;
  if (data && !data.error) {
    localStorage.setItem("token", data.token);
    router.push({ name: 'Dashboard' });
  }
}
</script>

<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <div class="loginbox">
          <div class="login-left">
            <img class="img-fluid" src="@/assets/img/login.png" alt="Logo">
          </div>
          <div class="login-right">
            <div class="login-right-wrap">
              <h1>Welcome to EduSync</h1>
              <h2>Sign in</h2>

              <form @submit.prevent="submit">
                <div class="form-group">
                  <label>Email <span class="login-danger">*</span></label>
                  <input class="form-control" type="email" v-model="email">
                  <span class="profile-views"><i class="fas fa-user-circle"></i></span>
                </div>
                <div class="form-group">
                  <label>Password <span class="login-danger">*</span></label>
                  <input class="form-control pass-input" type="password" v-model="password">
                  <span class="profile-views feather-eye toggle-password"></span>
                </div>
                <div class="forgotpass">
                  <div class="remember-me">
                    <label class="custom_check mr-2 mb-0 d-inline-flex remember-me"> Remember me
                      <input type="checkbox" name="radio">
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <a href="forgot-password.html">Forgot Password?</a>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">Login</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>