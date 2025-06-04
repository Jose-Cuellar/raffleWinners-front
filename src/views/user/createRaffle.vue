<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-12 col-sm-10 col-lg-6">
      <h2>Crear rifa</h2>
      <form @submit.prevent="createRaffle">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Titulo"
            v-model="formData.raffle_title"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Descripción"
            v-model="formData.raffle_description"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="datetime-local"
            class="form-control"
            v-model="formData.raffle_fecha"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Precio"
            v-model="formData.raffle_price"
            autocomplete="off"
            required
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="file"
            class="form-control"
            @change="handleArchivo"
            required
          />
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col d-flex justify-content-center">
            <button 
              v-if="loading"
              type="submit"
              class="btn btn-primary mb-2"
            >
              <span class="spinner-border spinner-border-sm"></span>
              Creando
            </button>
            <button 
              v-else
              type="submit"
              class="btn btn-primary mb-2"
            >
              Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/utils/axios';

const loading = ref(false);
const archivo = ref(null);

const formData = ref({
  raffle_title: '',
  raffle_description: '',
  raffle_fecha: '',
  raffle_price: '',
});

function handleArchivo(event) {
  archivo.value = event.target.files[0];
}

async function createRaffle() {
  loading.value = true;
  const payload = new FormData();
  payload.append('raffle_title', formData.value.raffle_title);
  payload.append('raffle_description', formData.value.raffle_description);
  payload.append('raffle_fecha', formData.value.raffle_fecha);
  payload.append('raffle_price', formData.value.raffle_price);
  payload.append('raffle_image', archivo.value);

  try {
    const data = await api.post('/raffles/create-raffle/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Respuesta del servidor:', data);
  } catch (error) {
    console.error('Error al enviar:', error);
  } finally {
    loading.value = false;
  }
}
</script>
