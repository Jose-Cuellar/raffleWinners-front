<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-4">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="prevRegister">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nombres"
            v-model="formData.name"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Apellidos"
            v-model="formData.last_name"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Número de cédula"
            v-model="formData.document_number"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="Correo Electrónico"
            v-model="formData.email"
            autocomplete="off"
            required
          />
        </div>
        <div class="input-group mb-3">
          <input
            :type="fieldType"
            class="form-control"
            placeholder="Contraseña"
            v-model="formData.password"
            autocomplete="off"
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
              type="submit"
              class="btn btn-primary mb-2"
            >
              <span class="spinner-border spinner-border-sm"></span>
              Registrandose
            </button>
            <button 
              v-else
              type="submit"
              class="btn btn-primary mb-2"
            >
              Registrarse
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/utils/axios';
import Swal from 'sweetalert2';

const router = useRouter();
const fieldType = ref('password');
const loading = ref(false);

const formData = ref({
  name: '',
  last_name: '',
  document_number: '',
  email: '',
  password: ''
});

const showPass = () => {
  fieldType.value = fieldType.value === 'password' ? 'text' : 'password';
};

const prevRegister = () => {
  loading.value = true;
  setTimeout(() => {
    register();
  }, 1000);
};

const register = async () => {
  try {
    const response = await api.post('/users/register/', formData.value)
    // console.log('Usuario registrado exitosamente:', JSON.stringify(response.data))
    if(response.status == 200){
      loading.value = false;
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones!',
        text: 'Registro exitoso, ¿Deseas iniciar sesión?',
        confirmButtonText: 'Sí, inciar sesión',
        showCancelButton: true,
        cancelButtonText: 'En otra ocasión',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: 'login' });
        }
      });
      formData.value = {
        name: '',
        last_name: '',
        document_number: '',
        email: '',
        password: ''
      };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errors = error.response.data;
      let firstErrorMessage = 'Error desconocido';
      for (const field in errors) {
        if (Array.isArray(errors[field]) && errors[field].length > 0) {
          firstErrorMessage = errors[field][0];
          break;
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Uy!',
        text: firstErrorMessage,
        confirmButtonText: 'Vale',
        customClass: {
          cancelButton: 'btn btn-danger'
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Uy!',
        text: 'Ocurrió un error en el servidor',
        confirmButtonText: 'Vale',
        customClass: {
          cancelButton: 'btn btn-danger'
        }
      })
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