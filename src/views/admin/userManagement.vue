<template>
  <div class="row d-flex justify-content-center pt-3">
    <div class="col-sm col-lg-8">
      <h1>Gestión de usuarios</h1>
      <div class="table-responsive-sm">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo electrónico</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in data" :key="user.id">
              <td>{{ user.id }} <span v-if="user.id == loginUser.id" class="badge bg-danger">Tú</span></td>
              <td>{{ user.name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.is_active ? 'Activo' : 'Inactivo' }}</td>
              <td>
                <i
                  @click="userEdit(user)"
                  class="fa-solid fa-user-pen btn btn-success"
                  data-bs-toggle="modal" 
                  data-bs-target="#myModal"
                >
                </i>
              </td>
              <td>
                <i 
                  @click="userDelete(user.id)"
                  class="fa-solid fa-user-xmark btn btn-danger"
                >
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Popup edición de usuario -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Editar usuario</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="sendDataUserEdit(formEdit.id)">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombres"
                  v-model="formEdit.name"
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
                  v-model="formEdit.last_name"
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
                  v-model="formEdit.email"
                  autocomplete="off"
                  required
                />
              </div>
              <div class="mb-3">
                <select 
                  v-model="formEdit.is_active"
                  class="form-control"
                >
                  <option disabled value="">Estado</option>
                  <option
                    v-for="status in statusList" 
                    :key="status.id"
                    :value="status.id"
                    :selected="status.id === formEdit.is_active"
                  >
                    {{ status.name }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <div class="col d-flex justify-content-start">
                  <button 
                    v-if="loading"
                    type="submit"
                    class="btn btn-primary mb-2"
                  >
                    <span class="spinner-border spinner-border-sm"></span>
                    Actualizando
                  </button>
                  <button 
                    v-else
                    type="submit"
                    class="btn btn-primary mb-2"
                  >
                    Actualizar
                  </button>
                </div>
                <div class="col d-flex justify-content-end">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../utils/axios';
import Swal from 'sweetalert2';

const loginUser = ref(JSON.parse(localStorage.getItem('user')) || {});

const data = ref([]);

const formEdit = ref({
  id: '',
  name: '',
  last_name: '',
  email: '',
  is_active: 0,
});

const statusList = ref([
  {
    id: 0,
    name: "Inactivo"
  },
  {
    id: 1,
    name: "Activo"
  },
]);

const loading = ref(false);

const getData = async () => {
  try {
    const response = await api.get('/users/user-list/');
    data.value = response.data.users;
    // console.log(JSON.stringify(data.value));
  } catch (error) {
    console.log('error ', error);
  }
}

const userEdit = (user) => {
  console.log('usuario a editar ', user);
  formEdit.value = {
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    is_active: user.is_active ? 1 : 0
  }
  console.log('formEdit.value ', JSON.stringify(formEdit.value));
}

const sendDataUserEdit = (id) => {
  console.log('id ', id);
}

const userDelete = (id) => {
  console.log('usuario a eliminar ', id);
  Swal.fire({
    icon: 'question',
    title: 'Ojo!',
    text: '¿Seguro que deseas eliminar este usuario?',
    confirmButtonText: 'Sí, eliminar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // const res = api.put('/users/user-delete/');
    }
  });
}

onMounted(() => {
  getData();
});
</script>

<style scoped>
tbody > tr{ 
  cursor: pointer;
}
tbody > tr:hover{
  transition: 0.5s;
  transform: scale(1.1);
  box-shadow: 0px 0px 5px;
}
</style>