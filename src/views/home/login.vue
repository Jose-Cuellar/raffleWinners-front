<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-4">
      <h2>Inicio de sesión</h2>
      <form @submit.prevent="prevLogin">
        <div class="input-group mb-2">
          <span class="input-group-text">
            <i class="fa-solid fa-user"></i>
          </span>
          <input
            class="form-control"
            v-model="email" 
            placeholder="Usuario"
            required
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input 
            class="form-control"
            v-model="password" 
            :type="fieldType" 
            placeholder="Contraseña"
            autocomplete="new-password"
            required
          />
          <span 
            class="input-group-text"
            @click="showPass"
          >
            <i :class="fieldType == 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
          </span>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col d-flex justify-content-center">
            <button 
              v-if="loading"
              class="btn btn-primary mb-2"
            >
              <span class="spinner-border spinner-border-sm"></span>
              Ingresando
            </button>
            <button 
              v-else
              class="btn btn-primary mb-2"
            >
              Ingresar
            </button>
          </div>
        </div>
        <!-- <div v-if="error" class="alert alert-danger">
          <strong>Error! </strong>{{ error }}
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../utils/axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
// const error = ref('');
const router = useRouter();
const loading = ref(false);
const fieldType = ref('password');

const showPass = () => {
  fieldType.value = fieldType.value === 'password' ? 'text' : 'password';
};

const prevLogin = () => {
  loading.value = true;
  setTimeout(() => {
    login();
  }, 1000);
};

const login = async () => {
  try {
    await api.post('/users/login/', {
      email: email.value,
      password: password.value,
    });

    const userRes = await api.get('/users/profile/');

    localStorage.setItem('user', JSON.stringify(userRes.data));

    if (userRes.data.is_superuser) {
      await router.push({ name: 'dashboard' });
    } else {
      await router.push({ name: 'profile' });
    }
    loading.value = false;
  } catch (err) {
    if (err.response && err.response.data) {
      Swal.fire({
        icon: 'error',
        title: 'Uy!',
        text: err.response.data.detail || 'Error desconocido'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Uy!',
        text: 'Error de conexión con el servidor'
      });
    }
    loading.value = false;
  }
};
</script>

<style scoped>
.input-group-text{
  cursor: pointer;
}
</style>