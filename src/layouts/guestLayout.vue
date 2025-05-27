<template>
  <div class="guest-layout">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <ul v-fot class="navbar-nav me-auto">
            <li class="nav-item p-2">
              <button class="btn btn-primary">
                <router-link class="route" to="/register">
                  Register
                </router-link>
              </button>
            </li>
            <li class="nav-item p-2">
              <button class="btn btn-primary">
                <router-link class="route" to="/login">
                  Login
                </router-link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view class="container-fluid"/>
  </div>
</template>

<style scoped>
.route {
  text-decoration: none;
  color: white;
}
</style>