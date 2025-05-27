<template>
  <div class="admin-layout">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)">Administrador</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <ul class="navbar-nav me-auto">
            <button class="btn btn-primary my-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">
              Menú de administración
            </button>
          </ul>
          <button
            @click="logout"
            class="btn btn-danger" 
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <div class="offcanvas offcanvas-start" id="demo">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title">Menú de administración</h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <ul>
          <li class="nav-item">
            <button class="btn btn-secondary my-2">
              <router-link class="route" to="/register">
                Gestionar usuarios
              </router-link>
            </button>
          </li>
          <li class="nav-item">
            <button class="btn btn-secondary my-2">
              <router-link class="route" to="/register">
                Gestionar rifas
              </router-link>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <router-view class="container-fluid"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.clear()
  router.push('/login')
}
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