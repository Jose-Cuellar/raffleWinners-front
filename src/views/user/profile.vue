<template>
  <div class="container-fluid">

    <div class="row d-flex justify-content-center pt-3">
      <div class="col d-flex justify-content-center my-3">
        <h2>
          Bienvenido&nbsp;<strong class="text-primary">{{ user.name }}</strong>
        </h2>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div
          v-for="raffle in raffles"
          :key="raffle.id"
          class="col-12 col-sm-6 col-lg-4 my-3"
        >
          <div class="card">
            <div class="card-header">{{ raffle.date }}</div>
            <img class="card-img-top" :src="raffle.image" alt="Card image" style="width:100%">
            <div class="card-body">
              <h4 class="card-title">{{ raffle.title }}</h4>
              <p class="card-text">{{ raffle.description }}</p>
              <p class="card-text">{{ raffle.price }}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary m-1" data-bs-dismiss="offcanvas">
                <router-link class="route" :to="{ name: 'showRaffle' }">
                  Ver rifa
                </router-link>
              </button>
              <button class="btn btn-primary m-1" data-bs-dismiss="offcanvas">
                <router-link class="route" :to="{ name: 'editRaffle' }">
                  Editar rifa
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const raffles = ref([
  {
    id: 1,
    title: "Nombre rifa 1",
    description: "Descripción rifa 1",
    date: "2025-06-30",
    price: 20000,
    image: '@/../../public/assets/testImages/image1.jpg'
  },
  {
    id: 2,
    title: "Nombre rifa 2",
    description: "Descripción rifa 2",
    date: "2025-06-30",
    price: 20000,
    image: '@/../../public/assets/testImages/image1.jpg'
  },
]);

const user = ref(JSON.parse(localStorage.getItem('user')) || {});
</script>

<style scoped>
.nav-item{
  list-style-type: none;
}
.route {
  text-decoration: none;
  color: white;
}
</style>