<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-6">
      <h2>Inicio de sesión</h2>
      <form @submit.prevent="login">
        <div class="input-group mb-2">
          <span class="input-group-text">
            <i class="fa-solid fa-user"></i>
          </span>
          <input
            class="form-control"
            v-model="email" 
            placeholder="Usuario"
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input 
            class="form-control"
            v-model="password" 
            type="password" 
            placeholder="Contraseña"
            autocomplete="new-password"
          />
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col d-flex justify-content-center">
            <button 
              class="btn btn-primary mb-2"
            >Ingresar</button>
          </div>
        </div>
        <div v-if="error" class="alert alert-danger">
          <strong>Error! </strong>{{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../utils/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await api.post('/login/', {
      email: email.value,
      password: password.value,
    });

    const userRes = await api.get('/profile/');

    localStorage.setItem('user', JSON.stringify(userRes.data));

    if (userRes.data.is_staff) {
      await router.push('/admin/dashboard');
    } else {
      await router.push('/app/profile');
    }
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.detail || 'Error desconocido';
    } else {
      error.value = 'Error de conexión con el servidor';
    }
  }
};
</script>

