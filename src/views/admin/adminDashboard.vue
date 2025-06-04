<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-8">
        <h1>Administración</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('user')) || {});

onMounted(() => {
  
});
</script>