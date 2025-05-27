<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-6">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
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
            id="last_name"
            placeholder="Apellidos"
            v-model="formData.last_name"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Correo Electrónico"
            v-model="formData.email"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Contraseña"
            v-model="formData.password"
            autocomplete="off"
            required
          />
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col d-flex justify-content-center">
            <button
              type="submit"
              class="btn btn-primary m-2"
            >Registrarse</button>
          </div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
          <strong>Error! </strong>{{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        last_name: '',
        email: '',
        password: ''
      },
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await api.post('/register/', this.formData);
        console.log('Usuario registrado exitosamente:', JSON.stringify(response.data));
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.detail || 'Error desconocido';
        } else {
          this.errorMessage = 'Hubo un error en el servidor';
        }
      }
    },
  },
};
</script>

<style scoped>

</style>