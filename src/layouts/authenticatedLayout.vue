<template>
  <div class="auth-layout">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <ul class="navbar-nav me-auto">
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">
              Menú de usuario
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
        <h1 class="offcanvas-title">Menú de usuario</h1>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <p>Some text lorem ipsum.</p>
        <p>Some text lorem ipsum.</p>
        <button class="btn btn-secondary" type="button">A Button</button>
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
